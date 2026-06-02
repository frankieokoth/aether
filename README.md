<div align="center">

# A E T H E R

**An experiment in spatial computing, immersive interaction, and architectural software design.**

</div>

---

## The Vision

Modern software often treats the interface as a presentation layer rather than a core component of the system itself.

**Aether** was engineered to challenge that assumption. It serves as a personal portfolio, but its true purpose is to demonstrate that uncompromising software architecture and high-end spatial design are not mutually exclusive.

It is built on a design language of **Ethereal Brutalism**—stripping away visual noise to focus entirely on typography, space, and hardware-accelerated kinematics.

---

## The Architecture

The project is built on a tightly constrained modern stack designed for fluid interaction and high-performance spatial rendering:

* **Core Engine:** React 19 / TypeScript / Vite
* **Spatial Matrix (WebGL):** Three.js / React Three Fiber (`@react-three/fiber`) / Drei (`@react-three/drei`)
* **Kinematics:** Framer Motion v12 (`motion`)
* **Styling Architecture:** Tailwind CSS v4 / `clsx` / `tailwind-merge`
* **State Orchestration:** Zustand
* **Iconography:** Lucide React

---

## The Design Language

Aether rejects generic templates. The aesthetic is driven by three core pillars:

### 01. Absolute Minimalism

If an element does not serve a structural or interactive purpose, it is removed.

### 02. Mechanical Physics

Animations do not simply fade; they snap, spring, and drift with physical weight and intent.

### 03. High Contrast

Deep crushed blacks (`#050014`) paired with pure white typography create maximum legibility and atmospheric depth.

---

## Technical Documentation

### 01. File Architecture

The project follows a strict modular separation to keep presentation, interaction, and rendering concerns isolated and maintainable.

```text
src/
├── components/
│   ├── sections/          # Intro.tsx, About.tsx, ProjectGrid.tsx
│   ├── shared/            # Magnetic.tsx, animations.ts
│   └── Scene.tsx          # WebGL particle environment
├── store/
│   └── aether-store.ts    # Zustand state orchestration
├── hooks/
├── lib/
└── assets/
```

---

### 02. Spatial Environment (WebGL)

The background is a hardware-accelerated particle system built with React Three Fiber and custom GLSL shaders.

#### Vertex Processing

`Scene.tsx` computes mouse-repulsion physics (`uMouse`) and trigonometric drift (`sin(uTime * 0.35)`) directly on the GPU.

#### Viewport Synchronization

The 3D environment scales and rotates based on the active viewport (`HOME`, `ABOUT`, `WORK`), allowing camera movement to remain synchronized with application state.

---

### 03. State Management

Global state is orchestrated through Zustand.

#### Core State Domains

* `view` — Tracks the current section of the application and synchronizes camera orientation with the DOM.
* `isScrolled` — Monitors scroll state and triggers dynamic layout adjustments.

This architecture enables communication between the DOM layer and the WebGL environment while minimizing unnecessary renders.

---

### 04. Kinematics (Framer Motion)

Animations are treated as spring-based physical systems rather than conventional CSS transitions.

#### Typography Cascade

```ts
staggerChildren: 0.1
type: "spring"
stiffness: 120
damping: 14
```

Used to create the staged mechanical text reveal within `Intro.tsx`.

#### Mobile Clamping

The hero architecture utilizes `min-h-[100svh]` and clamped typography to reduce viewport jumping and maintain fluid rendering performance across mobile devices.

---

## Ignition Sequence

### Prerequisites

* Node.js v18+
* npm

### Installation

```bash
# 01. Clone the repository
git clone https://github.com/frankieokoth/aether.git

# 02. Navigate to the workspace
cd aether

# 03. Resolve dependencies
npm install

# 04. Launch the environment
npm run dev
```

The local development server will initialize at:

```text
http://localhost:3000
```

---

## Author

**Frankie Okoth**

Software Engineer exploring the convergence of artificial intelligence, virtual reality, spatial computing, and immersive digital architectures.

> *"The interface is not the surface of the system. It is the system experienced by a human being."*
