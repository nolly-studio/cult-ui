<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Send } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const messages = ref([
  { role: 'agent', content: 'Hi, how can I help you today?' },
  { role: 'user', content: "Hey, I'm having trouble with my account." },
  { role: 'agent', content: 'What seems to be the problem?' },
  { role: 'user', content: "I can't log in." },
])
const input = ref('')

function sendMessage() {
  if (input.value.trim().length === 0) return
  messages.value.push({ role: 'user', content: input.value })
  input.value = ''
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center px-2">
      <div class="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">Sofia Davis</p>
          <p class="text-sm text-muted-foreground">m@example.com</p>
        </div>
      </div>
      <TooltipProvider :delay-duration="0">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button size="icon" variant="outline" class="ml-auto rounded-full">
              <Plus class="size-4" />
              <span class="sr-only">New message</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent :side-offset="10">New message</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="cn(
            'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
            message.role === 'user'
              ? 'ml-auto bg-primary text-primary-foreground'
              : 'bg-muted',
          )"
        >
          {{ message.content }}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <form class="flex w-full items-center space-x-2" @submit.prevent="sendMessage">
        <Input
          id="message"
          v-model="input"
          placeholder="Type your message..."
          class="flex-1"
          autocomplete="off"
        />
        <Button type="submit" size="icon" :disabled="input.trim().length === 0">
          <Send class="size-4" />
          <span class="sr-only">Send</span>
        </Button>
      </form>
    </CardFooter>
  </Card>
</template>
