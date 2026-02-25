# DOT DONE - Design System

## 🎨 Design Philosophy

This application follows a **modern, sharp, and minimalist** design language with:
- **Squarish geometry** - Clean, precise edges instead of rounded corners
- **Dark, sophisticated palette** - Deep blacks with strategic color accents
- **Typography hierarchy** - Multiple font families for visual interest
- **Subtle borders** - Zinc-800 borders create definition without overwhelming

---

## 📝 Typography Scale

### Font Families

1. **Playfair Display** (`.font-display`)
   - Used for: Main headings, brand name
   - Weight: 700, 800, 900 (Bold to Black)
   - Character: Elegant, serif, commanding presence

2. **Space Grotesk** (`.font-heading`)
   - Used for: Section headings, buttons, labels
   - Weight: 400-700
   - Character: Modern, geometric, tech-forward

3. **Inter** (`.font-body`)
   - Used for: Body text, inputs, descriptions
   - Weight: 300-800
   - Character: Clean, readable, professional

4. **JetBrains Mono** (`.font-mono`)
   - Used for: Code, task titles (optional)
   - Weight: 400-600
   - Character: Monospace, technical

### Typography Usage

```
Main Brand: font-display, text-5xl-8xl, font-black
Page Titles: font-display, text-3xl-5xl, font-bold
Section Headings: font-heading, text-xl-2xl, font-semibold, tracking-wide, uppercase
Body Text: font-body, text-sm-base, tracking-wide
Buttons: font-heading, text-sm, font-semibold, tracking-widest, uppercase
Labels: font-heading, text-xs, font-semibold, tracking-widest, uppercase
```

---

## 🎨 Color Palette

### Base Colors
```css
Background Primary: #151515
Background Secondary: #1a1a1a
Background Tertiary: #1f1f1f
Surface: #262626
Border: #404040, zinc-800, zinc-700
```

### Text Colors
```css
Primary Text: #ffffff, zinc-100
Secondary Text: zinc-200
Tertiary Text: zinc-400
Muted Text: zinc-500, zinc-600
```

### Accent Colors
```css
Primary Accent: #6FB269 (Green)
Success: Green variants
Danger: #8b3a3a, #a04444 (Red)
Warning: Yellow
Info: Blue
```

### Group Colors (Customizable)
- Pastel Green: #6FB269
- Soft Red: #F28B82
- Pastel Turquoise: #9FD9D3
- Pastel Blue: #8CC9DE
- Pastel Purple: #BBA5D6
- Soft Yellow: #F6E58D
- Pastel Orange: #F3B781
- Light Pink: #FFC5D3

---

## 🔲 Component Styling

### Shapes
- **NO ROUNDED CORNERS** - All elements use sharp, 90-degree angles
- **Borders**: 1px solid zinc-800 (default), 2px for emphasis
- **Shadows**: shadow-md, shadow-lg, shadow-xl, shadow-2xl for depth

### Spacing
```css
Component Padding: p-4 to p-10 (16px to 40px)
Element Gaps: gap-2 to gap-5 (8px to 20px)
Sections: mb-8 to mb-12 (32px to 48px)
```

### Interactions
```css
Hover States: brightness-110, bg-[lighter], border-[lighter]
Transitions: transition-all duration-200
Active States: scale-110 for icons
Focus States: focus:border-green-400
```

---

## 🧩 Component Patterns

### Sidebar
- Width: 320px (w-80)
- Background: #1a1a1a
- Border-right: zinc-800
- Group items: Sharp rectangles with colored accent stripe

### Main Content
- Background: #151515
- Max-width: max-w-3xl (768px)
- Centered with mx-auto

### Forms
- Input Background: #151515
- Input Border: zinc-800
- Focus Border: green-400
- Button: Solid color with uppercase tracking

### Cards/Items
- Background: #262626
- Border: zinc-800
- Hover: Lighter background + border change
- Shadow: shadow-md to shadow-lg

### Modals
- Backdrop: backdrop-blur-sm bg-black/40
- Modal: bg-[#1a1a1a], border-2 zinc-800
- Shadow: shadow-2xl

---

## ✨ Animation Principles

1. **Subtle by default** - No jarring movements
2. **Duration**: 200-300ms for most interactions
3. **Easing**: ease-in-out, ease-out
4. **Transform**: scale, translate for buttons/icons
5. **Opacity**: Fade in/out for modals and overlays

---

## 📱 Responsive Considerations

- Mobile-first approach
- Breakpoints: md (768px) for sidebar visibility
- Collapsible sidebar on smaller screens
- Touch-friendly tap targets (min 40x40px)

---

## 🎯 Key Design Decisions

1. **Sharp edges** create a modern, professional aesthetic
2. **Multiple fonts** add visual interest and hierarchy
3. **Dark palette** reduces eye strain and feels premium
4. **Accent colors** provide personality and customization
5. **Consistent spacing** creates rhythm and balance
6. **Subtle borders** define boundaries without clutter
