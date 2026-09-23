"use client";

import { Mail, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/registry/default/ui/popover-form";

type FormState = "idle" | "loading" | "success";

export function NewsletterSignupExample() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setEmail("");
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              e.preventDefault();
              if (!email) return;
              submit();
            }}
            className="p-4"
          >
            <div className="mb-4 space-y-2">
              <label
                htmlFor="email"
                className="text-muted-foreground mb-1 block text-sm font-medium"
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
                  className="placeholder-muted-foreground focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <Mail className="text-muted-foreground size-4" />
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
  );
}

type Theme = "light" | "dark" | "system";

export function ColorThemeSwitcherExample() {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const themes: Theme[] = ["light", "dark", "system"];

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => {
      setSystemTheme(systemPrefersDark.matches ? "dark" : "light");
    };

    updateSystemTheme();
    systemPrefersDark.addEventListener("change", updateSystemTheme);

    return () => {
      systemPrefersDark.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, systemTheme]);

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
            <h3 className="text-muted-foreground text-sm tracking-tight">
              Theme
            </h3>

            <div className="space-y-2 pt-2">
              {themes.map((t) => {
                const isSelected = theme === t;
                const effectiveTheme = t === "system" ? systemTheme : t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-sm ${
                      isSelected
                        ? `bg-primary ${
                            effectiveTheme === "light"
                              ? "text-white"
                              : "text-black"
                          }`
                        : `hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-800 dark:hover:text-white`
                    }`}
                  >
                    {t === "light" && <Sun className="mr-2 h-4 w-4" />}
                    {t === "dark" && <Moon className="mr-2 h-4 w-4" />}
                    {t === "system" && <Monitor className="mr-2 h-4 w-4" />}
                    <span className="capitalize">{t}</span>
                  </button>
                );
              })}
            </div>
          </div>
        }
      />
    </div>
  );
}

export function FeedbackFormExample() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setFeedback("");
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

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
              e.preventDefault();
              if (!feedback) return;
              submit();
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
              <div className="absolute top-0 left-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div className="absolute top-0 right-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
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
  );
}

export function ContactFormExample() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setName("");
      setEmail("");
      setMessage("");
    }, 3300);
  }

  return (
    <div className="flex w-full items-center justify-center">
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
              e.preventDefault();
              if (!name || !email || !message) return;
              submit();
            }}
            className="space-y-4"
          >
            <div className="px-4 pt-4">
              <label
                htmlFor="name"
                className="text-muted-foreground mb-1 block text-sm font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:ring-primary focus:border-primary w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-black"
                required
              />
            </div>
            <div className="px-4">
              <label
                htmlFor="email"
                className="text-muted-foreground mb-1 block text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-primary focus:border-primary w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-black"
                required
              />
            </div>
            <div className="px-4">
              <label
                htmlFor="message"
                className="text-muted-foreground mb-1 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus:ring-primary focus:border-primary w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:outline-none dark:bg-black"
                rows={3}
                required
              />
            </div>
            <div className="relative flex h-12 items-center px-[10px]">
              <PopoverFormSeparator />
              <div className="absolute top-0 left-0 -translate-x-[1.5px] -translate-y-1/2">
                <PopoverFormCutOutLeftIcon />
              </div>
              <div className="absolute top-0 right-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
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
  );
}

export default function PopoverFormExamples() {
  return (
    <div className="grid grid-cols-1 space-y-8">
      <FeedbackFormExample />
      <ContactFormExample />
      <NewsletterSignupExample />
      <ColorThemeSwitcherExample />
    </div>
  );
}
