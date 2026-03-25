<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import * as THREE from 'three'

// ============================================================================
// Fragment Shader
// ============================================================================

const fragmentShader = `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform float u_hoverStrength;
uniform bool u_invertMouse;
uniform bool u_isDarkMode;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}

float sdPoly(in vec2 p, in float w, in int sides) {
    float a = atan(p.x, p.y) + PI;
    float r = TWO_PI / float(sides);
    float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
    return d * 2.0 - w;
}

float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx + 0.5;

    float size = 1.2 + sin(u_time) * 0.1;
    float roundness = 0.4 + sin(u_time * 0.5) * 0.1;
    float borderSize = 0.05 + sin(u_time * 0.7) * 0.02;
    float circleSize = 0.3 + sin(u_time * 0.8) * 0.05;
    float circleEdge = 0.5 + sin(u_time * 0.6) * 0.1;

    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    float sdf;
    if (VAR == 0) {
        sdf = sdRoundRect(st, vec2(size), roundness);
        sdf = stroke(sdf, 0.0, borderSize, sdfCircle) * 4.0;
    } else if (VAR == 1) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
    } else if (VAR == 2) {
        sdf = sdCircle(st, vec2(0.5));
        sdf = stroke(sdf, 0.58, 0.02, sdfCircle) * 4.0;
    } else if (VAR == 3) {
        sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
        sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
    }

    vec3 gradient = mix(
        mix(u_color1, u_color2, 0.5 + 0.5 * cos(u_time + st.x + 0.0)),
        mix(u_color3, u_color4, 0.5 + 0.5 * cos(u_time + st.y + 2.0)),
        0.5 + 0.5 * cos(u_time + st.x + st.y + 4.0)
    );

    vec3 shapeColor = sdf * gradient;

    float mouseEffect = u_invertMouse ? 1.0 - sdfCircle : sdfCircle;
    shapeColor = mix(shapeColor, vec3(1.0) - shapeColor, u_hoverStrength * mouseEffect);

    if (u_isDarkMode) {
        shapeColor = mix(shapeColor, vec3(1.0), 0.2);
    } else {
        shapeColor = mix(shapeColor, vec3(0.0), 0.1);
    }

    gl_FragColor = vec4(shapeColor, sdf);
}
`

// ============================================================================
// Props
// ============================================================================

interface ShaderConfig {
  variation: number
  color1: string
  color2: string
  color3: string
  color4: string
  enableHover: boolean
  invertMouse: boolean
  width: string
  height: string
}

const props = withDefaults(
  defineProps<{
    variation?: number
    color1?: string
    color2?: string
    color3?: string
    color4?: string
    enableHover?: boolean
    invertMouse?: boolean
    width?: string
    height?: string
    isDarkMode?: boolean
  }>(),
  {
    variation: 3,
    color1: '#D5F981',
    color2: '#A1BBE7',
    color3: '#F2BAE2',
    color4: '#68E8FA',
    enableHover: true,
    invertMouse: true,
    width: '100%',
    height: '400px',
    isDarkMode: false,
  }
)

// ============================================================================
// Refs
// ============================================================================

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isVisible = ref(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.OrthographicCamera | null = null
let material: THREE.ShaderMaterial | null = null
let rafId: number | null = null
let pixelRatio = 1
const isInteracting = ref(false)

// ============================================================================
// Functions
// ============================================================================

function updateSize() {
  if (!containerRef.value || !canvasRef.value || !renderer || !camera || !material)
    return

  const { clientWidth: w, clientHeight: h } = containerRef.value
  const aspect = w / h

  camera.left = -aspect
  camera.right = aspect
  camera.top = 1
  camera.bottom = -1
  camera.updateProjectionMatrix()

  const pr = Math.min(window.devicePixelRatio || 1, 2)
  pixelRatio = pr

  renderer.setPixelRatio(pr)
  renderer.setSize(w, h)

  const drawingBufferSize = renderer.getDrawingBufferSize(new THREE.Vector2())
  material.uniforms.u_resolution.value.copy(drawingBufferSize)
  material.uniforms.u_pixelRatio.value = pr
}

function updateMousePosition(x: number, y: number) {
  if (!containerRef.value || !material) return
  const rect = containerRef.value.getBoundingClientRect()
  const mouseX = x - rect.left
  const mouseY = y - rect.top
  if (isInteracting.value || props.enableHover) {
    material.uniforms.u_mouse.value.set(mouseX, rect.height - mouseY)
  }
}

function animate(time: number) {
  if (!renderer || !scene || !camera || !material) return

  const pr = Math.min(window.devicePixelRatio || 1, 2)
  if (pr !== pixelRatio) {
    updateSize()
  }

  material.uniforms.u_time.value = time * 0.001
  material.uniforms.u_hoverStrength.value =
    isInteracting.value || props.enableHover ? 0.3 : 0

  renderer.render(scene, camera)
  rafId = requestAnimationFrame(animate)
}

function handlePointerMove(event: PointerEvent) {
  updateMousePosition(event.clientX, event.clientY)
}

function handleTouchMove(event: TouchEvent) {
  if (event.touches.length > 0) {
    const touch = event.touches[0]
    updateMousePosition(touch.clientX, touch.clientY)
  }
}

function handlePointerDown() {
  isInteracting.value = true
}

function handlePointerUp() {
  isInteracting.value = false
}

// ============================================================================
// Lifecycle
// ============================================================================

onMounted(() => {
  if (!containerRef.value || !canvasRef.value) return

  isVisible.value = true

  scene = new THREE.Scene()

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
  camera.position.z = 1

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const geometry = new THREE.PlaneGeometry(2, 2)
  material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 v_texcoord;
      void main() {
        gl_Position = vec4(position, 1.0);
        v_texcoord = uv;
      }
    `,
    fragmentShader,
    uniforms: {
      u_mouse: { value: new THREE.Vector2() },
      u_resolution: { value: new THREE.Vector2() },
      u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      u_time: { value: 0 },
      u_color1: { value: new THREE.Color(props.color1) },
      u_color2: { value: new THREE.Color(props.color2) },
      u_color3: { value: new THREE.Color(props.color3) },
      u_color4: { value: new THREE.Color(props.color4) },
      u_hoverStrength: { value: 0 },
      u_invertMouse: { value: props.invertMouse },
      u_isDarkMode: { value: props.isDarkMode },
    },
    defines: {
      VAR: props.variation,
    },
    transparent: true,
    blending: THREE.NormalBlending,
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  updateSize()
  rafId = requestAnimationFrame(animate)

  const resizeObserver = new ResizeObserver(updateSize)
  resizeObserver.observe(containerRef.value)

  // Event listeners
  const container = containerRef.value
  container.addEventListener('pointermove', handlePointerMove)
  container.addEventListener('touchmove', handleTouchMove)
  container.addEventListener('pointerdown', handlePointerDown)
  container.addEventListener('pointerup', handlePointerUp)
  container.addEventListener('touchstart', handlePointerDown)
  container.addEventListener('touchend', handlePointerUp)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (renderer) renderer.dispose()

  if (containerRef.value) {
    containerRef.value.removeEventListener('pointermove', handlePointerMove)
    containerRef.value.removeEventListener('touchmove', handleTouchMove)
    containerRef.value.removeEventListener('pointerdown', handlePointerDown)
    containerRef.value.removeEventListener('pointerup', handlePointerUp)
    containerRef.value.removeEventListener('touchstart', handlePointerDown)
    containerRef.value.removeEventListener('touchend', handlePointerUp)
  }
})

// Watch for config changes
watch(
  () => [
    props.color1,
    props.color2,
    props.color3,
    props.color4,
    props.invertMouse,
    props.isDarkMode,
    props.variation,
  ],
  () => {
    if (material) {
      material.uniforms.u_color1.value.set(props.color1)
      material.uniforms.u_color2.value.set(props.color2)
      material.uniforms.u_color3.value.set(props.color3)
      material.uniforms.u_color4.value.set(props.color4)
      material.uniforms.u_invertMouse.value = props.invertMouse
      material.uniforms.u_isDarkMode.value = props.isDarkMode
      material.defines.VAR = props.variation
      material.needsUpdate = true
    }
  }
)

const interactionLabel = computed(() => {
  if (props.enableHover) {
    return `${props.invertMouse ? 'Inverted mouse' : 'Normal mouse'} interaction`
  }
  return 'Interact with the animation'
})

const textColorClass = computed(() =>
  props.isDarkMode ? 'text-neutral-300' : 'text-neutral-200'
)
</script>

<template>
  <div
    ref="containerRef"
    class="relative transition-opacity duration-500"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    :style="{
      width: props.width,
      height: props.height,
      backgroundColor: 'black',
      borderRadius: '8px',
    }"
  >
    <canvas ref="canvasRef" class="w-full h-full touch-none" />
    <div :class="['absolute bottom-4 left-4 text-sm', textColorClass]">
      {{ interactionLabel }} using mouse or touch
    </div>
  </div>
</template>
