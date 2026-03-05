# EDDY-74 PRD: Tesla-Style Navigation

## Document Control
- Issue: `EDDY-74`
- Feature: Tesla-Style Navigation
- Owner: Web
- Date: 2026-03-05
- Status: Draft for implementation

## Problem Statement
The current navbar uses mixed control styles on desktop (`ThemeToggle` icon + text CTA). We need a cleaner Tesla-style control cluster with uniform icon buttons and a locale selector while preserving current mobile behavior during this phase.

## Goals
- Replace desktop right-side CTA composition with a uniform icon row:
  - Theme toggle (existing behavior)
  - Language selector (new)
  - User button (visual placeholder, no action)
- Implement locale switching with `next-intl` best-practice navigation APIs.
- Keep existing mobile navbar and mobile drawer behavior unchanged for this phase.

## Non-Goals (Phase 1)
- No mobile navbar redesign.
- No authentication flow for the User button.
- No full Spanish copy translation pass (handled by `EDDY-63`).

## User Stories
- As a desktop visitor, I can switch language quickly from the navbar.
- As a desktop visitor, I can see a consistent row of icon controls.
- As a mobile visitor, I experience no behavioral regressions in the current nav/drawer.

## Scope
### In Scope
- Desktop navbar changes (`md` and up):
  - Show Theme, Globe (menu), User buttons.
  - Remove desktop text `Get Started` button from top-right cluster.
- Add Spanish locale plumbing:
  - Enable `"es"` in routing.
  - Add `messages/es.json` to prevent runtime import failures.
- Add reusable menu primitive in `@workspace/ui` based on `@base-ui/react/menu`.
- Add translation keys needed for the language selector.

### Out of Scope
- Mobile top-bar control parity.
- Mobile language selector UX.
- Locale-specific copy QA and translation correctness across all pages.

## Functional Requirements
1. Desktop navbar includes three icon controls with consistent button dimensions and outline style.
2. Globe button opens a right-aligned dropdown menu with:
   - US flag + "English"
   - Spain flag + "Español"
3. Active locale shows a check indicator.
4. Selecting locale calls `router.replace(pathname, {locale})`.
5. With `localePrefix: "never"`:
   - Locale is not shown in the visible URL.
   - Locale is resolved by middleware (cookie and/or locale detection), while routes are internally rewritten to `[locale]`.
6. User button is present and non-destructive; no navigation/action yet.
7. Existing mobile hamburger + drawer behavior remains unchanged.

## UX Requirements
- Buttons must visually match (`variant="ghost"`, icon-size control footprint).
- Menu must be keyboard accessible:
  - Open/close with keyboard on trigger.
  - Arrow key item navigation via Base UI primitives.
  - Clear focus states.
- Menu supports click-outside and Escape close (via Base UI defaults).

## Technical Design
### Architecture
- Reuse existing i18n navigation wrapper (`@/i18n/navigation`) generated via `createNavigation(routing)`.
- Add UI abstraction for Base UI menu to keep app code clean and stylistically consistent with existing `Select`/`Dialog`.

### Components
- `packages/ui/src/components/menu.tsx`
  - Exports:
    - `Menu`
    - `MenuTrigger`
    - `MenuPortal`
    - `MenuPositioner`
    - `MenuPopup`
    - `MenuItem`
    - `MenuSeparator`
- `apps/web/src/components/language-switcher.tsx`
  - Client component using:
    - `useLocale` from `next-intl`
    - `usePathname`, `useRouter` from `@/i18n/navigation`
    - `Emoji` from `react-apple-emojis`
    - `Globe` and `Check` icons from `lucide-react`

### Data and i18n
- `apps/web/src/i18n/routing.ts`
  - `locales: ["en", "es"]`
- `apps/web/messages/en.json`
  - Add:
    - `Common.user`
    - `Common.language`
    - `Common.english`
    - `Common.spanish`
- `apps/web/messages/es.json`
  - Initial copy from English file to satisfy runtime import and avoid crashes.

## File Changes
- Add `docs/prd/EDDY-74-tesla-style-navigation.md`
- Add `packages/ui/src/components/menu.tsx`
- Add `apps/web/src/components/language-switcher.tsx`
- Add `apps/web/messages/es.json`
- Update `apps/web/src/components/section/navbar.tsx`
- Update `apps/web/src/i18n/routing.ts`
- Update `apps/web/messages/en.json`

## Acceptance Criteria
- Desktop navbar displays Theme, Globe, User icon controls in the right cluster.
- Globe menu shows English and Español with corresponding flags and checkmark for current locale.
- Locale switch updates the active locale via middleware/cookie without requiring locale prefixes in the visible URL.
- Top-right desktop text CTA is removed.
- Mobile top bar and mobile drawer behavior remain unchanged.
- No new dependencies are introduced.
- App builds and lints without type/runtime errors introduced by this feature.

## Risks and Mitigations
- Risk: Locale mismatch could cause message import failures.
  - Mitigation: Add `es.json` immediately with complete baseline structure.
- Risk: Route replacement type mismatch on dynamic routes.
  - Mitigation: Use current pathname from `next-intl` navigation helper and verify typecheck/lint.
- Risk: Visual regressions in navbar spacing.
  - Mitigation: Keep existing layout container and only replace desktop CTA slot.

## Test Plan
- Manual desktop checks:
  - Open menu and toggle locale on home and pricing pages.
  - Verify checkmark updates and URL transitions.
  - Verify icon alignment and consistent button sizing.
- Manual mobile checks:
  - Confirm hamburger behavior unchanged.
  - Confirm mobile drawer remains intact.
- Static checks:
  - Run lint and build/type checks for `apps/web`.

## Rollout
- Phase 1 (this ticket): Desktop behavior + locale plumbing.
- Phase 2: Mobile navbar parity and mobile locale switch UX.
