# Graph Report - Retaehc-pop  (2026-08-28)

## Corpus Check
- 77 files · ~84,646 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 322 nodes · 461 edges · 49 communities (13 shown, 36 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.82)
- Token cost: 207,479 input · 0 output

## Community Hubs (Navigation)
- Public Site Pages
- Admin Content Lists
- Resume Projects & Experience
- TypeScript Config & Types
- Build/Dev Dependencies
- Admin Edit Forms
- Shared UI Components
- App Layout & Providers
- Icon & Env Dependencies
- Login Flow
- JumpText Component
- Admin Layout
- Admin Dashboard
- NextAuth API Route
- ESLint Config
- Prisma Seed Script
- Carousel Autoplay Dependency
- Carousel Dependency
- ESLint Dependency
- ESLint Next Config Dependency
- FontAwesome Core Dependency
- FontAwesome Regular Icons Dependency
- FontAwesome Solid Icons Dependency
- Framer Motion Dependency
- NextAuth Dependency
- Next.js Config
- Next.js Dependency
- Prisma Client Dependency
- React Dependency
- React DOM Dependency
- Intersection Observer Dependency
- React Spring Dependency
- Sass Dependency
- SCSS Dependency
- Sharp Image Dependency
- Node Types Dependency
- React Types Dependency
- React DOM Types Dependency
- TypeScript Dependency
- Vercel Blob Dependency
- Vercel Postgres Dependency
- Proxy Config
- Site Logo
- Profile Photo (Amsterdam)
- Profile Photo (Graduation)
- Profile Photo (Headshot)

## God Nodes (most connected - your core abstractions)
1. `Papop Lekhapanyaporn Resume (current/updated English CV)` - 30 edges
2. `Papop Lekhapanyaporn Lebenslauf (German resume)` - 21 edges
3. `Papop Lekhapanyaporn Resume (earlier English CV)` - 21 edges
4. `comfortaa` - 19 edges
5. `compilerOptions` - 16 edges
6. `Hypertext()` - 14 edges
7. `roboto_mono` - 12 edges
8. `projectWithInfo` - 7 edges
9. `scripts` - 6 edges
10. `include` - 6 edges

## Surprising Connections (you probably didn't know these)
- `GNS-Systems (HPC System Engineer employer)` --conceptually_related_to--> `Redcare Pharmacy (Working Student, Cologne)`  [AMBIGUOUS]
  readme.md → public/resume.pdf
- `Web portfolio (personal website project)` --conceptually_related_to--> `Retaehc-pop README (portfolio site)`  [INFERRED]
  public/resume.pdf → readme.md
- `GNS-Systems (HPC System Engineer employer)` --conceptually_related_to--> `N-body Simulation (OpenMP)`  [INFERRED]
  readme.md → public/resume.pdf
- `GNS-Systems (HPC System Engineer employer)` --conceptually_related_to--> `OpenMP`  [INFERRED]
  readme.md → public/resume.pdf
- `Papop Lekhapanyaporn Resume (current/updated English CV)` --references--> `Papop Lekhapanyaporn`  [EXTRACTED]
  public/resume.pdf → readme.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **HPC Parallel Computing Projects (OpenMP)** — public_resume_n_body_simulation, public_resume_particle_life, public_resume_sparse_matrix_vector_multiplication, public_resume_openmp [INFERRED 0.85]
- **Papop's Employment/Career Timeline** — readme_papop_lekhapanyaporn, public_resume_space_ac, public_resume_redcare_pharmacy, readme_gns_systems [INFERRED 0.75]
- **Papop's Resume Versions (EN/DE/Updated)** — public_resume_resume, public_resume_en_resume_en, public_resume_de_resume_de [INFERRED 0.85]

## Communities (49 total, 36 thin omitted)

### Community 0 - "Public Site Pages"
Cohesion: 0.07
Nodes (34): MONTH, Page(), useElementOnScreen(), getProject(), MONTH, Page(), containerVariants, PageBanner() (+26 more)

### Community 1 - "Admin Content Lists"
Cohesion: 0.05
Nodes (7): containerVariants, BlogCard(), cardVariants, MONTH, CardSkeleton(), blogWithTags, experienceEntry

### Community 2 - "Resume Projects & Experience"
Cohesion: 0.12
Nodes (38): Alien Cansat (thermal camera / pm2.5-heat correlation), APAC Microsoft Hackathon 2022, Asclepius (aka ASL to text - ASL-to-English translation AI), Assumption College, Bangkok, Automated story (Reddit-to-YouTube shorts script), Blade defects processing (aka Detect defect in shaving blade), Annual Cansat Competition 2021, Papop Lekhapanyaporn Lebenslauf (German resume) (+30 more)

### Community 3 - "TypeScript Config & Types"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 4 - "Build/Dev Dependencies"
Cohesion: 0.09
Nodes (22): dotenv-cli, devDependencies, dotenv-cli, prisma, @svgr/webpack, tsx, @types/styled-components, name (+14 more)

### Community 5 - "Admin Edit Forms"
Cohesion: 0.18
Nodes (7): empty, Form, empty, Form, ImageUploadField(), empty, Form

### Community 6 - "Shared UI Components"
Cohesion: 0.23
Nodes (9): Images(), DotButton(), DotButtonPropType, LineButton(), NextButton(), PrevButton(), PrevNextButtonPropType, Carousel() (+1 more)

### Community 7 - "App Layout & Providers"
Cohesion: 0.32
Nodes (4): metadata, viewport, Providers(), ContactIcons()

### Community 8 - "Icon & Env Dependencies"
Cohesion: 0.29
Nodes (7): dotenv, @fortawesome/free-brands-svg-icons, @fortawesome/react-fontawesome, dependencies, dotenv, @fortawesome/free-brands-svg-icons, @fortawesome/react-fontawesome

### Community 10 - "JumpText Component"
Cohesion: 0.50
Nodes (3): AnimatedDiv, JumpText(), Prototype

## Ambiguous Edges - Review These
- `GNS-Systems (HPC System Engineer employer)` → `Redcare Pharmacy (Working Student, Cologne)`  [AMBIGUOUS]
  readme.md · relation: conceptually_related_to

## Knowledge Gaps
- **113 isolated node(s):** `extends`, `next/core-web-vitals`, `Form`, `empty`, `Form` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `GNS-Systems (HPC System Engineer employer)` and `Redcare Pharmacy (Working Student, Cologne)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Icon & Env Dependencies` to `Build/Dev Dependencies`, `Carousel Autoplay Dependency`, `Carousel Dependency`, `ESLint Dependency`, `ESLint Next Config Dependency`, `FontAwesome Core Dependency`, `FontAwesome Regular Icons Dependency`, `FontAwesome Solid Icons Dependency`, `Framer Motion Dependency`, `NextAuth Dependency`, `Next.js Dependency`, `Prisma Client Dependency`, `React Dependency`, `React DOM Dependency`, `Intersection Observer Dependency`, `React Spring Dependency`, `Sass Dependency`, `SCSS Dependency`, `Sharp Image Dependency`, `Node Types Dependency`, `React Types Dependency`, `React DOM Types Dependency`, `TypeScript Dependency`, `Vercel Blob Dependency`, `Vercel Postgres Dependency`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `comfortaa` connect `Public Site Pages` to `Admin Content Lists`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `Hypertext()` connect `Public Site Pages` to `Admin Content Lists`, `App Layout & Providers`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `Form` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Public Site Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.07288135593220339 - nodes in this community are weakly interconnected._
- **Should `Admin Content Lists` be split into smaller, more focused modules?**
  _Cohesion score 0.04902867715078631 - nodes in this community are weakly interconnected._