import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  TextureCard,
  TextureCardContent,
  TextureCardDescription,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardTitle,
} from "@/registry/default/ui/texture-card"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export const iframeHeight = "600px"

export const containerClassName =
  "w-full h-screen flex items-center justify-center px-4"

export default function LoginForm() {
  return (
    <TextureCard className="w-full max-w-sm">
      <TextureCardHeader>
        <TextureCardTitle className="text-2xl">Login</TextureCardTitle>
        <TextureCardDescription>
          Enter your email below to login to your account.
        </TextureCardDescription>
      </TextureCardHeader>
      <TextureCardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </TextureCardContent>
      <TextureCardFooter>
        <Button className="w-full">Sign in</Button>
      </TextureCardFooter>
    </TextureCard>
  )
}
