<div align="center">
  <br />
  <h1>A E T H E R</h1>
  <p>
    <strong>High-performance spatial computing interface & portfolio architecture.</strong>
  </p>
  <br />
</div>

## The Vision

Most backend engineers view the interface as an afterthought. **Aether** was engineered to challenge that standard. It serves as a personal portfolio, but its true purpose is to demonstrate that uncompromising backend architecture and high-end spatial design are not mutually exclusive.

It is built on a design language of **Ethereal Brutalism**—stripping away visual noise to focus entirely on typography, space, and hardware-accelerated kinematics.

## The Architecture

The project is built on a tightly constrained, modern stack designed for absolute fluidity and high-performance spatial rendering:

- **Core Engine:** React 19 / TypeScript / Vite
- **Spatial Matrix (WebGL):** Three.js / React Three Fiber (`@react-three/fiber`) / Drei (`@react-three/drei`)
- **Kinematics:** Framer Motion v12 (`motion`)
- **Styling Architecture:** Tailwind CSS v4 / `clsx` / `tailwind-merge`
- **Iconography:** Lucide React

## The Design Language

Aether rejects generic templates. The aesthetic is driven by three core pillars:

1. **Absolute Minimalism:** If an element does not serve a structural or interactive purpose, it is removed.
2. **Mechanical Physics:** Animations do not just fade; they snap, spring, and drift with physical weight and intent.
3. **High Contrast:** Deep crushed blacks (`#050014`) paired with pure white typography for maximum legibility and atmospheric depth.

## Technical Documentation

### 01. File Architecture
The project follows a strict module separation for maintainability and performance:
- `/src/components/sections/`: Core layout modules (`Intro.tsx`, `About.tsx`, `ProjectGrid.tsx`).
- `/src/components/shared/`: Reusable physics wrappers (`Magnetic.tsx`, `animations.ts`).
- `/src/components/Scene.tsx`: The WebGL particle engine.
- `/src/store/aether-store.ts`: Global Zustand state management.

### 02. Spatial Environment (WebGL)
The background is a hardware-accelerated particle system built with `@react-three/fiber` and custom GLSL shaders.
- **Vertex Shaders:** `Scene.tsx` computes mouse-repulsion physics (`uMouse`) and trigonometric drift (`sin(uTime * 0.35)`) directly on the GPU.
- **Viewport Sync:** The 3D matrix automatically scales and rotates based on the active viewport (`HOME`, `ABOUT`, `WORK`), triggering camera kinematics based on Zustand state updates.

### 03. State Management
We utilize **Zustand** for zero-boilerplate global state orchestration.
- `view`: Tracks the current section of the SPA to synchronize WebGL camera rotations with the DOM layout.
- `isScrolled`: Monitors scroll triggers to dynamically adjust layout kinematics.

### 04. Kinematics (Framer Motion)
Animations are not arbitrary CSS transitions; they are spring-loaded physics calculations.
- **Typography Cascade:** Uses `staggerChildren: 0.1` and `type: "spring", stiffness: 120, damping: 14` for the mechanical text reveal in `Intro.tsx`.
- **Mobile Clamping:** The Hero architecture enforces `min-h-[100svh]` and mathematically clamped typography (`text-[4rem]`) to guarantee 60fps performance and prevent viewport jumping on legacy mobile rendering engines.

## Ignition Sequence

This architecture is rigorously constrained. **Node.js v18+** is required for precise dependency resolution.

```bash
# 01. Clone the repository
git clone https://github.com/frankieokoth/aether.git

# 02. Navigate to the workspace
cd aether

# 03. Resolve core dependencies
npm install

# 04. Ignite the spatial environment
npm run dev
```

*The local development server will initialize at `http://localhost:3000`.*

---
*Designed and engineered by Frankie Okoth. Software Engineer.*
