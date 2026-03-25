<script setup lang="ts">
import { CodeBlock } from '@/registry/default/ui/code-block'
</script>

<template>
  <main>
    <div class="mx-auto space-y-8">
      <div class="space-y-3">
        <h2 class="text-xl font-semibold">Package Manager Installation</h2>
        <CodeBlock
          :tabs="[
            { label: 'npm', code: 'npm install @acme/ui', language: 'bash' },
            { label: 'pnpm', code: 'pnpm add @acme/ui', language: 'bash' },
            { label: 'yarn', code: 'yarn add @acme/ui', language: 'bash' },
            { label: 'bun', code: 'bun add @acme/ui', language: 'bash' },
          ]"
        />
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-semibold">Single Code Block</h2>
        <CodeBlock
          :code="`import { CodeBlock } from '@/components/code-block'\n\nexport default function Page() {\n  return (\n    <CodeBlock\n      code=&quot;console.log('Hello, world!')&quot;\n      language=&quot;javascript&quot;\n    />\n  )\n}`"
          language="tsx"
        />
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-semibold">API Configuration</h2>
        <CodeBlock
          :tabs="[
            {
              label: '.env.local',
              code: 'NEXT_PUBLIC_API_URL=https://api.example.com\nAPI_SECRET_KEY=your-secret-key',
              language: 'bash',
            },
            {
              label: 'config.ts',
              code: `export const config = {\n  apiUrl: process.env.NEXT_PUBLIC_API_URL,\n  apiKey: process.env.API_SECRET_KEY,\n}`,
              language: 'typescript',
            },
          ]"
        />
      </div>
    </div>
  </main>
</template>
