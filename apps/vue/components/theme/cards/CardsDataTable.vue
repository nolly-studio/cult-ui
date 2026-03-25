<script setup lang="ts">
import { ref, computed } from 'vue'

interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const data: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
]

const filterValue = ref('')

const filteredData = computed(() => {
  if (!filterValue.value) return data
  return data.filter(row =>
    row.email.toLowerCase().includes(filterValue.value.toLowerCase()),
  )
})

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
</script>

<template>
  <Card>
    <CardHeader class="px-2">
      <CardTitle>Payments</CardTitle>
      <CardDescription>Manage your payments.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="mb-4 flex items-center gap-4">
        <Input
          v-model="filterValue"
          placeholder="Filter emails..."
          class="max-w-sm"
        />
      </div>
      <div class="rounded-md border">
        <table class="w-full caption-bottom text-sm">
          <thead class="[&_tr]:border-b">
            <tr class="border-b transition-colors hover:bg-muted/50">
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
              <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th class="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0">
            <tr
              v-for="row in filteredData"
              :key="row.id"
              class="border-b transition-colors hover:bg-muted/50"
            >
              <td class="p-4 align-middle capitalize">{{ row.status }}</td>
              <td class="p-4 align-middle lowercase">{{ row.email }}</td>
              <td class="p-4 align-middle text-right font-medium">{{ formatCurrency(row.amount) }}</td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td colspan="3" class="h-24 text-center">No results.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>
