"use client"

import { useEffect, useState } from "react"
import { Mail, Monitor, Moon, Sun } from "lucide-react"

import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/registry/default/ui/popover-form"

type FormState = "idle" | "loading" | "success"

export function NewsletterSignupExample() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")

  function submit() {
    setFormState("loading")
    setTimeout(() => {
      setFormState("success")
    }, 1500)

    setTimeout(() => {
      setOpen(false)
      setFormState("idle")
      setEmail("")
    }, 3300)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex w-full items-center justify-center">
      <PopoverForm
        title="Newsletter Signup"
        open={open}
        setOpen={setOpen}
        width="320px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email) return
              submit()
            }}
            className="p-4"
          >
            <div className="mb-4 space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border  rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className=" text-muted-foreground size-4" />
                </div>
              </div>
              <p className="text-muted-foreground text-xs tracking-tight">
                Sick content to your mailbox every week!
              </p>
            </div>
            <PopoverFormButton
              loading={formState === "loading"}
              text="Subscribe"
            />
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="Successfully subscribed!"
            description="Thank you for joining our newsletter."
          />
        }
      />
    </div>
  )
}

type Theme = "light" | "dark" | "system"

export function ColorThemeSwitcherExample() {
  const [theme, setTheme] = useState("")
  const [open, setOpen] = useState(true)
  const themes: Theme[] = ["light", "dark", "system"]

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      if (theme) root.classList.add(theme)
    }
  }, [theme])

  return (
    <div className="flex w-full items-center justify-center">
      <PopoverForm
        showSuccess={false}
        title="Choose theme"
        open={open}
        setOpen={setOpen}
        width="200px"
        height="175px"
        showCloseButton={true}
        openChild={
          <div className="p-2">
            <h3 className="text-sm tracking-tight text-muted-foreground">
              Theme
            </h3>

            <div className="pt-2 space-y-2">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    theme === t
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                  {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                  {t === "system" && <Monitor className="mr-2 h-4 w-4" />}
                  <span className="capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
        }
      />
    </div>
  )
}

export function FeedbackFormExample() {
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
            className=""
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
              <PopoverFormButton
                loading={formState === "loading"}
                text="Submit"
              />
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

export function ContactFormExample() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  function submit() {
    setFormState("loading")
    setTimeout(() => {
      setFormState("success")
    }, 1500)

    setTimeout(() => {
      setOpen(false)
      setFormState("idle")
      setName("")
      setEmail("")
      setMessage("")
    }, 3300)
  }

  return (
    <div className="flex  w-full items-center justify-center">
      <PopoverForm
        title="Click Here"
        open={open}
        setOpen={setOpen}
        width="364px"
        height="372px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!name || !email || !message) return
              submit()
            }}
            className=" space-y-4"
          >
            <div className="px-4 pt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                required
              />
            </div>
            <div className="px-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                required
              />
            </div>
            <div className="px-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                rows={3}
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
              <PopoverFormButton
                loading={formState === "loading"}
                text="Submit"
              />
            </div>
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="Message Sent"
            description="Thank you for contacting us. We'll get back to you soon!"
          />
        }
      />
    </div>
  )
}

export default function PopoverFormExamples() {
  return (
    <div className="space-y-8 grid grid-cols-1 ">
      <FeedbackFormExample />
      <ContactFormExample />
      <NewsletterSignupExample />
      <ColorThemeSwitcherExample />
    </div>
  )
}
