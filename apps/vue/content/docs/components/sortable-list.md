---
title: SortableList
description: An animated sortable list
component: true
links: {}
---

::component-preview{name="sortable-list-demo" className="[&_.preview>[data-orientation=vertical]]:sm:max-w-[70%]" description="All variations"}
::

## References

::citations
---
label: "Inspiration"
items:
  - text: "Dynamic Settings by Mariana Castilho"
    href: "https://www.uilabs.dev/"
  - text: "Follow @mrncst on Twitter"
    href: "https://x.com/mrncst"
---
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
npx shadcn@latest add https://cult-ui.com/r/sortable-list.json
```

#manual

::steps
Copy and paste the following code into your project.

::component-source{name="sortable-list"}
::

Update the import paths to match your project setup.
::

::

## Usage

```tsx
export default function Example() {
  const [items, setItems] = useState<Item[]>([
    { text: "Item 1", checked: false, id: 1, description: "Description 1" },
    { text: "Item 2", checked: false, id: 2, description: "Description 2" },
    { text: "Item 3", checked: false, id: 3, description: "Description 3" },
  ])

  const handleAddItem = () => {
    const newItem: Item = {
      text: `Item ${items.length + 1}`,
      checked: false,
      id: items.length + 1,
      description: `Description ${items.length + 1}`,
    }
    setItems([...items, newItem])
  }

  const handleResetItems = () => {
    setItems([])
  }

  const handleCompleteItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const handleRemoveItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const renderItem = (
    item: Item,
    onCompleteItem: (id: number) => void,
    onRemoveItem: (id: number) => void
  ) => (
    <SortableListItem
      key={item.id}
      item={item}
      onCompleteItem={onCompleteItem}
      onRemoveItem={onRemoveItem}
      handleDrag={() => {}}
    />
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sortable List Example</h1>
      <SortableList
        items={items}
        setItems={setItems}
        onAddItem={handleAddItem}
        onResetItems={handleResetItems}
        onCompleteItem={handleCompleteItem}
        renderItem={renderItem}
      />
    </div>
  )
}
```
