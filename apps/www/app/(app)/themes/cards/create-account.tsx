"use client"

import { ghStars } from "@/lib/fetchGhStars"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import {
  TextureCard,
  TextureCardContent,
  TextureCardDescription,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardTitle,
} from "@/registry/default/ui/texture-card"

export function CardsCreateAccount() {
  const stars = ghStars()

  return (
    <TextureCard>
      <TextureCardHeader className="space-y-1 px-2">
        <TextureCardTitle className="text-2xl">
          Create an account
        </TextureCardTitle>
        <TextureCardDescription>
          Enter your email below to create your account
        </TextureCardDescription>
      </TextureCardHeader>
      <TextureCardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
            {stars}
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </TextureCardContent>
      <TextureCardFooter>
        <Button className="w-full">Create account</Button>
      </TextureCardFooter>
    </TextureCard>
  )
}
