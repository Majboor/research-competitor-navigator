# Landing Page A/B Variants

CompetitorFinder ships two landing-hero variants so you can A/B test messaging
and layout without a feature-flag service. The active variant is chosen from the
URL query string, so you can link people (or split ad traffic) directly to a
specific experience.

## How to switch variants

| URL | Variant | Role |
| --- | --- | --- |
| `/` | **A** | Control (default) |
| `/?variant=b` | **B** | Challenger |

Any value other than `b` (including a missing param) falls back to the control,
so the site is always safe to load.

## What differs

Both variants share the same header, feature sections, testimonials, FAQ, CTA,
onboarding flow and search results — only the hero at the top of the page
changes. The two heroes differ on all three classic A/B test axes:

| Axis | Variant A (control) | Variant B (challenger) |
| --- | --- | --- |
| **Headline** | "Discover Your Competitors / In Seconds" (feature framing) | "Know exactly who you're up against" (outcome framing) |
| **Layout** | Two-column split: copy on the left, animated browser mockup on the right | Single centred column on a dark brand-gradient stage |
| **CTA** | Two side-by-side buttons ("Find Competitors Now" + "How It Works") | One primary button ("Analyze my market") plus a proof-stats row (1,000+ / 10 sec / Global) |

Both hero CTAs call the same `onGetStarted` handler, so downstream conversion
(onboarding → search) is identical and directly comparable between variants.

## Implementation

Adding the variant did not rewrite the existing hero. The control component is
untouched; the challenger is a separate component swapped in at the page level.

| File | Purpose |
| --- | --- |
| `src/hooks/useVariant.ts` | Reads and normalises `?variant=` from the URL; returns `'a'` or `'b'`. SSR-safe (returns `'a'` when `window` is undefined). |
| `src/components/HeroSectionB.tsx` | New — the variant-B (challenger) hero. |
| `src/components/HeroSection.tsx` | Unchanged — the variant-A (control) hero. |
| `src/pages/Index.tsx` | Minimal edit: reads `useVariant()` and renders `HeroSectionB` when the variant is `b`, otherwise `HeroSection`. |

### Wiring an analytics/experiment tool

`useVariant()` is the single source of truth. To report exposures to an
analytics tool, read the variant once in `Index.tsx` and fire your event, e.g.:

```ts
const variant = useVariant();
useEffect(() => {
  analytics.track('landing_variant_view', { variant });
}, [variant]);
```

## Verified

- `npm run build` succeeds.
- `npm run preview -- --port 8172` served, checked with headless Chromium:
  - `/` renders "Discover Your Competitors" + "Find Competitors Now".
  - `/?variant=b` renders "Know exactly who you're up against" + "Analyze my market".
