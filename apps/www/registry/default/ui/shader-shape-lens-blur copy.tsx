"use client"

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { motion } from "motion/react"
import * as THREE from "three"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;
    
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
    
    gl_FragColor = vec4(shapeColor, sdf);
}
`

interface ImprovedShaderAnimationProps {
  initialVariation?: number
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  className?: string
  enableHover?: boolean
  invertMouse?: boolean
  width?: string
  height?: string
}

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

export function ShaderAnimation({ config }: { config: ShaderConfig }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const rafRef = useRef<number | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)

  const updateSize = useCallback(() => {
    if (
      !containerRef.current ||
      !canvasRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !materialRef.current
    )
      return

    const { clientWidth: w, clientHeight: h } = containerRef.current
    const aspect = w / h

    cameraRef.current.left = -aspect
    cameraRef.current.right = aspect
    cameraRef.current.top = 1
    cameraRef.current.bottom = -1
    cameraRef.current.updateProjectionMatrix()

    rendererRef.current.setSize(w, h)
    materialRef.current.uniforms.u_resolution.value.set(w, h)
  }, [])

  const updateMousePosition = useCallback(
    (x: number, y: number) => {
      if (!containerRef.current || !materialRef.current) return
      const { clientWidth: w, clientHeight: h } = containerRef.current
      if (isInteracting || config.enableHover) {
        materialRef.current.uniforms.u_mouse.value.set(x, h - y)
      }
    },
    [isInteracting, config.enableHover]
  )

  const animate = useCallback(
    (time: number) => {
      if (
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !materialRef.current
      )
        return

      materialRef.current.uniforms.u_time.value = time * 0.001
      materialRef.current.uniforms.u_hoverStrength.value =
        isInteracting || config.enableHover ? 0.3 : 0

      rendererRef.current.render(sceneRef.current, cameraRef.current)
      rafRef.current = requestAnimationFrame(animate)
    },
    [config.enableHover, isInteracting]
  )

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
    camera.position.z = 1
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
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
        u_color1: { value: new THREE.Color(config.color1) },
        u_color2: { value: new THREE.Color(config.color2) },
        u_color3: { value: new THREE.Color(config.color3) },
        u_color4: { value: new THREE.Color(config.color4) },
        u_hoverStrength: { value: 0 },
        u_invertMouse: { value: config.invertMouse },
      },
      defines: {
        VAR: config.variation,
      },
      transparent: true,
      blending: THREE.NormalBlending,
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    updateSize()
    rafRef.current = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(containerRef.current)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (rendererRef.current) rendererRef.current.dispose()
      if (containerRef.current) resizeObserver.unobserve(containerRef.current)
    }
  }, [config, updateSize, animate])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handlePointerMove = (event: PointerEvent) =>
      updateMousePosition(event.clientX, event.clientY)
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        updateMousePosition(touch.clientX, touch.clientY)
      }
    }

    container.addEventListener("pointermove", handlePointerMove)
    container.addEventListener("touchmove", handleTouchMove)
    container.addEventListener("pointerdown", () => setIsInteracting(true))
    container.addEventListener("pointerup", () => setIsInteracting(false))
    container.addEventListener("touchstart", () => setIsInteracting(true))
    container.addEventListener("touchend", () => setIsInteracting(false))

    return () => {
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("pointerdown", () => setIsInteracting(true))
      container.removeEventListener("pointerup", () => setIsInteracting(false))
      container.removeEventListener("touchstart", () => setIsInteracting(true))
      container.removeEventListener("touchend", () => setIsInteracting(false))
    }
  }, [updateMousePosition])

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_color1.value.set(config.color1)
      materialRef.current.uniforms.u_color2.value.set(config.color2)
      materialRef.current.uniforms.u_color3.value.set(config.color3)
      materialRef.current.uniforms.u_color4.value.set(config.color4)
      materialRef.current.uniforms.u_invertMouse.value = config.invertMouse
      materialRef.current.defines.VAR = config.variation
      materialRef.current.needsUpdate = true
    }
  }, [config])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
      style={{
        width: config.width,
        height: config.height,
        backgroundColor: "black",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full touch-none" />
      <div className="absolute bottom-4 left-4 text-white text-sm">
        {config.enableHover
          ? `${
              config.invertMouse ? "Inverted mouse" : "Normal mouse"
            } interaction`
          : "Interact with the animation"}{" "}
        using mouse or touch
      </div>
    </motion.div>
  )
}

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

type Action =
  | { type: "SET_VARIATION"; payload: number }
  | {
      type: "SET_COLOR"
      payload: { key: "color1" | "color2" | "color3" | "color4"; value: string }
    }
  | { type: "TOGGLE_HOVER" }
  | { type: "TOGGLE_INVERT_MOUSE" }
  | {
      type: "SET_DIMENSION"
      payload: { key: "width" | "height"; value: string }
    }

const initialState: ShaderConfig = {
  variation: 0,
  color1: "#ff0000",
  color2: "#00ff00",
  color3: "#0000ff",
  color4: "#ffff00",
  enableHover: true,
  invertMouse: true,
  width: "100%",
  height: "400px",
}

function reducer(state: ShaderConfig, action: Action): ShaderConfig {
  switch (action.type) {
    case "SET_VARIATION":
      return { ...state, variation: action.payload }
    case "SET_COLOR":
      return { ...state, [action.payload.key]: action.payload.value }
    case "TOGGLE_HOVER":
      return { ...state, enableHover: !state.enableHover }
    case "TOGGLE_INVERT_MOUSE":
      return { ...state, invertMouse: !state.invertMouse }
    case "SET_DIMENSION":
      return { ...state, [action.payload.key]: action.payload.value }
    default:
      return state
  }
}

export function ImprovedShaderAnimation() {
  const [config, dispatch] = useReducer(reducer, initialState)

  const handleVariationChange = useCallback((value: string) => {
    dispatch({ type: "SET_VARIATION", payload: parseInt(value) })
  }, [])

  const handleColorChange = useCallback(
    (key: "color1" | "color2" | "color3" | "color4", value: string) => {
      dispatch({ type: "SET_COLOR", payload: { key, value } })
    },
    []
  )

  const handleDimensionChange = useCallback(
    (key: "width" | "height", value: string) => {
      dispatch({ type: "SET_DIMENSION", payload: { key, value } })
    },
    []
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shader Animation Configurator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="variation">Variation</Label>
              <Select
                value={config.variation.toString()}
                onValueChange={handleVariationChange}
              >
                <SelectTrigger id="variation">
                  <SelectValue placeholder="Select variation" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3].map((v) => (
                    <SelectItem key={v} value={v.toString()}>
                      Variation {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(["color1", "color2", "color3", "color4"] as const).map(
              (color) => (
                <div key={color}>
                  <Label htmlFor={color}>{color}</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={color}
                      type="color"
                      value={config[color]}
                      onChange={(e) => handleColorChange(color, e.target.value)}
                      className="w-12 h-12 p-1"
                    />
                    <Input
                      type="text"
                      value={config[color]}
                      onChange={(e) => handleColorChange(color, e.target.value)}
                      className="flex-grow"
                    />
                  </div>
                </div>
              )
            )}
            <div className="flex items-center space-x-2">
              <Switch
                id="enableHover"
                checked={config.enableHover}
                onCheckedChange={() => dispatch({ type: "TOGGLE_HOVER" })}
              />
              <Label htmlFor="enableHover">Enable Hover</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="invertMouse"
                checked={config.invertMouse}
                onCheckedChange={() =>
                  dispatch({ type: "TOGGLE_INVERT_MOUSE" })
                }
              />
              <Label htmlFor="invertMouse">Invert Mouse</Label>
            </div>
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={config.width}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={config.height}
                onChange={(e) =>
                  handleDimensionChange("height", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ShaderAnimation config={initialState} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImprovedShaderAnimation
// "use client"

// import React, { useCallback, useEffect, useRef, useState } from "react"
// import { motion } from "motion/react"
// import * as THREE from "three"

// import { Button } from "@/components/ui/button"

// const fragmentShader = `
// varying vec2 v_texcoord;

// uniform vec2 u_mouse;
// uniform vec2 u_resolution;
// uniform float u_pixelRatio;
// uniform float u_time;
// uniform vec3 u_color1;
// uniform vec3 u_color2;
// uniform vec3 u_color3;
// uniform vec3 u_color4;
// uniform float u_hoverStrength;
// uniform bool u_invertMouse;

// #define PI 3.1415926535897932384626433832795
// #define TWO_PI 6.2831853071795864769252867665590

// vec2 coord(in vec2 p) {
//     p = p / u_resolution.xy;
//     if (u_resolution.x > u_resolution.y) {
//         p.x *= u_resolution.x / u_resolution.y;
//         p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
//     } else {
//         p.y *= u_resolution.y / u_resolution.x;
//         p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
//     }
//     p -= 0.5;
//     p *= vec2(-1.0, 1.0);
//     return p;
// }

// #define st0 coord(gl_FragCoord.xy)
// #define mx coord(u_mouse * u_pixelRatio)

// float sdRoundRect(vec2 p, vec2 b, float r) {
//     vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
//     return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
// }

// float sdCircle(in vec2 st, in vec2 center) {
//     return length(st - center) * 2.0;
// }

// float sdPoly(in vec2 p, in float w, in int sides) {
//     float a = atan(p.x, p.y) + PI;
//     float r = TWO_PI / float(sides);
//     float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
//     return d * 2.0 - w;
// }

// float aastep(float threshold, float value) {
//     float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
//     return smoothstep(threshold - afwidth, threshold + afwidth, value);
// }

// float fill(float x, float size, float edge) {
//     return 1.0 - smoothstep(size - edge, size + edge, x);
// }

// float stroke(float x, float size, float w, float edge) {
//     float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
//     return clamp(d, 0.0, 1.0);
// }

// void main() {
//     vec2 st = st0 + 0.5;
//     vec2 posMouse = mx * vec2(1., -1.) + 0.5;

//     float size = 1.2 + sin(u_time) * 0.1;
//     float roundness = 0.4 + sin(u_time * 0.5) * 0.1;
//     float borderSize = 0.05 + sin(u_time * 0.7) * 0.02;
//     float circleSize = 0.3 + sin(u_time * 0.8) * 0.05;
//     float circleEdge = 0.5 + sin(u_time * 0.6) * 0.1;

//     float sdfCircle = fill(
//         sdCircle(st, posMouse),
//         circleSize,
//         circleEdge
//     );

//     float sdf;
//     if (VAR == 0) {
//         sdf = sdRoundRect(st, vec2(size), roundness);
//         sdf = stroke(sdf, 0.0, borderSize, sdfCircle) * 4.0;
//     } else if (VAR == 1) {
//         sdf = sdCircle(st, vec2(0.5));
//         sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
//     } else if (VAR == 2) {
//         sdf = sdCircle(st, vec2(0.5));
//         sdf = stroke(sdf, 0.58, 0.02, sdfCircle) * 4.0;
//     } else if (VAR == 3) {
//         sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
//         sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
//     }

//     vec3 gradient = mix(
//         mix(u_color1, u_color2, 0.5 + 0.5 * cos(u_time + st.x + 0.0)),
//         mix(u_color3, u_color4, 0.5 + 0.5 * cos(u_time + st.y + 2.0)),
//         0.5 + 0.5 * cos(u_time + st.x + st.y + 4.0)
//     );

//     vec3 shapeColor = sdf * gradient;

//     float mouseEffect = u_invertMouse ? 1.0 - sdfCircle : sdfCircle;
//     shapeColor = mix(shapeColor, vec3(1.0) - shapeColor, u_hoverStrength * mouseEffect);

//     gl_FragColor = vec4(shapeColor, sdf);
// }
// `

// interface ImprovedShaderAnimationProps {
//   initialVariation?: number
//   color1?: string
//   color2?: string
//   color3?: string
//   color4?: string
//   className?: string
//   enableHover?: boolean
//   invertMouse?: boolean
//   width?: string
//   height?: string
// }

// export default function ImprovedShaderAnimation({
//   initialVariation = 0,
//   color1 = "#ff0000",
//   color2 = "#00ff00",
//   color3 = "#0000ff",
//   color4 = "#ffff00",
//   className = "",
//   enableHover = true,
//   invertMouse = true,
//   width = "100%",
//   height = "100%",
// }: ImprovedShaderAnimationProps) {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
//   const sceneRef = useRef<THREE.Scene | null>(null)
//   const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
//   const materialRef = useRef<THREE.ShaderMaterial | null>(null)
//   const rafRef = useRef<number | null>(null)
//   const [variation, setVariation] = useState(initialVariation)
//   const [isInteracting, setIsInteracting] = useState(false)

//   const updateSize = useCallback(() => {
//     if (
//       !containerRef.current ||
//       !canvasRef.current ||
//       !rendererRef.current ||
//       !cameraRef.current ||
//       !materialRef.current
//     )
//       return

//     const { clientWidth: w, clientHeight: h } = containerRef.current
//     const aspect = w / h

//     cameraRef.current.left = -aspect
//     cameraRef.current.right = aspect
//     cameraRef.current.top = 1
//     cameraRef.current.bottom = -1
//     cameraRef.current.updateProjectionMatrix()

//     rendererRef.current.setSize(w, h)
//     materialRef.current.uniforms.u_resolution.value.set(w, h)
//   }, [])

//   const updateMousePosition = useCallback(
//     (x: number, y: number) => {
//       if (!containerRef.current || !materialRef.current) return
//       const { clientWidth: w, clientHeight: h } = containerRef.current
//       if (isInteracting || enableHover) {
//         materialRef.current.uniforms.u_mouse.value.set(x, h - y)
//       }
//     },
//     [isInteracting, enableHover]
//   )

//   const animate = useCallback(
//     (time: number) => {
//       if (
//         !rendererRef.current ||
//         !sceneRef.current ||
//         !cameraRef.current ||
//         !materialRef.current
//       )
//         return

//       materialRef.current.uniforms.u_time.value = time * 0.001
//       materialRef.current.uniforms.u_hoverStrength.value =
//         isInteracting || enableHover ? 0.3 : 0

//       rendererRef.current.render(sceneRef.current, cameraRef.current)
//       rafRef.current = requestAnimationFrame(animate)
//     },
//     [enableHover, isInteracting]
//   )

//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current) return

//     const scene = new THREE.Scene()
//     sceneRef.current = scene

//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
//     camera.position.z = 1
//     cameraRef.current = camera

//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       antialias: true,
//       alpha: true,
//     })
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     renderer.setClearColor(0x000000, 0) // Set clear color to transparent
//     rendererRef.current = renderer

//     const geometry = new THREE.PlaneGeometry(2, 2)
//     const material = new THREE.ShaderMaterial({
//       vertexShader: `
//         varying vec2 v_texcoord;
//         void main() {
//           gl_Position = vec4(position, 1.0);
//           v_texcoord = uv;
//         }
//       `,
//       fragmentShader,
//       uniforms: {
//         u_mouse: { value: new THREE.Vector2() },
//         u_resolution: { value: new THREE.Vector2() },
//         u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
//         u_time: { value: 0 },
//         u_color1: { value: new THREE.Color(color1) },
//         u_color2: { value: new THREE.Color(color2) },
//         u_color3: { value: new THREE.Color(color3) },
//         u_color4: { value: new THREE.Color(color4) },
//         u_hoverStrength: { value: 0 },
//         u_invertMouse: { value: invertMouse },
//       },
//       defines: {
//         VAR: variation,
//       },
//       transparent: true,
//       blending: THREE.NormalBlending,
//     })
//     materialRef.current = material

//     const mesh = new THREE.Mesh(geometry, material)
//     scene.add(mesh)

//     updateSize()
//     rafRef.current = requestAnimationFrame(animate)

//     const resizeObserver = new ResizeObserver(updateSize)
//     resizeObserver.observe(containerRef.current)

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current)
//       if (rendererRef.current) rendererRef.current.dispose()
//       if (containerRef.current) resizeObserver.unobserve(containerRef.current)
//     }
//   }, [
//     color1,
//     color2,
//     color3,
//     color4,
//     variation,
//     invertMouse,
//     updateSize,
//     animate,
//   ])

//   useEffect(() => {
//     const container = containerRef.current
//     if (!container) return

//     const handlePointerMove = (event: PointerEvent) =>
//       updateMousePosition(event.clientX, event.clientY)
//     const handleTouchMove = (event: TouchEvent) => {
//       if (event.touches.length > 0) {
//         const touch = event.touches[0]
//         updateMousePosition(touch.clientX, touch.clientY)
//       }
//     }

//     container.addEventListener("pointermove", handlePointerMove)
//     container.addEventListener("touchmove", handleTouchMove)
//     container.addEventListener("pointerdown", () => setIsInteracting(true))
//     container.addEventListener("pointerup", () => setIsInteracting(false))
//     container.addEventListener("touchstart", () => setIsInteracting(true))
//     container.addEventListener("touchend", () => setIsInteracting(false))

//     return () => {
//       container.removeEventListener("pointermove", handlePointerMove)
//       container.removeEventListener("touchmove", handleTouchMove)
//       container.removeEventListener("pointerdown", () => setIsInteracting(true))
//       container.removeEventListener("pointerup", () => setIsInteracting(false))
//       container.removeEventListener("touchstart", () => setIsInteracting(true))
//       container.removeEventListener("touchend", () => setIsInteracting(false))
//     }
//   }, [updateMousePosition])

//   const handleVariationChange = useCallback((newVariation: number) => {
//     setVariation(newVariation)
//     if (materialRef.current) {
//       materialRef.current.defines.VAR = newVariation
//       materialRef.current.needsUpdate = true
//     }
//   }, [])

//   return (
//     <motion.div
//       ref={containerRef}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`relative ${className}`}
//       style={{ width, height, backgroundColor: "black" }}
//     >
//       <canvas ref={canvasRef} className="w-full h-full touch-none" />
//       <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//         {[0, 1, 2, 3].map((v) => (
//           <Button
//             key={v}
//             onClick={() => handleVariationChange(v)}
//             variant={variation === v ? "default" : "secondary"}
//             size="sm"
//           >
//             Var {v}
//           </Button>
//         ))}
//       </div>
//       <div className="absolute bottom-4 left-4 text-white text-sm">
//         {enableHover
//           ? `${invertMouse ? "Inverted mouse" : "Normal mouse"} interaction`
//           : "Interact with the animation"}{" "}
//         using mouse or touch
//       </div>
//     </motion.div>
//   )
// }
