---
title: Tweet Grid
description: A masonry grid full of tweets
component: true
links: {}
---

::component-preview{name="tweet-grid-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
::

## Installation

::code-tabs
---
tabs:
  - label: "CLI"
    value: "cli"
  - label: "Manual"
    value: "manual"
---

#cli

```bash
npx shadcn@latest add https://cult-ui.com/r/tweet-grid.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="tweet-grid"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
// Grab tweet ids
const exampleTweets = [
  "1742983975340327184",
  "1743049700583116812",
  "1754067409366073443",
  "1753968111059861648",
  "1754174981897118136",
  "1743632296802988387",
  "1754110885168021921",
  "1760248682828419497",
  "1760230134601122153",
  "1760184980356088267",
]
export default function TweetGridDemo() {
  return <TweetGrid tweets={exampleTweets} />
}
```
