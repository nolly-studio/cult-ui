<script setup lang="ts">
import {
  Battery,
  Bluetooth,
  Calendar,
  Clock,
  Cloud,
  Droplets,
  Fingerprint,
  MapPin,
  MessageSquare,
  Mic,
  ShoppingCart,
  Star,
  Sun,
  Users,
  Video,
  Wind,
} from 'lucide-vue-next'
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from '@/registry/default/ui/expandable'
</script>

<template>
  <div class="w-full max-w-7xl mx-auto space-y-12">
    <div class="flex flex-col items-center space-y-24 p-8">
      <!-- Design Sync Example -->
      <Expandable
        expand-direction="both"
        expand-behavior="replace"
        :initial-delay="0.2"
      >
        <template #default="{ isExpanded }">
          <ExpandableTrigger>
            <ExpandableCard
              class="w-full relative"
              :collapsed-size="{ width: 320, height: 240 }"
              :expanded-size="{ width: 420, height: 480 }"
              :hover-to-expand="false"
              :expand-delay="200"
              :collapse-delay="500"
            >
              <ExpandableCardHeader>
                <div class="flex justify-between items-start w-full">
                  <div class="flex items-start flex-col">
                    <span class="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 mb-2 rounded-md px-2 py-0.5 text-xs">In 15 mins</span>
                    <h3 class="font-semibold text-xl text-gray-800 dark:text-white">Design Sync</h3>
                  </div>
                  <button class="h-8 w-8 rounded-md border flex items-center justify-center">
                    <Calendar class="h-4 w-4" />
                  </button>
                </div>
              </ExpandableCardHeader>
              <ExpandableCardContent>
                <div class="flex flex-col items-start justify-between mb-4">
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Clock class="h-4 w-4 mr-1" />
                    <span>1:30PM → 2:30PM</span>
                  </div>
                  <ExpandableContent preset="blur-md">
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin class="h-4 w-4 mr-1" />
                      <span>Conference Room A</span>
                    </div>
                  </ExpandableContent>
                </div>
                <ExpandableContent preset="blur-md" stagger :stagger-children="0.2">
                  <p class="text-sm text-gray-700 dark:text-gray-200 mb-4">
                    Weekly design sync to discuss ongoing projects, share updates, and address any design-related challenges.
                  </p>
                  <div class="mb-4">
                    <h4 class="font-medium text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                      <Users class="h-4 w-4 mr-2" /> Attendees:
                    </h4>
                    <div class="flex -space-x-2 overflow-hidden">
                      <div v-for="(name, index) in ['Alice', 'Bob', 'Charlie', 'David']" :key="index" class="w-8 h-8 rounded-full bg-muted border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                        {{ name[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <button class="w-full bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm inline-flex items-center justify-center">
                      <Video class="h-4 w-4 mr-2" /> Join Meeting
                    </button>
                    <button v-if="isExpanded" class="w-full rounded-md border px-4 py-2 text-sm inline-flex items-center justify-center">
                      <MessageSquare class="h-4 w-4 mr-2" /> Open Chat
                    </button>
                  </div>
                </ExpandableContent>
              </ExpandableCardContent>
              <ExpandableContent preset="slide-up">
                <ExpandableCardFooter>
                  <div class="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                    <span>Weekly</span>
                    <span>Next: Mon, 10:00 AM</span>
                  </div>
                </ExpandableCardFooter>
              </ExpandableContent>
            </ExpandableCard>
          </ExpandableTrigger>
        </template>
      </Expandable>

      <!-- Product Showcase Card -->
      <Expandable expand-direction="both" expand-behavior="replace">
        <template #default="{ isExpanded }">
          <ExpandableTrigger>
            <ExpandableCard
              class="w-full relative"
              :collapsed-size="{ width: 330, height: 220 }"
              :expanded-size="{ width: 500, height: 520 }"
              :hover-to-expand="false"
              :expand-delay="500"
              :collapse-delay="700"
            >
              <ExpandableCardHeader>
                <div class="flex justify-between items-center">
                  <span class="bg-blue-100 text-blue-800 rounded-md px-2 py-0.5 text-xs">New Arrival</span>
                  <span class="rounded-md border px-2 py-0.5 text-xs ml-2">$129.99</span>
                </div>
              </ExpandableCardHeader>
              <ExpandableCardContent>
                <div class="flex items-start mb-4">
                  <img
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_rd.jpg;maxHeight=640;maxWidth=550;format=webp"
                    alt="Product"
                    class="object-cover rounded-md mr-4"
                    :style="{ width: isExpanded ? '120px' : '80px', height: isExpanded ? '120px' : '80px', transition: 'width 0.3s, height 0.3s' }"
                  />
                  <div class="flex-1">
                    <h3
                      class="font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300"
                      :style="{ fontSize: isExpanded ? '24px' : '18px', fontWeight: isExpanded ? '700' : '400' }"
                    >
                      Sony Headphones
                    </h3>
                    <div class="flex items-center mt-1">
                      <Star v-for="star in 5" :key="star" class="w-4 h-4 text-yellow-400 fill-current" />
                      <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {{ isExpanded ? '(128 reviews)' : '(128)' }}
                      </span>
                    </div>
                  </div>
                </div>
                <ExpandableContent preset="fade" :keep-mounted="false">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
                    Experience crystal-clear audio with our latest noise-cancelling technology.
                  </p>
                  <div class="space-y-4">
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Battery class="w-4 h-4 mr-2" /><span>30-hour battery life</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Bluetooth class="w-4 h-4 mr-2" /><span>Bluetooth 5.0</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Fingerprint class="w-4 h-4 mr-2" /><span>Touch controls</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mic class="w-4 h-4 mr-2" /><span>Voice assistant compatible</span>
                    </div>
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm inline-flex items-center justify-center">
                      <ShoppingCart class="w-4 h-4 mr-2" /> Add to Cart
                    </button>
                  </div>
                </ExpandableContent>
              </ExpandableCardContent>
              <ExpandableContent preset="slide-up">
                <ExpandableCardFooter>
                  <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 w-full">
                    <span>Free shipping</span>
                    <span>30-day return policy</span>
                  </div>
                </ExpandableCardFooter>
              </ExpandableContent>
            </ExpandableCard>
          </ExpandableTrigger>
        </template>
      </Expandable>

      <!-- Weather Forecast Card -->
      <Expandable expand-direction="both" expand-behavior="replace">
        <ExpandableTrigger>
          <ExpandableCard
            :collapsed-size="{ width: 300, height: 220 }"
            :expanded-size="{ width: 500, height: 420 }"
            :hover-to-expand="false"
            :expand-delay="100"
            :collapse-delay="400"
          >
            <ExpandableCardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Sun class="w-8 h-8 text-yellow-400 mr-2" />
                  <ExpandableContent preset="blur-sm" :keep-mounted="true">
                    <h3 class="font-medium text-lg">Today's Weather</h3>
                    <span class="bg-blue-100 text-blue-800 rounded-md px-2 py-0.5 text-xs">72°F</span>
                  </ExpandableContent>
                </div>
              </div>
            </ExpandableCardHeader>
            <ExpandableCardContent>
              <div class="flex justify-between items-center mb-4">
                <div>
                  <p class="text-2xl font-bold">72°F</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Feels like 75°F</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">Sunny</p>
                  <ExpandableContent preset="blur-sm" stagger :stagger-children="0.1" :keep-mounted="true">
                    <p class="text-sm text-gray-600 dark:text-gray-400">High 78° / Low 65°</p>
                  </ExpandableContent>
                </div>
              </div>
              <ExpandableContent preset="blur-sm" stagger :stagger-children="0.1" :keep-mounted="true">
                <div class="space-y-2 mb-4">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center"><Cloud class="w-5 h-5 mr-2 text-gray-400" /><span>Humidity</span></div>
                    <span>45%</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center"><Wind class="w-5 h-5 mr-2 text-gray-400" /><span>Wind</span></div>
                    <span>8 mph</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center"><Droplets class="w-5 h-5 mr-2 text-gray-400" /><span>Precipitation</span></div>
                    <span>0%</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <h4 class="font-medium">5-Day Forecast</h4>
                  <div v-for="(day, index) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']" :key="day" class="flex justify-between items-center">
                    <span>{{ day }}</span>
                    <div class="flex items-center">
                      <Sun class="w-4 h-4 text-yellow-400 mr-2" />
                      <span>{{ 70 + index }}°F</span>
                    </div>
                  </div>
                </div>
              </ExpandableContent>
            </ExpandableCardContent>
            <ExpandableCardFooter>
              <p class="text-xs text-gray-500 dark:text-gray-400">Last updated: 5 minutes ago</p>
            </ExpandableCardFooter>
          </ExpandableCard>
        </ExpandableTrigger>
      </Expandable>

      <div class="flex gap-24 min-h-[600px]" />
    </div>
  </div>
</template>
