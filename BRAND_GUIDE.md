# Qure Home Brand Guide - Implementation Reference

This document explains how to use the Qure Home brand colors and typography system in the codebase.

## Brand Colors

### Color Palette

1. **Primary - Medical Teal** (`#2F8F8B`)
   - **Purpose**: Calm, hygienic, and trustworthy. Medical-adjacent without triggering hospital anxiety.
   - **Usage**: Primary buttons, links, brand elements, medical indicators

2. **Secondary - Care Amber** (`#F2B233`)
   - **Purpose**: Human warmth and reassurance. Balances seriousness with dignity.
   - **Usage**: Secondary actions, highlights, warm accents

3. **Grounding - Terra Red** (`#C7473A`)
   - **Purpose**: Urgency under control. Provides emotional grounding without alarm.
   - **Usage**: Destructive actions, important warnings, critical information

4. **Neutral - Charcoal Grey** (`#3E3E3E`)
   - **Purpose**: Operational clarity, authority, and long-form readability.
   - **Usage**: Text, borders, neutral elements

5. **Background - Off-White Linen** (`#F6F7F4`)
   - **Purpose**: Soft residential calm that reduces clinical feel and visual fatigue.
   - **Usage**: Page backgrounds, card backgrounds

### How to Use Brand Colors

#### In Tailwind CSS Classes

```tsx
// Primary (Medical Teal)
<div className="bg-primary text-primary-foreground">Primary Button</div>
<div className="text-primary">Primary Text</div>
<div className="border-primary">Primary Border</div>

// Direct brand color access
<div className="bg-qure-primary">Medical Teal</div>
<div className="bg-qure-secondary">Care Amber</div>
<div className="bg-qure-grounding">Terra Red</div>
<div className="bg-qure-neutral">Charcoal Grey</div>
<div className="bg-qure-background">Off-White Linen</div>
```

#### In CSS/SCSS

```css
/* Using CSS variables */
.element {
  background-color: hsl(var(--qure-primary));
  color: hsl(var(--qure-secondary));
  border-color: hsl(var(--qure-grounding));
}

/* Or using system variables */
.element {
  background-color: hsl(var(--primary));
  color: hsl(var(--secondary));
}
```

#### In Inline Styles (React)

```tsx
<div style={{ 
  backgroundColor: 'hsl(var(--qure-primary))',
  color: 'hsl(var(--qure-secondary))'
}}>
  Content
</div>
```

## Typography System

### Primary Typeface: Inter / Source Sans 3
- **Usage**: Default for UI, decks, website, pricing, and operational documents
- **Reason**: Neutral and highly readable

### Secondary Typeface: Merriweather / Libre Baskerville
- **Usage**: Long-form reading such as explanatory pages, patient information, or detailed PDFs
- **Reason**: Optimized for extended reading

### How to Use Typography

#### In Tailwind CSS Classes

```tsx
// Primary typeface (default - Inter/Source Sans 3)
<div className="font-sans">Default UI text</div>
<div className="font-primary">Primary typeface</div>

// Secondary typeface (Merriweather/Libre Baskerville)
<div className="font-reading">Long-form content</div>
<div className="font-secondary">Secondary typeface</div>
```

#### In CSS

```css
/* Primary typeface (default) */
body {
  font-family: 'Inter', 'Source Sans 3', sans-serif;
}

/* Secondary typeface for long-form reading */
.article-content {
  font-family: 'Merriweather', 'Libre Baskerville', serif;
}
```

#### Automatic Application

- **Body text**: Automatically uses Inter/Source Sans 3 (primary typeface)
- **Articles/Long-form**: Use the `.font-reading` class or wrap in `<article>` tags

## Examples

### Button with Primary Color
```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
  Book Now
</button>
```

### Card with Brand Colors
```tsx
<div className="bg-qure-background border border-qure-neutral p-6 rounded-lg">
  <h2 className="text-qure-primary font-sans font-bold">Title</h2>
  <p className="text-qure-neutral font-reading">Long-form content here...</p>
</div>
```

### Warning/Alert with Grounding Color
```tsx
<div className="bg-qure-grounding/10 border border-qure-grounding text-qure-grounding p-4 rounded-lg">
  Important: Please review this information carefully.
</div>
```

## Color Variables Reference

All colors are available as CSS variables in HSL format:

- `--qure-primary`: Medical Teal (177 50% 37%)
- `--qure-secondary`: Care Amber (40 87% 57%)
- `--qure-grounding`: Terra Red (6 55% 50%)
- `--qure-neutral`: Charcoal Grey (0 0% 24%)
- `--qure-background`: Off-White Linen (80 10% 96%)

System variables (mapped to brand colors):
- `--primary`: Maps to Medical Teal
- `--secondary`: Maps to Care Amber
- `--destructive`: Maps to Terra Red
- `--foreground`: Maps to Charcoal Grey
- `--background`: Maps to Off-White Linen

## Migration Notes

- Old healthcare colors (`--health-primary`, etc.) are still available for backward compatibility
- All existing components using `primary`, `secondary`, etc. will automatically use the new brand colors
- The background color has changed from pure white to Off-White Linen for a softer feel

