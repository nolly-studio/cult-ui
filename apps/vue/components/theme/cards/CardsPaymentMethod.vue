<script setup lang="ts">
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
</script>

<template>
  <Card>
    <CardHeader class="px-2">
      <CardTitle>Payment Method</CardTitle>
      <CardDescription>Add a new payment method to your account.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <RadioGroup default-value="card" class="grid grid-cols-3 gap-4">
        <div>
          <RadioGroupItem value="card" id="card" class="peer sr-only" aria-label="Card" />
          <Label
            for="card"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mb-3 size-6">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
            Card
          </Label>
        </div>
        <div>
          <RadioGroupItem value="paypal" id="paypal" class="peer sr-only" aria-label="Paypal" />
          <Label
            for="paypal"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg class="mb-3 size-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.622c2.188 0 3.834.542 4.89 1.61.478.485.807 1.038.978 1.643.177.627.237 1.378.178 2.23-.066.993-.293 2.108-.678 3.31-.414 1.292-.929 2.387-1.532 3.255a7.548 7.548 0 0 1-2.134 2.162 6.404 6.404 0 0 1-2.413 1.063c-.823.187-1.765.28-2.802.28H7.926a.77.77 0 0 0-.757.64l-.093.53z" />
            </svg>
            Paypal
          </Label>
        </div>
        <div>
          <RadioGroupItem value="apple" id="apple" class="peer sr-only" aria-label="Apple" />
          <Label
            for="apple"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg class="mb-3 size-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Apple
          </Label>
        </div>
      </RadioGroup>
      <div class="grid gap-2">
        <Label for="name">Name</Label>
        <Input id="name" placeholder="First Last" />
      </div>
      <div class="grid gap-2">
        <Label for="city">City</Label>
        <Input id="city" />
      </div>
      <div class="grid gap-2">
        <Label for="number">Card number</Label>
        <Input id="number" />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="grid gap-2">
          <Label for="month">Expires</Label>
          <Select>
            <SelectTrigger id="month" aria-label="Month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="m in 12" :key="m" :value="String(m)">
                {{ new Date(2000, m - 1).toLocaleString('en', { month: 'long' }) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="year">Year</Label>
          <Select>
            <SelectTrigger id="year" aria-label="Year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="y in years" :key="y" :value="String(y)">
                {{ y }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="cvc">CVC</Label>
          <Input id="cvc" placeholder="CVC" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">Continue</Button>
    </CardFooter>
  </Card>
</template>
