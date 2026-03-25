<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

const members = [
  { name: 'Sofia Davis', email: 'm@example.com', avatar: '/avatars/01.png', fallback: 'OM', role: 'Owner' },
  { name: 'Jackson Lee', email: 'p@example.com', avatar: '/avatars/02.png', fallback: 'JL', role: 'Member' },
  { name: 'Isabella Nguyen', email: 'i@example.com', avatar: '/avatars/03.png', fallback: 'IN', role: 'Member' },
]

const roles = [
  { name: 'Viewer', description: 'Can view and comment.' },
  { name: 'Developer', description: 'Can view, comment and edit.' },
  { name: 'Billing', description: 'Can view, comment and manage billing.' },
  { name: 'Owner', description: 'Admin-level access to all resources.' },
]
</script>

<template>
  <Card>
    <CardHeader class="pl-4">
      <CardTitle>Team Members</CardTitle>
      <CardDescription>Invite your team members to collaborate.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div
        v-for="member in members"
        :key="member.email"
        class="flex items-center justify-between space-x-4"
      >
        <div class="flex items-center space-x-4">
          <Avatar class="size-8">
            <AvatarImage :src="member.avatar" alt="Image" />
            <AvatarFallback>{{ member.fallback }}</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">{{ member.name }}</p>
            <p class="text-sm text-muted-foreground">{{ member.email }}</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="ml-auto">
              {{ member.role }}
              <ChevronDown class="ml-2 size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0" align="end">
            <Command>
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup class="p-1.5">
                  <CommandItem
                    v-for="role in roles"
                    :key="role.name"
                    class="flex flex-col items-start space-y-1 px-4 py-2"
                  >
                    <p>{{ role.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ role.description }}</p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</template>
