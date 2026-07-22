# Design Spec — React Todo App

This is the exact look your app should have. The best way to see it: run
the reference app (`cd reference-app && npm install && npm run dev`) and
click around — it's the living version of everything described here.

You don't write any CSS this week. The whole stylesheet is already in
`project/src/index.css`. Your job is to reuse the **same class names**
listed below so your components light up with the design automatically.

## Colors (light)

The default theme. These are the nine colors the app uses everywhere.

| Name | Hex | Used for |
|---|---|---|
| Background | `#F5F6FA` | page background |
| Card | `#FFFFFF` | the main white card |
| Border | `#E4E7EC` | hairline borders |
| Text | `#1F2430` | main text |
| Muted text | `#6B7280` | subtitles, counts, secondary text |
| Accent | `#6C5CE7` | Add button, active filter tab, checked box |
| Accent (hover) | `#5B4BD6` | Add button on hover |
| Success | `#22C55E` | completed checkmark |
| Danger | `#EF4444` | delete icon on hover |

## Colors (dark)

Dark mode is applied by setting `data-theme="dark"` on the `<html>`
element (that is, `document.documentElement`). The CSS variables under
`:root[data-theme="dark"]` do the rest — every color above swaps to its
dark value automatically, so you never restyle anything by hand. Remove
the attribute (or set it back to `"light"`) to return to the light theme.

| Name | Hex | Used for |
|---|---|---|
| Background | `#14151A` | page background |
| Card | `#1E1F26` | the main card |
| Border | `#2E3038` | hairline borders |
| Text | `#F5F6FA` | main text |
| Muted text | `#9CA3AF` | subtitles, counts, secondary text |
| Accent | `#6C5CE7` | Add button, active filter tab, checked box |
| Accent (hover) | `#7C6CF0` | Add button on hover |
| Success | `#22C55E` | completed checkmark |
| Danger | `#EF4444` | delete icon on hover |

## Font

Google Fonts **"Poppins"**, weights 400, 500, 600, 700. These `<link>`
tags are already in the `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

## Spacing scale

The app uses these six sizes everywhere instead of random numbers, so
spacing stays consistent: `4px, 8px, 12px, 16px, 24px, 32px`.

## Shapes

- Card corners: `12px` rounded.
- Input and button corners: `8px` rounded.
- Filter tabs, the round checkbox, and the theme-toggle button: fully
  round (`border-radius: 9999px`).
- Card shadow: `box-shadow: 0 4px 20px rgba(20, 20, 43, 0.06);` (soft, not
  a hard black shadow).

## Layout

One centered white card, max-width `480px`, a vertical stack in this
exact order:

1. **Header** — title + subtitle on the left, and the **theme-toggle
   button in the top-right corner** (the 🌙 / ☀️ button).
2. **Add-task form** — text input + "Add" button, side by side.
3. **Search input** — a full-width box to filter tasks as you type.
4. **Filter tabs** — All / Active / Completed.
5. **Task list** — the list of tasks (or the empty-state message).
6. **Footer** — items-left count + "Clear completed" button.

## States (what changes on interaction)

- **Input focus:** border turns accent-colored, plus a soft glow ring.
- **Add button:** normal = accent background; hover = darker accent;
  clicked = shrinks very slightly (`scale(0.97)`); disabled (empty input)
  = grey background, not clickable.
- **Todo row hover:** very light background tint.
- **Checkbox:** unchecked = just a circle outline; checked = filled with
  the success color plus a white checkmark, and the task text gets a
  strikethrough and turns muted-colored.
- **Delete icon:** normal = muted color, no background; hover = danger
  color with a soft red background tint.
- **Filter tab:** active = accent background, white text; inactive =
  transparent background, muted text; hover (inactive) = light background
  tint.
- **Search input focus:** same as the add input — border turns
  accent-colored with a soft glow ring.
- **Theme-toggle button:** hover = a subtle background tint (the
  page-background color).
- **Edit input:** while you're editing a task, the input shows a solid
  accent-colored border.

## Reference

`reference-app/` is the real, interactive version of this design. Run it
and compare as you build.
