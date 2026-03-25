<template>
  <Card>
    <CardHeader class="px-2">
      <CardTitle>Cookie Settings</CardTitle>
      <CardDescription>Manage your cookie settings here.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="flex items-center justify-between space-x-4">
        <Label for="necessary" class="flex flex-col space-y-1">
          <span>Strictly Necessary</span>
          <span class="text-xs font-normal leading-snug text-muted-foreground">
            These cookies are essential in order to use the website and use its features.
          </span>
        </Label>
        <Switch id="necessary" default-checked aria-label="Necessary" />
      </div>
      <div class="flex items-center justify-between space-x-4">
        <Label for="functional" class="flex flex-col space-y-1">
          <span>Functional Cookies</span>
          <span class="text-xs font-normal leading-snug text-muted-foreground">
            These cookies allow the website to provide personalized functionality.
          </span>
        </Label>
        <Switch id="functional" aria-label="Functional" />
      </div>
      <div class="flex items-center justify-between space-x-4">
        <Label for="performance" class="flex flex-col space-y-1">
          <span>Performance Cookies</span>
          <span class="text-xs font-normal leading-snug text-muted-foreground">
            These cookies help to improve the performance of the website.
          </span>
        </Label>
        <Switch id="performance" aria-label="Performance" />
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full">Save preferences</Button>
    </CardFooter>
  </Card>
</template>
