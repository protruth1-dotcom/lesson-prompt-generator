# Notebook & Chalk — Design Spec for Lessonaitor (v2)

## Concept

A teacher walks into their classroom Monday morning. Spiral-bound notebook on the desk. Chalk dust on the chalkboard. Coffee cup with a ring stain on a worksheet.

Execution trick: clean modern layout with selective tactile flourishes (notebook paper texture on lesson output, chalkboard surface for CTAs, sticky-note callouts). Skeuomorphic accents on a clean structural base — never everywhere. Aim for "warm and crafted," not "iOS 6 photorealism."

---

## Color Tokens

Define in Tailwind v4's `@theme` block inside `src/index.css`. The `--color-*` namespace makes them usable as utility classes (`bg-paper`, `text-ink`).

```css
@theme {
  /* Surfaces */
  --color-paper:            #FBF8F3;
  --color-paper-lined:      #F5F0E6;
  --color-chalkboard:       #2A4035;
  --color-chalkboard-deep:  #1F2E26;
  --color-slate-soft:       #3D5A4A;
  --color-white-bone:       #FEFEFD;

  /* Ink + chalk */
  --color-ink:              #1F2937;
  --color-ink-soft:         #4B5563;
  --color-chalk:            #F8FAFC;
  --color-chalk-dust:       #E5E7EB;

  /* Accents */
  --color-pencil-yellow:    #FCD34D;
  --color-eraser-pink:      #F9A8D4;
  --color-apple-red:        #DC2626;
  --color-chalk-blue:       #93C5FD;
  --color-post-it-yellow:   #FEF3C7;
  --color-post-it-pink:     #FCE7F3;
  --color-stamp-green:      #10B981;
  --color-stamp-violet:     #8B5CF6;

  /* Ruled paper lines */
  --color-rule-line:        #C5D6E2;
  --color-margin-line:      #FCA5A5;

  /* Fonts */
  --font-sans:              'Quicksand', sans-serif;
  --font-serif:             'Fraunces', serif;
  --font-hand:              'Caveat', cursive;
  --font-arabic:            'Noto Sans Arabic', 'Traditional Arabic', sans-serif;

  /* Type scale */
  --font-size-xs:    0.75rem;
  --font-size-sm:    0.875rem;
  --font-size-base:  1rem;
  --font-size-lg:    1.125rem;
  --font-size-xl:    1.5rem;
  --font-size-2xl:   2rem;
  --font-size-3xl:   3rem;
}
```

**Usage rules:**

- Chalkboard green: primary CTAs and section headers only (sparingly)
- Paper cream: 70-80% of any screen
- Pencil yellow: active/selected states only
- Sticky-note tones: 1-2 callouts per page max
- Apple red: destructive/warning only (never a general accent)
- Stamp green: save success, copy feedback, test-success
- Stamp violet: AI generation indicators

**Contrast audit:**

| Pair | Ratio | Pass AA? |
|---|---|---|
| ink (#1F2937) on paper (#FBF8F3) | 13.7:1 | Yes |
| ink-soft (#4B5563) on paper (#FBF8F3) | 6.8:1 | Yes |
| chalk (#F8FAFC) on chalkboard (#2A4035) | 5.6:1 | Yes (bold only at small sizes) |
| apple-red (#DC2626) on paper (#FBF8F3) | 5.5:1 | Yes |

**Rule:** All text on chalkboard must be at least font-weight 600 and at least `--font-size-sm`. Caveat only on chalkboard at `--text-xl` or larger.

---

## Typography

Four fonts. One `<link>` in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Caveat:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
```

| Font | Use | Weights |
|---|---|---|
| Quicksand | Body, UI, buttons, labels | 400, 500, 600 |
| Fraunces | Headings, page titles, lesson titles, cover page | 600, 700 |
| Caveat | Chalkboard strip heading only | 700 |
| Noto Sans Arabic | Arabic text (Islamic Studies) | 400, 600, 700 |

**Fraunces note:** It's a variable font. Use:

```css
.heading { font-family: 'Fraunces', serif; font-weight: 600; font-optical-sizing: auto; }
```

**Anti-patterns:** Never Comic Sans. Caveat only on the chalkboard strip. Fraunces never for body text.

---

## Surface Treatments

### 1. Notebook paper (lesson output card only)

```css
.paper-surface {
  background: var(--color-paper-lined);
  background-image:
    linear-gradient(transparent 31px, var(--color-rule-line) 31px, var(--color-rule-line) 32px, transparent 32px),
    linear-gradient(90deg, transparent 47px, var(--color-margin-line) 47px, var(--color-margin-line) 48px, transparent 48px);
  background-size: 100% 32px, 100% 100%;
  border-radius: 4px;
  border: 1px solid #E5E0D5;
  box-shadow: 0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 12px rgba(31,41,55,0.06);
  padding: 32px 24px 24px 64px;
  overflow: auto;
}
```

Content inside should use `line-height: 2rem` to align with the 32px ruled-line rhythm.

### 2. Chalkboard surface (CTAs + header strip)

```css
.chalkboard-surface {
  background: var(--color-chalkboard);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(255,255,255,0.02) 0%, transparent 60%);
  color: var(--color-chalk);
  border-radius: 6px;
  border-top: 6px solid var(--color-chalkboard-deep);
  border-bottom: 6px solid var(--color-chalkboard-deep);
  box-shadow: inset 0 0 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
}

.chalkboard-surface--strip {
  border-radius: 0;
  border-top-width: 4px;
  border-bottom-width: 4px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chalkboard-surface h2, .chalk-heading {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: var(--font-size-2xl);
  color: var(--color-chalk);
  text-shadow: 0 1px 0 rgba(0,0,0,0.3);
}
```

The chalkboard strip lives OUTSIDE the `max-w-4xl` container, full viewport width, between Navbar and `<main>`.

### 3. Sticky-note callout

```css
.sticky-note {
  background: var(--color-post-it-yellow);
  padding: 16px 20px;
  font-family: 'Caveat', cursive;
  font-size: var(--font-size-lg);
  color: var(--color-ink);
  border-radius: 2px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  transform: rotate(-1deg);
  max-width: 300px;
  position: relative;
  overflow-wrap: break-word;
}

.sticky-note::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(2deg);
  width: 50px;
  height: 12px;
  background: rgba(252, 211, 77, 0.7);
  border-radius: 1px;
}
```

1-2 per page max.

---

## Component Patterns

### Buttons

```css
.btn-primary {
  background: var(--color-chalkboard);
  color: var(--color-chalk);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--font-size-base);
  padding: 10px 24px;
  border-radius: 6px;
  border: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(31,41,55,0.15);
  transition: transform 120ms ease, box-shadow 120ms ease;
  cursor: pointer;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 8px rgba(31,41,55,0.2); }
.btn-primary:focus-visible { outline: 2px solid var(--color-pencil-yellow); outline-offset: 2px; }
.btn-primary:active { transform: translateY(0); }

.btn-secondary {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--font-size-sm);
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--color-slate-soft);
  transition: background-color 120ms ease;
  cursor: pointer;
}
.btn-secondary:hover { background: var(--color-paper-lined); }

.btn-ghost {
  background: transparent;
  color: var(--color-ink-soft);
  font-family: var(--font-sans);
  font-weight: 500;
  padding: 6px 12px;
  border: none;
  border-bottom: 2px solid transparent;
  transition: color 120ms ease, border-color 120ms ease;
  cursor: pointer;
}
.btn-ghost:hover { color: var(--color-ink); }
.btn-ghost--active { color: var(--color-ink); border-bottom-color: var(--color-pencil-yellow); }

.btn-destructive {
  background: var(--color-apple-red);
  color: white;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--font-size-sm);
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  transition: background-color 120ms ease;
  cursor: pointer;
}
.btn-destructive:hover { background: #B91C1C; }
```

Disabled buttons: add `opacity-50 cursor-not-allowed` and remove hover effects.

### Cards

```css
.card {
  background: var(--color-paper);
  border: 1px solid #E8E2D6;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 6px rgba(31,41,55,0.05);
}
```

### Inputs

```css
.input {
  background: var(--color-white-bone);
  border: 1px solid #D6D0C2;
  border-bottom: 2px solid var(--color-chalkboard);
  border-radius: 4px 4px 0 0;
  padding: 10px 12px;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  transition: border-color 120ms ease;
}
.input:focus { outline: none; border-bottom-color: var(--color-pencil-yellow); border-bottom-width: 3px; }
.input::placeholder { color: var(--color-ink-soft); opacity: 0.6; }
.input:disabled { opacity: 0.5; cursor: not-allowed; }
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-white-bone);
  border: 1.5px solid var(--color-chalkboard);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--font-size-xs);
  color: var(--color-ink);
}
.badge--selected { background: var(--color-pencil-yellow); border-color: var(--color-pencil-yellow); }
```

### Nav Tabs (Generator / History)

```css
.tab-nav {
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--color-ink-soft);
  padding: 8px 4px;
  border-bottom: 3px solid transparent;
  transition: color 120ms ease, border-color 120ms ease;
  cursor: pointer;
}
.tab-nav:hover { color: var(--color-ink); }
.tab-nav--active { color: var(--color-ink); border-bottom-color: var(--color-pencil-yellow); }
```

### ButtonGroup (pill selectors)

Used for: Grade, Subject, Lesson Length, Student Level, Theme, Difficulty, Output Format.

```css
.btn-group { display: flex; flex-wrap: wrap; gap: 6px; }

.btn-group-item {
  padding: 6px 14px;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--font-size-sm);
  background: var(--color-white-bone);
  color: var(--color-ink);
  border: 1.5px solid var(--color-rule-line);
  transition: all 120ms ease;
  cursor: pointer;
}
.btn-group-item:hover { background: var(--color-paper-lined); border-color: var(--color-slate-soft); }
.btn-group-item--active { background: var(--color-pencil-yellow); color: var(--color-ink); border-color: var(--color-pencil-yellow); font-weight: 600; }
.btn-group-item:focus-visible { outline: 2px solid var(--color-chalkboard); outline-offset: 1px; }
.btn-group-item:disabled { opacity: 0.4; cursor: not-allowed; }
```

### TabToggle (quiz mode Auto/Manual)

```css
.tab-toggle { display: inline-flex; background: var(--color-paper-lined); border-radius: 8px; padding: 3px; gap: 2px; }

.tab-toggle-item {
  padding: 6px 16px;
  border-radius: 6px;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: var(--color-ink-soft);
  background: transparent;
  border: none;
  transition: all 150ms ease;
  cursor: pointer;
}
.tab-toggle-item:hover { color: var(--color-ink); }
.tab-toggle-item--active { background: var(--color-white-bone); color: var(--color-ink); font-weight: 600; box-shadow: 0 1px 3px rgba(31,41,55,0.08); }
```

### ToggleSwitch (Cross-Curricular)

```css
.toggle-switch { position: relative; width: 44px; height: 24px; border-radius: 12px; background: var(--color-rule-line); border: none; transition: background-color 150ms ease; cursor: pointer; }
.toggle-switch--on { background: var(--color-chalkboard); }
.toggle-switch::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.15); transition: transform 150ms ease; }
.toggle-switch--on::after { transform: translateX(20px); }
.toggle-switch:focus-visible { outline: 2px solid var(--color-pencil-yellow); outline-offset: 2px; }
```

### NumberInput (stepper)

```css
.number-input-group { display: inline-flex; align-items: center; gap: 0; }

.number-input-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  border: 1px solid #D6D0C2;
  background: var(--color-white-bone);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition: background-color 100ms ease;
}
.number-input-btn:hover { background: var(--color-paper-lined); }
.number-input-btn:first-child { border-radius: 4px 0 0 4px; border-right: none; }
.number-input-btn:last-child { border-radius: 0 4px 4px 0; border-left: none; }

.number-input-value {
  display: flex; align-items: center; justify-content: center;
  min-width: 40px; height: 32px; padding: 0 8px;
  border: 1px solid #D6D0C2;
  border-bottom: 2px solid var(--color-chalkboard);
  background: var(--color-white-bone);
  font-family: var(--font-sans); font-weight: 600;
  font-size: var(--font-size-sm); color: var(--color-ink); cursor: text;
}
.number-input-value input { width: 100%; border: none; background: transparent; font: inherit; color: inherit; text-align: center; }
.number-input-value input:focus { outline: none; }
.number-input-value:focus-within { border-bottom-color: var(--color-pencil-yellow); border-bottom-width: 3px; }
```

### DistributionBar

7 segment colors across a chalkboard-friendly muted palette:

`chalkboard (dark green) → pencil-yellow → chalk-blue → eraser-pink → slate-soft → stamp-violet → apple-red`

```css
.dist-bar { display: flex; height: 10px; border-radius: 5px; overflow: hidden; background: var(--color-rule-line); }
.dist-bar-segment-1 { background: var(--color-chalkboard); }
.dist-bar-segment-2 { background: var(--color-pencil-yellow); }
.dist-bar-segment-3 { background: var(--color-chalk-blue); }
.dist-bar-segment-4 { background: var(--color-eraser-pink); }
.dist-bar-segment-5 { background: var(--color-slate-soft); }
.dist-bar-segment-6 { background: var(--color-stamp-violet); }
.dist-bar-segment-7 { background: var(--color-apple-red); }
```

Legend dots use the same colors.

### SearchableDropdown

```css
.dropdown-trigger {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 10px 12px;
  background: var(--color-white-bone);
  border: 1px solid #D6D0C2;
  border-bottom: 2px solid var(--color-chalkboard);
  border-radius: 4px 4px 0 0;
  font-family: var(--font-sans); font-size: var(--font-size-base);
  color: var(--color-ink); cursor: pointer;
  transition: border-color 120ms ease;
}
.dropdown-trigger:focus, .dropdown-trigger--open { outline: none; border-bottom-color: var(--color-pencil-yellow); border-bottom-width: 3px; }

.dropdown-menu { position: absolute; z-index: 30; width: 100%; max-height: 280px; overflow-y: auto; background: var(--color-white-bone); border: 1px solid #D6D0C2; border-top: none; border-radius: 0 0 6px 6px; box-shadow: 0 8px 24px rgba(31,41,55,0.12); }

.dropdown-search { padding: 8px 12px; border-bottom: 1px solid var(--color-rule-line); }
.dropdown-search input { width: 100%; padding: 6px 8px; border: 1px solid var(--color-rule-line); border-radius: 4px; font-family: var(--font-sans); font-size: var(--font-size-sm); color: var(--color-ink); background: var(--color-white-bone); }
.dropdown-search input:focus { outline: none; border-color: var(--color-pencil-yellow); }

.dropdown-category-header { padding: 6px 12px; font-family: var(--font-sans); font-weight: 600; font-size: var(--font-size-xs); color: var(--color-ink-soft); text-transform: uppercase; letter-spacing: 0.05em; background: var(--color-paper-lined); }

.dropdown-item { padding: 8px 12px; font-family: var(--font-sans); font-size: var(--font-size-sm); color: var(--color-ink); cursor: pointer; transition: background-color 100ms ease; }
.dropdown-item:hover, .dropdown-item--highlighted { background: var(--color-paper-lined); }
.dropdown-item--selected { background: var(--color-post-it-yellow); font-weight: 600; }
.dropdown-item .arabic-term { font-family: var(--font-arabic); direction: rtl; font-size: var(--font-size-base); }
.dropdown-empty { padding: 16px; text-align: center; font-family: var(--font-sans); font-size: var(--font-size-sm); color: var(--color-ink-soft); }
```

### Toast

```css
.toast {
  position: fixed; bottom: 24px; right: 24px; z-index: 100;
  padding: 12px 20px; border-radius: 8px;
  background: var(--color-ink); color: var(--color-chalk);
  font-family: var(--font-sans); font-weight: 500;
  font-size: var(--font-size-sm);
  box-shadow: 0 8px 24px rgba(31,41,55,0.2);
  display: flex; align-items: center; gap: 8px;
  animation: toast-in 200ms ease-out;
}
.toast--success .toast-icon { color: var(--color-stamp-green); }
.toast--error .toast-icon { color: var(--color-apple-red); }
.toast--warning .toast-icon { color: var(--color-pencil-yellow); }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### ConfirmDialog

```css
.dialog-backdrop { position: fixed; inset: 0; z-index: 90; background: rgba(31,41,55,0.4); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }

.dialog-panel { background: var(--color-white-bone); border: 1px solid #E8E2D6; border-radius: 12px; padding: 24px; max-width: 400px; width: 90%; box-shadow: 0 20px 40px rgba(31,41,55,0.15); }

.dialog-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: var(--font-size-xl); color: var(--color-ink); margin-bottom: 8px; }

.dialog-message { font-family: var(--font-sans); font-size: var(--font-size-base); color: var(--color-ink-soft); line-height: 1.6; margin-bottom: 20px; }

.dialog-actions { display: flex; gap: 12px; justify-content: flex-end; }
```

### Settings Modal

```css
.settings-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(31,41,55,0.4); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }

.settings-panel { background: var(--color-white-bone); border: 1px solid #E8E2D6; border-radius: 12px; padding: 32px; max-width: 520px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(31,41,55,0.15); }
.settings-panel--enter { animation: modal-enter 200ms ease-out; }

@keyframes modal-enter {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.settings-section { margin-bottom: 20px; }
.settings-label { display: block; font-family: var(--font-sans); font-weight: 600; font-size: var(--font-size-sm); color: var(--color-ink); margin-bottom: 4px; }
.settings-hint { font-family: var(--font-sans); font-size: var(--font-size-xs); color: var(--color-ink-soft); margin-bottom: 6px; }

.settings-model-select { width: 100%; padding: 10px 12px; background: var(--color-white-bone); border: 1px solid #D6D0C2; border-bottom: 2px solid var(--color-chalkboard); border-radius: 4px 4px 0 0; font-family: var(--font-sans); font-size: var(--font-size-base); color: var(--color-ink); cursor: pointer; appearance: none; }
.settings-model-select:focus { outline: none; border-bottom-color: var(--color-pencil-yellow); }
```

### State Cards

```css
.state-error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-left: 4px solid var(--color-apple-red);
  border-radius: 8px;
  padding: 16px;
}

.state-loading {
  background: var(--color-paper-lined);
  border: 1px solid #E8E2D6;
  border-radius: 8px;
  padding: 20px;
}

.state-success {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-left: 4px solid var(--color-stamp-green);
  border-radius: 8px;
  padding: 16px;
}

.state-warning {
  background: var(--color-post-it-yellow);
  border: 1px solid #FDE68A;
  border-left: 4px solid var(--color-pencil-yellow);
  border-radius: 8px;
  padding: 16px;
}

.state-empty {
  text-align: center;
  padding: 64px 24px;
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}
.state-empty-title {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: var(--font-size-xl);
  color: var(--color-ink);
  margin-bottom: 4px;
}
.state-empty-message { font-size: var(--font-size-sm); }
```

### AI Generation Indicator Badges

```css
.state-ai-indicator {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 999px;
  background: #F5F3FF; border: 1px solid #DDD6FE;
  font-family: var(--font-sans); font-weight: 500;
  font-size: var(--font-size-xs); color: var(--color-stamp-violet);
}
.state-ai-indicator--direct-lesson {
  background: #ECFDF5; border-color: #A7F3D0;
  color: var(--color-stamp-green);
}
```

### Loading Animation (chalk dust particles)

Replaces the current dot-pulse animation.

```css
.loading-chalk-dust { display: inline-flex; align-items: center; gap: 4px; }

.loading-chalk-dust-particle {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--color-chalk);
  animation: chalk-float 600ms ease-in-out infinite;
}
.loading-chalk-dust-particle:nth-child(2) { animation-delay: 150ms; }
.loading-chalk-dust-particle:nth-child(3) { animation-delay: 300ms; }

@keyframes chalk-float {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-4px); }
}
```

---

## Logo Recolor

Current logo SVG uses old teal (`#0d9488`) and amber (`#fbbf24`). Recolor:

- Book body → `#2A4035` (chalkboard green)
- Spark/sun → `#FCD34D` (pencil yellow)

---

## Print Styles

Embedded in generated workbook HTML (not in the main app CSS — workbooks are standalone HTML files):

```css
@media print {
  @page { margin: 15mm; size: A4; }
  body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .no-print { display: none !important; }
  .page-break { page-break-before: always; }
  .keep-together { page-break-inside: avoid; }
  .workbook-section-header { background: var(--color-chalkboard) !important; color: var(--color-chalk) !important; print-color-adjust: exact; }
  .workbook-ruled-line { border-bottom: 1px solid var(--color-rule-line) !important; }
}
```

---

## Visual Elements

| Element | Where | How |
|---|---|---|
| Ruled paper lines | Lesson output card only | `.paper-surface` CSS gradient |
| Spiral binding | Top edge of lesson output card | CSS radial-gradient circle pattern |
| Paper clip | History items | Lucide `Paperclip` icon, 60% opacity |
| Dotted divider | Between sections | `border-top: 2px dashed var(--color-rule-line)` |
| Chalk underline | Active nav tab | `border-bottom: 3px solid var(--color-pencil-yellow)` |

**Rule:** 2-3 decorative elements per page max.

---

## Animations

All behind `prefers-reduced-motion`.

| Interaction | Effect | Duration |
|---|---|---|
| Button hover | Lift 1px, shadow grows | 120ms ease |
| Tab change | Pencil-yellow underline appears | 200ms ease-out |
| Card appears | Fade + slide up 4px | 240ms ease-out |
| Sticky note appears | Fade + rotate to -1deg | 260ms ease-out |
| Lesson generates | Chalk-dust particle float | 600ms loop |
| Save success | Green checkmark indicator | 800ms (auto-dismiss) |
| Toast | Slide up + fade | 200ms ease-out |
| Modal | Scale + fade | 200ms ease-out |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Page Layouts

### Generator Page

```
NAVBAR (cream bg, full width, sticky)
  [Fraunces logo]     Generator    History    Settings

CHALKBOARD STRIP (full viewport width, 56px, outside <main>)
  "Let's build today's lesson" (Caveat 700, centered)

<main max-w-4xl>
  Card: Grade & Subject   →  ButtonGroup pills
  Card: Topic             →  SearchableDropdown
  Card: Lesson Settings   →  ButtonGroup pills + ToggleSwitch
  Card: Quiz              →  TabToggle + NumberInput + DistributionBar
  Card: Prompt Mode       →  ButtonGroup

  [ Generate Workbook ]  (btn-primary, centered)

  STICKY NOTE (yellow, slight tilt)
    "Switch to Direct Lesson mode if you want a finished workbook PDF instantly."
```

### Lesson Preview

The output card uses `.paper-surface` (ruled lines + red margin). Title in Fraunces. Body text follows 32px line rhythm. Download/Copy buttons in a chalkboard-green floating bar bottom-right.

### History Page

Vertical stack of `.card` items. Each has: paper-clip icon (top-right, 60% opacity), Fraunces lesson title, grade/subject badges, Quicksand date. Hover: card lifts 2px. No rotation.

### Settings

Modal overlay with `.settings-panel`. API key removal uses `.state-warning`. Test connection uses `.state-success` or `.state-error`.

---

## Anti-Patterns

- Never Comic Sans
- No cartoon mascots / bouncing emoji
- No background music or sound effects
- Never `#000` pure black
- No saturated RGB everywhere — keep it muted/dusty
- Skeuomorphic accents only — paper surface only on lesson output, chalkboard only on CTAs/headers
- No more than 4 fonts loaded
- No patronizing copy — talk like an adult
- Every decorative element must serve a function
- 200ms animations feel intentional, 800ms feel cute, 1500ms feel broken

---

## Application Order

1. **Color tokens + fonts** — replace `@theme` block in `index.css`, swap Google Fonts `<link>` in `index.html` (biggest visual shift)
2. **Buttons + inputs** — apply new button/input classes globally
3. **Cards + page background** — switch to cream paper, update card styling
4. **Chalkboard strip** — add between Navbar and `<main>`
5. **Paper-surface for lesson output** — ruled-paper background on the preview area
6. **Sticky-note + decorative flourishes** — 1-2 stickies, paper-clips in History
7. **Animations + micro-interactions** — final polish

After step 3, the app looks dramatically different. Steps 4-7 are atmosphere.

---

## Resolved Design Decisions

| Question | Decision |
|---|---|
| Caveat vs Quicksand on chalkboard? | Caveat only on the decorative strip. Quicksand 600 everywhere else on chalkboard (buttons, section headers) |
| History cards rotated? | No. Paper-clip icon carries the "stack of papers" idea without layout chaos |
| Paper-clips and push-pins? | Paper-clips on history cards only. No push-pins (no pinning feature to warrant them) |
| Empty state icon? | No emoji. Text-only: Fraunces heading + Quicksand body text |
| Existing theme names (Rainbow Bright, Space Galaxy, etc.)? | Keep as-is. Changing them breaks prompt builder engines and history data |
