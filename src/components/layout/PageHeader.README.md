# PageHeader Component

A versatile, sticky header component with 5 distinct variants for different page types in the art portfolio application.

## Features

- **Sticky positioning** with backdrop blur effect
- **Dark mode support** with appropriate color transitions
- **Material Symbols Outlined** icons
- **Type-safe** variant system using discriminated unions
- **Accessible** with proper ARIA labels
- **Smooth hover interactions**

## Design System

Based on the Stitch design system from `code1.html`:
- Backdrop blur: `backdrop-blur-md`
- Background: `bg-background-light/80 dark:bg-background-dark/80`
- Text colors: `text-muted-gray dark:text-gray-200`
- Primary accent: `text-primary` (#e8ba30)
- Icon size: 24px (text-2xl for icons)
- Uppercase tracking for titles: `uppercase tracking-widest`

## Variants

### 1. Home (`type: "home"`)

**Layout**: Hamburger Menu | Title (Center) | About Link

**Use case**: Main landing page with navigation menu

```tsx
<PageHeader
  variant={{
    type: "home",
    title: "A. STERLING",
    aboutLink: true,
  }}
  onMenuClick={() => {/* Open navigation menu */}}
/>
```

**Props**:
- `title`: Main title text (centered, uppercase)
- `aboutLink`: Show "About" link on the right (optional)
- `onMenuClick`: Callback for hamburger menu click (via PageHeaderProps)

---

### 2. Back-Title (`type: "back-title"`)

**Layout**: Back Arrow | Title (Center) | Empty Space

**Use case**: Detail pages with a title, simple navigation back

```tsx
<PageHeader
  variant={{
    type: "back-title",
    title: "Artwork Details",
  }}
/>
```

**Props**:
- `title`: Page title (centered)

---

### 3. Back-Search (`type: "back-search"`)

**Layout**: Back Arrow | Title (Center) | Search Icon

**Use case**: Searchable collections or gallery pages

```tsx
<PageHeader
  variant={{
    type: "back-search",
    title: "Gallery",
    onSearch: () => {/* Open search modal */},
  }}
/>
```

**Props**:
- `title`: Page title (centered)
- `onSearch`: Callback for search icon click (optional)

---

### 4. Back-Actions (`type: "back-actions"`)

**Layout**: Back Arrow | Spacer | Share + Favorite Buttons

**Use case**: Artwork detail pages with social actions

```tsx
<PageHeader
  variant={{
    type: "back-actions",
    showShare: true,
    showFavorite: true,
    onShare: () => {/* Share artwork */},
    onFavorite: () => {/* Toggle favorite */},
    isFavorited: false,
  }}
/>
```

**Props**:
- `showShare`: Display share button (optional)
- `showFavorite`: Display favorite button (optional)
- `onShare`: Callback for share button click (optional)
- `onFavorite`: Callback for favorite button click (optional)
- `isFavorited`: Whether the item is favorited (fills icon with primary color) (optional)

**Flexible**: Can show only share, only favorite, or both buttons

---

### 5. Back-Only (`type: "back-only"`)

**Layout**: Back Arrow Only

**Use case**: Minimal pages that only need back navigation

```tsx
<PageHeader
  variant={{
    type: "back-only",
  }}
/>
```

**Props**: None required

---

## Type Safety

The component uses discriminated union types to ensure type safety:

```tsx
type HeaderVariant =
  | { type: "home"; title: string; aboutLink?: boolean }
  | { type: "back-title"; title: string }
  | { type: "back-search"; title: string; onSearch?: () => void }
  | { type: "back-actions"; showShare?: boolean; showFavorite?: boolean; /* ... */ }
  | { type: "back-only" };
```

TypeScript will ensure you only pass valid props for each variant type.

## Icons Used

All icons are from **Material Symbols Outlined**:
- `menu` - Hamburger menu (home variant)
- `arrow_back_ios` - Back navigation (all back variants)
- `search` - Search function (back-search variant)
- `share` - Share action (back-actions variant)
- `favorite` - Favorite/like action (back-actions variant)

## Navigation

- **Back button**: Uses Next.js `router.back()` to navigate to previous page
- **About link**: Uses Next.js `Link` component for client-side navigation to `/about`

## Accessibility

- All interactive elements have `aria-label` attributes
- Buttons have hover states with `hover:opacity-70`
- Proper semantic HTML with `<header>` and `<button>` elements
- Color contrast meets WCAG guidelines in both light and dark modes

## Testing

View all variants in action at `/test-headers` page.

## File Structure

```
src/components/layout/
├── PageHeader.tsx           # Main component
├── PageHeader.examples.tsx  # Usage examples and patterns
├── PageHeader.README.md     # This file
└── index.ts                 # Exports
```

## Integration Example

```tsx
// In your page component
import { PageHeader } from "@/components/layout";

export default function ArtworkPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: true,
          onShare: handleShare,
          onFavorite: handleFavorite,
        }}
      />

      <main className="p-4">
        {/* Your content */}
      </main>
    </div>
  );
}
```

## Dark Mode

The component automatically responds to the app's dark mode setting using Tailwind's `dark:` variants. Ensure your app has dark mode configured in `tailwind.config.ts`:

```ts
darkMode: "class",
```

## Notes

- The header is sticky (`sticky top-0 z-50`) and will stay at the top during scroll
- Backdrop blur creates a frosted glass effect over scrolling content
- All spacing and sizing matches the original Stitch design specifications
- The component is fully client-side (`"use client"`) due to router hooks
