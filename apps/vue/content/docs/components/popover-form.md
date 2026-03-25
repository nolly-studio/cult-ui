---
title: PopoverForm
description: A headless popover form animation component with customizable options.
component: true
links: {}
---

::component-preview{name="popover-form-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
::

## References

::citations
---
label: "Inspiration"
items:
  - text: "Animations dot dev"
    href: "https://animations.dev/learn"
---
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
npx shadcn@latest add https://cult-ui.com/r/popover-form.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="popover-form"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/registry/default/ui/popover-form"
```

```typescriptreact
export default function PopoverFormFeedbackExample() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState("")

  function submit() {
    setFormState("loading")
    setTimeout(() => {
      setFormState("success")
    }, 1500)

    setTimeout(() => {
      setOpen(false)
      setFormState("idle")
      setFeedback("")
    }, 3300)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, formState])

  return (
    <div className="flex w-full items-center justify-center">
      <PopoverForm
        title="Feedback"
        open={open}
        setOpen={setOpen}
        width="364px"
        height="192px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!feedback) return
              submit()
            }}
          >
            <div className="relative">
              <textarea
                autoFocus
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="h-32 w-full resize-none rounded-t-lg p-3 text-sm outline-none"
                required
              />
            </div>
            <div className="relative flex h-12 items-center px-[10px]">
              <PopoverFormSeparator />
              <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                <PopoverFormCutOutRightIcon />
              </div>
              <PopoverFormButton loading={formState === "loading"} />
            </div>
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="Feedback Received"
            description="Thank you for supporting our project!"
          />
        }
      />
    </div>
  )
}
```
