<script setup lang="ts">
import { ref } from 'vue'
import {
  PromptLibrary,
  PromptLibraryContent,
  PromptLibraryCreateDialog,
  PromptLibraryCreateTrigger,
  PromptLibraryEmpty,
  PromptLibraryFooter,
  PromptLibraryGroup,
  PromptLibraryItem,
  PromptLibraryList,
  PromptLibrarySearch,
  PromptLibraryTrigger,
} from '../ui/prompt-library'
import type { Prompt } from '../ui/prompt-library'

const SAMPLE_PROMPTS: Prompt[] = [
  { id: 'code-review', title: 'Code Review', description: 'Review code for best practices and potential issues', prompt: 'Please review the following code for:\n- Best practices and coding standards\n- Potential bugs or edge cases\n- Performance optimizations\n- Security vulnerabilities\n- Suggestions for improvement', category: 'Development' },
  { id: 'explain-code', title: 'Explain Code', description: 'Get a detailed explanation of how code works', prompt: 'Please explain this code in detail:\n- What does each part do?\n- How do the components interact?\n- What are the key concepts being used?\n- Are there any important patterns or techniques?', category: 'Development' },
  { id: 'write-tests', title: 'Write Tests', description: 'Generate unit tests for the given code', prompt: 'Please write comprehensive unit tests for this code:\n- Cover all public methods and functions\n- Include edge cases and error scenarios\n- Use descriptive test names\n- Add comments explaining what each test validates', category: 'Testing' },
  { id: 'refactor', title: 'Refactor Code', description: 'Suggest improvements and cleaner implementations', prompt: 'Please refactor this code to:\n- Improve readability and maintainability\n- Follow SOLID principles\n- Reduce complexity and duplication\n- Use modern language features where appropriate', category: 'Development' },
  { id: 'document', title: 'Generate Documentation', description: 'Create documentation for code or APIs', prompt: 'Please generate documentation for this code including:\n- Overview and purpose\n- Parameters and return values\n- Usage examples\n- Any important notes or caveats', category: 'Documentation' },
]

const prompts = ref<Prompt[]>(SAMPLE_PROMPTS)
const lastSelected = ref<Prompt | null>(null)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="rounded-lg border bg-card p-4">
      <p class="mb-3 text-muted-foreground text-sm">
        Browse and insert prompt templates. Click a prompt to copy it to clipboard.
      </p>
      <PromptLibrary
        :prompts="prompts"
        @update:prompts="prompts = $event"
        @select="lastSelected = $event"
      >
        <PromptLibraryTrigger />
        <PromptLibraryContent>
          <PromptLibrarySearch />
          <PromptLibraryList>
            <PromptLibraryEmpty />
            <PromptLibraryGroup heading="Development">
              <PromptLibraryItem
                v-for="prompt in prompts.filter(p => p.category === 'Development')"
                :key="prompt.id"
                :prompt="prompt"
              />
            </PromptLibraryGroup>
            <PromptLibraryGroup heading="Testing">
              <PromptLibraryItem
                v-for="prompt in prompts.filter(p => p.category === 'Testing')"
                :key="prompt.id"
                :prompt="prompt"
              />
            </PromptLibraryGroup>
            <PromptLibraryGroup heading="Documentation">
              <PromptLibraryItem
                v-for="prompt in prompts.filter(p => p.category === 'Documentation')"
                :key="prompt.id"
                :prompt="prompt"
              />
            </PromptLibraryGroup>
            <PromptLibraryGroup heading="Custom">
              <PromptLibraryItem
                v-for="prompt in prompts.filter(p => p.isCustom)"
                :key="prompt.id"
                :prompt="prompt"
              />
            </PromptLibraryGroup>
          </PromptLibraryList>
          <PromptLibraryFooter>
            <PromptLibraryCreateTrigger />
          </PromptLibraryFooter>
        </PromptLibraryContent>
        <PromptLibraryCreateDialog />
      </PromptLibrary>
    </div>
    <div v-if="lastSelected" class="rounded-lg border bg-muted/50 p-3">
      <p class="mb-2 font-medium text-xs">Last copied:</p>
      <p class="font-medium text-sm">{{ lastSelected.title }}</p>
      <p class="mt-1 line-clamp-2 text-muted-foreground text-xs">{{ lastSelected.prompt }}</p>
    </div>
  </div>
</template>
