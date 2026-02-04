# PageHeader Quick Reference

## Import

```tsx
import { PageHeader } from "@/components/layout";
```

## Variants Cheat Sheet

### Home Page
```tsx
<PageHeader
  variant={{ type: "home", title: "A. STERLING", aboutLink: true }}
  onMenuClick={() => {/* menu action */}}
/>
```

### Detail Page with Title
```tsx
<PageHeader
  variant={{ type: "back-title", title: "Page Title" }}
/>
```

### Gallery with Search
```tsx
<PageHeader
  variant={{ type: "back-search", title: "Gallery", onSearch: () => {/* search */} }}
/>
```

### Artwork with Actions
```tsx
<PageHeader
  variant={{
    type: "back-actions",
    showShare: true,
    showFavorite: true,
    onShare: () => {/* share */},
    onFavorite: () => {/* toggle favorite */},
    isFavorited: false,
  }}
/>
```

### Minimal Back Only
```tsx
<PageHeader variant={{ type: "back-only" }} />
```

## Common Patterns

### With State Management

```tsx
"use client";
import { PageHeader } from "@/components/layout";
import { useState } from "react";

export default function ArtworkPage() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <PageHeader
      variant={{
        type: "back-actions",
        showFavorite: true,
        onFavorite: () => setIsFavorited(!isFavorited),
        isFavorited,
      }}
    />
  );
}
```

### With API Integration

```tsx
const handleShare = async () => {
  if (navigator.share) {
    await navigator.share({
      title: "Artwork Title",
      url: window.location.href,
    });
  }
};

<PageHeader
  variant={{
    type: "back-actions",
    showShare: true,
    onShare: handleShare,
  }}
/>
```

### Conditional Rendering

```tsx
{isHomePage ? (
  <PageHeader
    variant={{ type: "home", title: "A. STERLING", aboutLink: true }}
  />
) : (
  <PageHeader variant={{ type: "back-title", title: pageTitle }} />
)}
```

## Props Reference

### Common Props
- `variant`: HeaderVariant (required) - See type definitions below

### Additional Props
- `onMenuClick?`: () => void - Callback for home menu button

### Type Definitions

```tsx
type HeaderVariant =
  | { type: "home"; title: string; aboutLink?: boolean }
  | { type: "back-title"; title: string }
  | { type: "back-search"; title: string; onSearch?: () => void }
  | { type: "back-actions"; showShare?: boolean; showFavorite?: boolean; onShare?: () => void; onFavorite?: () => void; isFavorited?: boolean }
  | { type: "back-only" };
```

## Styling Notes

- **Sticky**: Header stays at top during scroll
- **Backdrop blur**: Frosted glass effect over content
- **Dark mode**: Automatically adapts to app theme
- **Z-index**: Set to 50 (above most content, below modals)

## Icons

Material Symbols Outlined (automatically styled):
- `menu` - Home hamburger
- `arrow_back_ios` - Back navigation
- `search` - Search action
- `share` - Share action
- `favorite` - Like/favorite action

## Common Gotchas

1. **Client component required**: Uses `useRouter`, needs `"use client"`
2. **Material Symbols font**: Ensure loaded in layout
3. **Dark mode**: Requires `darkMode: "class"` in tailwind.config
4. **Custom colors**: Uses theme colors from tailwind.config.ts

## File Locations

- Component: `src/components/layout/PageHeader.tsx`
- Examples: `src/components/layout/PageHeader.examples.tsx`
- Test page: `src/app/test-headers/page.tsx`
- Documentation: `src/components/layout/PageHeader.README.md`
