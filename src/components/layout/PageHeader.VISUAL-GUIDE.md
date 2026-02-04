# PageHeader Visual Guide

ASCII diagrams showing all 5 variants with exact spacing and alignment.

## Design System Key

```
[≡]  = Hamburger menu (menu icon)
[<]  = Back arrow (arrow_back_ios icon)
[🔍] = Search icon (search icon)
[↗]  = Share icon (share icon)
[♥]  = Favorite icon (favorite icon, filled when active)
```

---

## Variant 1: Home

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   [≡]              A. STERLING                 About         │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: 3 columns (12px | flex-1 | 12px)
Left:   Hamburger menu button (size-12)
Center: Title (uppercase, tracking-widest, centered)
Right:  "About" link (text-primary, optional)
```

**Use case**: Main portfolio landing page

**Code**:
```tsx
<PageHeader
  variant={{ type: "home", title: "A. STERLING", aboutLink: true }}
  onMenuClick={() => console.log('menu')}
/>
```

---

## Variant 2: Back-Title

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   [<]           Artwork Details                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: 3 sections (12px | flex-1 | 12px)
Left:   Back arrow button (size-12)
Center: Page title (centered with padding)
Right:  Empty spacer (w-12, invisible)
```

**Use case**: Detail pages with simple back navigation

**Code**:
```tsx
<PageHeader
  variant={{ type: "back-title", title: "Artwork Details" }}
/>
```

---

## Variant 3: Back-Search

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   [<]              Gallery                      [🔍]          │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: 3 sections (12px | flex-1 | 12px)
Left:   Back arrow button (size-12)
Center: Page title (centered with padding)
Right:  Search icon button (size-12)
```

**Use case**: Collection or gallery pages with search functionality

**Code**:
```tsx
<PageHeader
  variant={{
    type: "back-search",
    title: "Gallery",
    onSearch: () => console.log('search')
  }}
/>
```

---

## Variant 4: Back-Actions

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   [<]                                          [↗]  [♥]       │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: 3 sections (12px | flex-1 | actions)
Left:   Back arrow button (size-12)
Center: Empty spacer (flex-1)
Right:  Action buttons (share: size-10, favorite: size-10)
```

**Variations**:

### Both Buttons
```
│   [<]                                          [↗]  [♥]       │
```

### Share Only
```
│   [<]                                          [↗]            │
```

### Favorite Only
```
│   [<]                                               [♥]       │
```

### Favorite States
```
Unfavorited: [♡] (outline, muted-gray)
Favorited:   [♥] (filled, text-primary gold)
```

**Use case**: Artwork detail pages with social sharing and favoriting

**Code**:
```tsx
<PageHeader
  variant={{
    type: "back-actions",
    showShare: true,
    showFavorite: true,
    onShare: () => console.log('share'),
    onFavorite: () => console.log('favorite'),
    isFavorited: false
  }}
/>
```

---

## Variant 5: Back-Only

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   [<]                                                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: Single element
Left:   Back arrow button (size-12)
```

**Use case**: Minimal pages that only need back navigation

**Code**:
```tsx
<PageHeader variant={{ type: "back-only" }} />
```

---

## Spacing Breakdown

### Common Spacing
```
Padding:     px-4 (16px horizontal)
             py-4 (16px top)
             pb-2 (8px bottom)

Icon button: size-12 (48px × 48px)
Action btn:  size-10 (40px × 40px)

Gap between actions: gap-2 (8px)
```

### Title Padding
```
back-title:   px-4 (16px on each side of title)
back-search:  px-4 (16px on each side of title)
```

### Vertical Alignment
```
All elements: items-center (vertically centered)
```

---

## Color Reference

### Light Mode
```
Background:    rgba(248, 247, 246, 0.8)  /* bg-background-light/80 */
Icons:         #333333                     /* text-muted-gray */
Title:         #333333                     /* text-muted-gray */
Primary:       #e8ba30                     /* text-primary */
```

### Dark Mode
```
Background:    rgba(33, 29, 17, 0.8)      /* dark:bg-background-dark/80 */
Icons:         #e5e5e5                     /* dark:text-gray-200 */
Title:         #f3f4f6                     /* dark:text-gray-100 */
Primary:       #e8ba30                     /* text-primary (unchanged) */
```

---

## Z-Index Layering

```
Layer 4:  z-50  ← PageHeader (this component)
Layer 3:  z-40  ← BottomTabBar
Layer 2:  z-10  ← Modal overlays
Layer 1:  z-0   ← Page content
Layer 0:  z-[-1] ← GrainBackground
```

---

## Responsive Behavior

### Desktop (> 768px)
```
Same as mobile - component is inherently responsive
Title text wraps if too long
```

### Mobile (< 768px)
```
Full width with proper touch targets (48px minimum)
Icons sized for easy tapping
Backdrop blur creates depth
```

### Notched Devices (iPhone X, etc.)
```
Combine with safe-area-top utility if needed:
<header className="... pt-safe-top">
```

---

## Animation States

### Hover (Desktop)
```
All buttons: opacity: 1 → 0.7 (duration: 200ms)
```

### Focus (Keyboard)
```
Browser default focus ring (accessible)
```

### Active (Touch/Click)
```
Browser default (slight scale or color shift)
```

---

## Dark Mode Toggle Example

### Light Mode
```
┌─────────────────────────────────────────────────────────────┐
│ 🌞                                                            │
│   [≡]              A. STERLING                 About         │
│   ⬜                   ⬜                        🟡           │
└─────────────────────────────────────────────────────────────┘
```

### Dark Mode
```
┌─────────────────────────────────────────────────────────────┐
│ 🌙                                                            │
│   [≡]              A. STERLING                 About         │
│   ⬜                   ⬜                        🟡           │
└─────────────────────────────────────────────────────────────┘
```

Legend:
- 🌞 = Light background (#f8f7f6)
- 🌙 = Dark background (#211d11)
- ⬜ = Gray text (#333 / #e5e5e5)
- 🟡 = Primary gold (#e8ba30) - unchanged

---

## Accessibility Labels

```
home:        aria-label="Open menu"
back-*:      aria-label="Go back"
search:      aria-label="Search"
share:       aria-label="Share"
favorite:    aria-label="Add to favorites" / "Remove from favorites"
```

---

## Complete Example Page

```tsx
// Full page implementation
export default function ArtworkDetailPage() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <PageHeader
        variant={{
          type: "back-actions",
          showShare: true,
          showFavorite: true,
          onShare: async () => {
            await navigator.share({
              title: "Check out this artwork",
              url: window.location.href,
            });
          },
          onFavorite: () => setIsFavorited(!isFavorited),
          isFavorited,
        }}
      />

      {/* Content scrolls under header */}
      <main className="p-6">
        <img src="artwork.jpg" alt="Artwork" className="w-full" />
        <h1 className="text-2xl font-bold mt-4">Artwork Title</h1>
        <p className="text-gray-600 mt-2">Description...</p>
      </main>
    </div>
  );
}
```

Visual result:
```
┌─────────────────────────────────────────────────────────────┐
│   [<]                                          [↗]  [♥]      │ ← Sticky header
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   ┌───────────────────────────────────────────────────┐     │
│   │                                                     │     │
│   │              Artwork Image                         │     │
│   │                                                     │     │
│   └───────────────────────────────────────────────────┘     │
│                                                               │
│   Artwork Title                                              │
│   Description text here...                                   │
│                                                               │
│   (Content continues, scrolls under header)                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Tips for Designers

1. **Alignment**: All elements are vertically centered (`items-center`)
2. **Spacing**: Consistent 48px touch targets for all buttons
3. **Typography**: Title uses `-0.015em` letter spacing for tightness
4. **Effects**: Backdrop blur creates subtle depth over content
5. **Color**: Primary gold (#e8ba30) used sparingly for emphasis
6. **Icons**: Material Symbols Outlined at 24px (text-2xl)
7. **Flexibility**: System adapts to any page type with 5 variants
