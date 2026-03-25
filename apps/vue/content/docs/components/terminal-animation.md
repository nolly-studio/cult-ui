---
title: Terminal Animation
description: Composable terminal UI primitives with typed command playback, tabbed scenarios, and customizable output rendering.
component: true
links: {}
---

::component-preview{name="terminal-animation-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[88%]" description="Interactive command tabs with staged output animation"}
::

## Installation

::code-tabs
---
tabs:
  - label: "CLI"
    value: "cli"
  - label: "Manual"
    value: "manual"
---

#cli

```bash
npx shadcn@latest add https://cult-ui.com/r/terminal-animation.json
```

#manual

::steps
Install the required dependencies.

```bash
npm install @radix-ui/react-slot @radix-ui/react-use-controllable-state
```

Copy and paste the component source into your project.

::component-source{name="terminal-animation"}
::

Optionally copy the demo as a starting point.

::component-source{name="terminal-animation-demo"}
::

Add this cursor blink utility to your global stylesheet (for example, <code>globals.css</code>).

```css
@keyframes caret-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@utility animate-caret-blink {
  animation: caret-blink 1s step-end infinite;
}
```

Update import paths to match your project setup.
::

::

## Usage

```tsx
import {
  TerminalAnimationRoot,
  TerminalAnimationContainer,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  type TabContent,
} from "@/components/ui/terminal-animation"

const tabs: TabContent[] = [
  {
    label: "dev",
    command: "npm run dev",
    lines: [
      { text: "  ▲ Next.js 16.1.6", delay: 300 },
      { text: "  - Local: http://localhost:3000", delay: 200, color: "text-cyan-400" },
    ],
  },
]
```

```tsx
<TerminalAnimationRoot tabs={tabs} defaultActiveTab={0}>
  <TerminalAnimationContainer>
    <TerminalAnimationWindow>
      <TerminalAnimationContent>
        <TerminalAnimationCommandBar className="font-mono text-sm" />
        <TerminalAnimationOutput className="mt-2 space-y-1" />
      </TerminalAnimationContent>

      <TerminalAnimationTabList className="flex gap-2 p-4">
        {tabs.map((tab, index) => (
          <TerminalAnimationTabTrigger key={tab.label} index={index}>
            {tab.label}
          </TerminalAnimationTabTrigger>
        ))}
      </TerminalAnimationTabList>
    </TerminalAnimationWindow>
  </TerminalAnimationContainer>
</TerminalAnimationRoot>
```

## Controlled Tabs

Use `activeTab` + `onActiveTabChange` when tab state is managed externally:

```tsx
const [activeTab, setActiveTab] = useState(1)

<TerminalAnimationRoot
  tabs={tabs}
  activeTab={activeTab}
  onActiveTabChange={setActiveTab}
>
  {/* terminal layout */}
</TerminalAnimationRoot>
```

## Custom Output Rendering

Use `renderLine` to fully control how each output line appears:

```tsx
<TerminalAnimationOutput
  renderLine={(line, index, visible) => {
    if (!visible) return null

    return (
      <div className="font-mono text-sm leading-relaxed">
        <span className="text-muted-foreground mr-3 select-none">{String(index + 1).padStart(2, "0")}</span>
        <span className={line.color ?? "text-foreground"}>{line.text || "\u00A0"}</span>
      </div>
    )
  }}
/>
```

## API Reference

### Data Types

#### `TerminalLine`

| Property | Type | Description |
| --- | --- | --- |
| `text` | `string` | Text content for an output line |
| `color` | `string` | Optional utility class for line color |
| `delay` | `number` | Delay (ms) before revealing the next line |

#### `TabContent`

| Property | Type | Description |
| --- | --- | --- |
| `label` | `string` | Tab label |
| `command` | `string` | Command text to animate in the prompt |
| `lines` | `TerminalLine[]` | Output lines revealed after command typing |

### `TerminalAnimationRoot`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` | `TabContent[]` | - | Data source for command tabs and output |
| `defaultActiveTab` | `number` | `0` | Initial tab index (uncontrolled mode) |
| `activeTab` | `number` | - | Controlled active tab index |
| `onActiveTabChange` | `(index: number) => void` | - | Called when tab changes |
| `backgroundImage` | `string` | - | Optional full-bleed background image URL |
| `alwaysDark` | `boolean` | `false` | Forces dark terminal theme regardless of page theme |

### `TerminalAnimationWindow`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `backgroundColor` | `string` | - | Inline background color override |
| `minHeight` | `string` | `"28rem"` | Minimum height of the terminal area |
| `animateOnVisible` | `boolean` | `true` | Plays slide-up transition when entering viewport |

### `TerminalAnimationCommandBar`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cursor` | `ReactNode` | block cursor | Custom cursor while command is typing |

### `TerminalAnimationOutput`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `renderLine` | `(line, index, visible) => ReactNode` | - | Custom renderer for each output line |

### `TerminalAnimationTabTrigger`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `index` | `number` | - | Target tab index |
| `asChild` | `boolean` | `false` | Renders via `Slot` to merge props into a custom child |

## Exports

The component includes a full set of primitives for composition:

- `TerminalAnimationRoot`
- `TerminalAnimationBackgroundGradient`
- `TerminalAnimationContainer`
- `TerminalAnimationWindow`
- `TerminalAnimationContent`
- `TerminalAnimationBlinkingCursor`
- `TerminalAnimationCommandBar`
- `TerminalAnimationOutput`
- `TerminalAnimationOutputLine`
- `TerminalAnimationTrailingPrompt`
- `TerminalAnimationTabList`
- `TerminalAnimationTabTrigger`
- `useTerminalAnimation`
- `defaultTerminalTabs`
