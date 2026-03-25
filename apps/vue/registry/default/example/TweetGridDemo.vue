<script setup lang="ts">
import { GradientHeading } from '../ui/gradient-heading'
import { TweetGrid } from '../ui/tweet-grid'

const exampleTweets = [
  '1742983975340327184',
  '1743049700583116812',
  '1754067409366073443',
  '1753968111059861648',
  '1754174981897118136',
  '1743632296802988387',
  '1754110885168021921',
  '1760248682828419497',
  '1760230134601122153',
  '1760184980356088267',
]
</script>

<template>
  <div class="pb-12 md:max-w-4xl max-w-md">
    <div class="flex w-full justify-center pb-12">
      <GradientHeading size="xl" weight="black">Join the club</GradientHeading>
    </div>
    <div class="flex items-center justify-center w-full">
      <TweetGrid class="w-80 md:w-full" :tweets="exampleTweets" :columns="2" spacing="lg" />
    </div>
  </div>
</template>
