# Festive Fun - Autism Learning Game

A web-based interactive educational platform designed specifically for children with autism to learn about various cultural festivals through engaging, sensory-friendly activities.

## 🌟 About the Use Case
**Activity Prepared for Autism Kids:**
The application focuses on the theme of "Festivals" (Diwali, Christmas, Pongal, etc.) to teach cultural association and pattern recognition. The core activities include:
1.  **Shadow Matching**: Children match colorful festival objects (like a Christmas Tree or Diya) to their silhouettes. This builds visual discrimination skills.
2.  **Decoration (Free Play)**: A "Drag and Drop" canvas where children can place items freely to create a scene. This encourages creativity without the pressure of "winning" or "losing."
3.  **Visual Quiz**: Simple questions with "Hint" support to reinforce learning in a non-punitive environment.

## 🎯 Purpose and Comfort for Autism
**How this application provides comfort:**
*   **Predictability**: The game follows a strict, linear flow with no sudden surprises or "Game Over" states, reducing anxiety.
*   **Sensory-Friendly Design**: Uses a calm, pastel color palette (Warm Creams, Soft Teals) and avoids flashing lights or jarring sounds.
*   **Positive Reinforcement**: Every success is met with immediate visual feedback (gentle animations, green ticks), building confidence and agency.
*   **Fine Motor Skills**: The drag-and-drop mechanics are designed with large touch targets to help practice hand-eye coordination.

## 📱 Similar Applications
**1. Otsimo**
*   *Features*: extensive library of AAC (Augmentative and Alternative Communication) games. Our app borrows the concept of "clean interfaces" from Otsimo.
**2. Endless Reader**
*   *Features*: Uses animated characters to teach letters. We utilize similar "springy" animations (via Framer Motion) to make static objects feel alive and engaging.
**3. Choiceworks**
*   *Features*: Focuses on daily routines. We apply similar "completion tracking" concepts to help children understand when a task is finished.

## 🛠️ Technology Stack
*   **Frontend**: React.js (v19)
*   **Build Tool**: Vite (for fast performance)
*   **Language**: JavaScript (ES6+)
*   **Styling**: Vanilla CSS with CSS Variables (Theming system)
*   **Animation**: Framer Motion (Physics-based animations)
*   **Icons**: Lucide React
*   **Routing**: React Router DOM (v7)
*   **Deployment**: GitHub Pages

## 📲 Responsiveness
**Type of Responsiveness:**
The application utilizes a **Fluid Responsive Design**:
*   **Flexible Grids**: The Festival Selection menu uses CSS Grid (`repeat(auto-fit, minmax(...))`) to automatically adjust from single-column on phones to 3-column layouts on desktops.
*   **Touch Optimization**: Interactive elements are sized specifically for touch devices (min 48px targets).
*   **Container Queries**: The main game canvas allows for scrolling on smaller screens while locking to a centered "Table" view on larger screens, ensuring the game is playable on iPads and Laptops alike.

## 🔄 Workflow of the Application
1.  **Landing Page**: The user (child/parent) lands on the Home screen and sees a grid of bright, distinct cards representing different festivals (Diwali, Holi, Pongal, etc.).
2.  **Festival Dashboard**: Clicking a festival opens a specific menu with three choices: "Decorate", "Match Shadows", or "Quiz".
3.  **Game Action**:
    *   *If Matching*: The user drags items from a bottom tray to target shadows. Success triggers a "Celebration".
    *   *If Decorating*: The user freely places items on a scene.
    *   *If Quiz*: The user answers 2-3 questions with safe "Try Again" feedback for wrong answers.
4.  **Completion**: A summary screen shows progress (e.g., "Perfect Match!") and allows navigation back to the main menu.

## 📂 List of Files (Source Code)

### Root
*   `vite.config.js`: Configuration for the build tool and GitHub Pages base path.
*   `package.json`: Project dependencies and scripts.

### Source (`src/`)
*   `main.jsx`: The entry point that mounts the React app to the DOM.
*   `App.jsx`: Handles Routing (Navigation tables) and connects all pages.
*   `index.css`: Global Design System (Color variables, Reset, Typography).

### Components (`src/components/`)
*   `Layout.jsx`: Wrapper component ensuring consistent padding and centering across all pages.
*   `Card.jsx`: Reusable UI component for displaying Festival choices with hover effects.
*   `MatchingGame.jsx`: **Core Logic** for the Shadow Matching game (Drag mechanics, Collision detection).
*   `Quiz.jsx`: Logic for the Questionnaire engine, score tracking, and Hints system.

### Pages (`src/pages/`)
*   `Home.jsx`: The main Landing page displaying the list of festivals.
*   `FestivalMenu.jsx`: The intermediate dashboard for selecting a game mode.
*   `Activity.jsx`: The "Decoration / Free Play" game mode file.

### Data (`src/data/`)
*   `festivals.js`: **The Brain**. Contains all content: Festival names, colors, item lists, and quiz questions. Updating this file adds new content to the game automatically.
