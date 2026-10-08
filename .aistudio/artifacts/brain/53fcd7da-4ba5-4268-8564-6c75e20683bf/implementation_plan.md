# ChemLab SafeLook: Mobile Laboratory Equipment & Safety Documentation Guide

A mobile-first, high-precision chemistry laboratory equipment lookup and safety reference application. Designed for students, lab technicians, and research chemists to rapidly identify laboratory apparatus, review standardized safety protocols, inspect GHS hazard classifications, and verify PPE requirements before conducting experimental work.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The initial preference questions were dismissed without selection. The plan adopts the recommended industry standards: a comprehensive general, organic, and analytical laboratory scope, full GHS hazard breakdowns with interactive PPE/SOP inspection checklists, and a clean, high-precision scientific interface adhering to mobile thumb-zone ergonomics.

- **Scope & Tiers**: Covers 24+ core laboratory apparatus spanning Precision Glassware, Heating & Thermal systems, Analytical Measurement instruments, Vacuum & Separation apparatus, and Core Safety containment installations.
- **Safety Documentation Rigor**: Every item includes verified GHS hazard classifications, OSHA/ACS lab standard PPE requirements, pre-use inspection protocols, standard operating procedures (SOP), and emergency incident steps.
- **Visual Strategy**: High-resolution generated studio images of authentic scientific laboratory equipment alongside stylized resilient vector cross-sections and fallback containers.
- **Mobile Ergonomics**: Strictly follows thumb-zone principles (44px+ touch targets, 1-handed bottom navigation bar, quick drawer sheets, responsive search with zero layout shifting).

---

## 1. Overview & Core Concept

- **What It Does**: ChemLab SafeLook provides an instant, searchable index of chemical laboratory equipment with instant category filtering, hazard-rating indicators, interactive pre-use inspection checklists, and comprehensive chemical compatibility warnings.
- **Target Audience / Persona**: Chemistry undergraduates, lab managers, teaching assistants, chemical safety officers (CSOs), and analytical technicians who need instant on-the-bench equipment identification and safety verification.
- **Key Value**: Eliminates bench hazards and glassware accidents by giving users direct access to pre-operational safety checklists, proper temperature/pressure limits, and cleaning/disposal protocols directly on their mobile device or bench workstation.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Browse & Instant Lookup**: Users view a responsive 2-column mobile card grid or desktop catalog with instant search (searching by equipment name, common aliases, e.g. "Büchner", "Rotovap", or hazard type).
2. **Category & Hazard Filtering**: Quick segmented filters allow users to filter by apparatus family (Volumetric Glassware, Thermal & Reaction, Analytical Instruments, Vacuum & Separation, Safety Station) or Hazard Classification (High Heat, Pressurized/Vacuum, Corrosive Exposure, Electrical).
3. **Comprehensive Equipment Detail View**: Tapping any equipment opens an ergonomic detail sheet featuring:
   - High-resolution studio photograph and technical specification metadata (temperature limits, material composition like Borosilicate 3.3 or PTFE, tolerance ratings).
   - Prominent Safety Documentation section: GHS symbols, risk level, required PPE (with interactive wear verification), and key hazard warnings.
   - Standard Operating Procedure (SOP): Step-by-step pre-use check, operation rules, cleaning/shutdown protocols, and emergency spill/breakage handling.
4. **Interactive Pre-Use Safety Checklist**: An interactive bench check allowing the user to mark off critical inspection items (e.g., checking for star cracks, verifying cooling water flow, zeroing balance) with real-time clearance status.
5. **Saved & Bench Bookmarks**: Ability to bookmark frequently used apparatus for rapid access during a lab session with persistent client storage.

### Visual Identity & Theme
- **Aesthetic Direction**: Clinical Precision & Empirical Clarity. Crisp lab slate canvas with calibrated cobalt and safety-amber accents.
- **Color Palette (60-30-10 Budget)**:
  - *Dominant Neutral Canvas (60%)*: Lab Slate White (`#F8FAFC`) in light mode; Deep Charcoal Obsidian (`#0B0F17`) in dark mode.
  - *Structural Panels & Cards (30%)*: Crisp hairline-bordered cards (`#FFFFFF` / `#131926` with `border-slate-200` / `border-slate-800`).
  - *Accent & Safety Badges (10%)*: Calibrated Science Cobalt (`#2563EB`) for interactive navigation; Safety Warning Amber (`#D97706`) and Hazard Crimson (`#DC2626`) for safety status indicators.
- **Typography**: Clean technical grotesque (`system-ui, -apple-system, sans-serif`) paired with monospace tabular numerals (`font-mono tabular-nums`) for measurements, temperature tolerances, and volumetric capacities.
- **Zero-Pill Discipline**: Metadata displayed as clean, unboxed typography with typographic separators (`·`), reserving bordered containers strictly for clickable filter triggers and interactive checklist items.
- **Mobile Ergonomics**:
  - Touch targets $\ge 44\text{px}$.
  - Bottom navigation bar with 4 primary zones: Catalog, Categories, Safety Guide, Bookmarks.
  - Detail view opens as a thumb-accessible drawer on mobile and clean modal on desktop.

---

## 3. Key Product Decisions & Trade-Offs

- **Rich Pre-Loaded Laboratory Dataset vs. Remote API**:
  - *Chosen Approach*: Embed an exhaustive, professionally curated dataset of 24+ laboratory equipment entries with complete technical specifications and OSHA/ACS safety protocols directly in the application code.
  - *Why*: Instant offline-capable mobile access without latency or API key requirements, guaranteed data consistency, and zero dead clicks on bench stations.
- **Parallel Image Generation with Resilient Fallbacks**:
  - *Chosen Approach*: Generate high-resolution authentic laboratory photography via `generate_image` in an upfront parallel batch, backed by stylized SVG fallback schematics with `referrerPolicy="no-referrer"` so no broken image frames ever appear.
  - *Why*: Satisfies user requirement for high-resolution photos while upholding the Zero-Broken-Image guarantee.
- **Client-Side State & Persistence**:
  - *Chosen Approach*: Browser `localStorage` for bookmarked apparatus, user notes, and pre-use checklist completion states.
  - *Why*: Zero authentication friction for lab students walking in with a mobile browser, immediate reactivity, and full local persistence across sessions.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ChemLab SafeLook UI                             │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar: App Title · Quick Search Bar · Theme Toggle (Light/Dark)    │
├──────────────────────────────────┬─────────────────────────────────────┤
│  Navigation & Filter Bar         │  Equipment Catalog & Detail Area    │
│  • Search input & Debouncer      │  • Responsive Card Grid (2-col mob) │
│  • Category Segmented Buttons    │  • High-Resolution Lab Photo        │
│  • Hazard Severity Filter        │  • Technical Specs & Material Grade │
│  • Bookmarked filter             │  • GHS Hazard Classifications       │
├──────────────────────────────────┴─────────────────────────────────────┤
│  Detail Sheet / Inspection Modal                                       │
│  • High-Res Image Gallery / Visual Zoom                                │
│  • PPE Checklist (Gloves, Eye Protection, Lab Coat, Ventilation)       │
│  • Step-by-Step SOP (Pre-use, Operation, Cleaning, Emergency)          │
│  • Interactive Pre-Use Clearance Checklist                             │
│  • Chemical Compatibility Matrix & Incompatible Reagents               │
├────────────────────────────────────────────────────────────────────────┤
│  Bottom Mobile Tab Bar (Catalog · Categories · Safety Hub · Saved)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Equipment Catalog Scope
Each item in the laboratory catalog includes:
- `id`: Unique identifier
- `name`: Apparatus name (e.g., "Büchner Funnel & Filter Flask")
- `category`: Category group (`glassware`, `heating`, `analytical`, `separation`, `safety`)
- `aliases`: Common lab jargon ("Vacuum filter", "Hirsch flask")
- `imageUrl`: Generated high-resolution asset with SVG schematic fallback
- `material`: Construction (e.g., "Borosilicate Glass 3.3 / PTFE Stopcock / Porcelain")
- `specs`: Technical ratings (temperature ranges, max vacuum pressure, capacity bounds)
- `description`: Primary scientific purpose and operating principles
- `safety`:
  - `hazardLevel`: `'low' | 'moderate' | 'high' | 'critical'`
  - `ghsPictograms`: Array of applicable GHS hazards (`flammable`, `corrosive`, `toxic`, `compressed_gas`, `explosive`, `health_hazard`, `irritant`)
  - `primaryHazards`: Detailed specific risk descriptions (implosion under vacuum, thermal burns, caustic splashes)
  - `requiredPPE`: Array of gear (`gloves_nitrile`, `safety_goggles`, `face_shield`, `flame_retardant_coat`, `fume_hood`)
  - `incompatibilities`: Chemical reagents or conditions that react adversely (e.g., hydrofluoric acid for borosilicate)
  - `sop`:
    - `preInspection`: Array of mandatory checks (crack detection, stopcock grease, grounding wire)
    - `safeOperation`: Step-by-step procedures
    - `maintenanceAndCleaning`: Rinsing, acid baths, and drying protocols
    - `emergencyProtocol`: Immediate actions in case of spill, breakage, or runaway reaction
  - `safetyNotes`: Expert bench warnings

### Interactive Component & State Mapping
- `activeTab`: `'catalog' | 'categories' | 'safety' | 'bookmarks'`
- `searchQuery` & `activeCategory` & `selectedHazardLevel`: Instant multi-predicate filtering.
- `selectedEquipment`: Nullable active item driving the slide-up mobile sheet and desktop modal.
- `bookmarks`: String array persisted in `localStorage`.
- `checklistProgress`: Map of checked inspection items per equipment item.
- `theme`: Responsive dark/light mode toggle with system preference detection.
