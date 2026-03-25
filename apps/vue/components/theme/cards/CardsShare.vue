<template>
  <Card>
    <CardHeader class="px-2 pb-3">
      <CardTitle>Share this document</CardTitle>
      <CardDescription>Anyone with the link can view this document.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-2">
        <Label for="link" class="sr-only">Link</Label>
        <Input id="link" value="http://example.com/link/to/document" readonly />
        <Button variant="secondary" class="shrink-0">Copy Link</Button>
      </div>
      <Separator class="my-4" />
      <div class="space-y-4">
        <h4 class="text-sm font-medium">People with access</h4>
        <div class="grid gap-6">
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/03.png" alt="Image" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">Olivia Martin</p>
                <p class="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
            <Select default-value="edit">
              <SelectTrigger class="ml-auto w-[110px]" aria-label="Edit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">Can edit</SelectItem>
                <SelectItem value="view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/05.png" alt="Image" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">Isabella Nguyen</p>
                <p class="text-sm text-muted-foreground">b@example.com</p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]" aria-label="Edit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">Can edit</SelectItem>
                <SelectItem value="view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">Sofia Davis</p>
                <p class="text-sm text-muted-foreground">p@example.com</p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]" aria-label="Edit">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">Can edit</SelectItem>
                <SelectItem value="view">Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
