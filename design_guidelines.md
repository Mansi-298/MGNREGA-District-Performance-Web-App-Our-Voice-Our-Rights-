# MGNREGA District Dashboard - Design Guidelines

## Design Approach
**Government Digital India Standards** - Following the design patterns of official Indian government portals (MyGov, DigiLocker, UMANG) with a modern, accessible, and trustworthy aesthetic. The design emphasizes clarity, data transparency, and civic pride through the Indian tricolor palette.

## Core Design Elements

### A. Color Palette

**Primary Colors (Indian Tricolor Theme):**
- Navy Blue (Primary): 220 50% 25% - Headers, primary buttons, key text
- Saffron (Accent): 25 85% 55% - CTAs, success states, highlights
- India Green: 140 60% 35% - Positive metrics, progress indicators
- White/Off-white: 0 0% 98% - Backgrounds, cards

**Functional Colors:**
- Text Primary: 220 30% 15% - Main content
- Text Secondary: 220 15% 45% - Supporting text
- Border/Divider: 220 15% 85% - Subtle separations
- Card Background: 0 0% 100% - Pure white for data cards
- Dashboard Background: 210 20% 96% - Subtle blue-gray

**Status Colors:**
- Success: 140 60% 40%
- Warning: 40 95% 50%
- Error: 0 70% 50%

### B. Typography

**Font Family:**
- Primary: 'Inter' or 'Public Sans' (Google Fonts) - Modern, highly legible for government UIs
- Hindi/Marathi: 'Noto Sans Devanagari' (Google Fonts) - Official-grade Indian language support

**Type Scale:**
- Hero Title: text-3xl md:text-4xl font-bold (Our Voice, Our Rights banner)
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-semibold
- Metric Values: text-3xl font-bold (numerical data display)
- Metric Labels: text-sm font-medium text-secondary
- Body Text: text-base
- Small/Caption: text-sm

### C. Layout System

**Spacing Units:** Use Tailwind spacing: 2, 4, 6, 8, 12, 16, 20, 24 units
- Card padding: p-6
- Section spacing: py-12 md:py-16
- Component gaps: gap-4 or gap-6
- Grid gutters: gap-6

**Container Strategy:**
- Max-width: max-w-7xl mx-auto px-4
- Full-width sections for dashboard metrics
- Contained content for forms and text

### D. Component Library

**1. Top Banner "Our Voice, Our Rights"**
- Full-width gradient banner (Navy to slightly lighter navy)
- Large centered text with Indian tricolor accent underline or border
- Include Government of India emblem/logo on left
- Height: py-6 md:py-8

**2. Navigation Bar**
- Sticky top navigation below banner
- White background with subtle shadow
- Contains: Logo/Title + Language Toggle (🌐 EN | हि | मर)
- Mobile: Hamburger menu for responsive behavior

**3. Data Cards (Metric Display)**
- Clean white cards with soft shadow (shadow-md hover:shadow-lg transition)
- Rounded corners (rounded-lg)
- Icon + Label + Large Number layout
- Color-coded left border (4px) matching metric type:
  - Employment: Navy Blue
  - Wages: Saffron
  - Work Progress: Green
  - Expenditure: Secondary blue
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

**4. District Selector**
- Two-level cascading dropdowns (State → District)
- Clean select inputs with Indian flag icon prefix
- Dropdowns styled with rounded borders, focus states in navy blue
- Auto-detect button with location pin icon

**5. Charts**
- Use Recharts for bar/line charts
- Color scheme matches tricolor palette
- Clean grid lines, clear axis labels
- Responsive with aspect ratio maintained
- Chart containers in white cards with titles

**6. Loading States**
- Spinner using circular motion in navy blue
- "Loading district data..." text in Hindi/English based on selection
- Skeleton loaders for cards (pulsing gray backgrounds)

**7. Language Toggle**
- Pill-style toggle button group
- Active language: Navy background with white text
- Inactive: Gray background with dark text
- Smooth transition between states

### E. Animations

**Minimal, purposeful animations:**
- Card hover: Slight lift (translate-y-1) + shadow increase
- Data transitions: Fade-in on load (300ms)
- Chart animations: Smooth data entry (500ms)
- Page transitions: Subtle fade (200ms)

## Images

**Emblem/Logo Placement:**
- Government of India emblem: Top left of banner (60x60px approx)
- MGNREGA scheme logo: Navbar or hero section

**Icon System:**
- Use Heroicons for UI elements (outlined style for clarity)
- Custom metric icons: 👷 (employment), 💰 (wages), 📅 (person-days), 🧱 (work), 📊 (expenditure)
- Location icon for auto-detect feature

**No large hero images** - This is a data-focused dashboard, not a marketing page. The "Our Voice, Our Rights" banner serves as the visual hero element.

## Accessibility & Mobile-First

**Rural Accessibility Focus:**
- Large tap targets (min 44x44px)
- High contrast ratios (WCAG AA minimum)
- Clear visual hierarchy
- Icons paired with text labels
- Tooltips for complex metrics (appearing on hover/tap)
- Progressive disclosure for data density

**Responsive Breakpoints:**
- Mobile: Single column cards, stacked layout
- Tablet (md): 2-column grid for metrics
- Desktop (lg): 3-column grid, full charts side-by-side

**Bilingual Implementation:**
- All UI elements translatable via i18next
- RTL not needed (Hindi/Marathi use LTR)
- Font switching handled automatically
- Preserve layout spacing across languages

## Professional Government Aesthetic

- **Trust indicators**: Government emblem, official color scheme, clear data sourcing
- **Data transparency**: Always show last updated timestamp
- **Clean hierarchy**: Important metrics emphasized, secondary data accessible but not overwhelming  
- **Professional polish**: Consistent spacing, aligned elements, purposeful color use
- **Civic pride**: Tricolor palette creates emotional connection to national employment program