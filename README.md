# 🚀 Sayandip's DSA Cockpit

A premium, highly interactive Data Structures and Algorithms (DSA) learning and tracking platform built to help developers master coding interviews with an elegant, responsive UI.

![Project Status](https://img.shields.io/badge/Status-Active-success.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Built_With-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Community_Backend-3ECF8E?logo=supabase&logoColor=white)

---

## ✨ Features

### 📚 Comprehensive Curriculum
- **22 curated chapters** covering everything from basic Arrays and Hash Maps to advanced Dynamic Programming and Graph Traversal
- **437 hand-picked problems** categorized by difficulty (Easy, Medium, Hard)
- Pattern recognition sections with core concepts, algorithms, and must-know variations

### ✅ Intelligent Progress Tracking
- Visual milestone tracker per chapter (Concept Revision, Easy/Medium/Hard sets, Final Revision)
- Local storage persistence — all progress stays in your browser
- Difficulty breakdown stats (Easy/Medium/Hard solved counts)

### 🔖 Review Later (Bookmarks)
- **Bookmark any problem** to flag it for later review
- Bookmarked problems appear with a persistent **amber highlight** so they always stand out
- Filter to show only bookmarked problems using the **🔖 Saved** filter
- Hover over any problem row to reveal the bookmark icon; click to toggle

### 📝 Personal Notes
- **Add notes to any problem** — write your approach, edge cases, key insights
- Click the **note icon** (📝) next to any problem to expand an inline textarea
- Notes auto-save to localStorage and persist forever
- Note icon shows a character count badge when content exists
- Notes are **private** — never shared with friends via community links

### 👥 Community Leaderboard & Sharing
- **Global leaderboard** powered by Supabase — see how you rank against other developers
- **Share your progress** via a unique link (`?friend=YOUR_ID`)
- Friends see a **detailed profile** with:
  - Total solved count and completion percentage
  - **Difficulty breakdown** (Easy/Medium/Hard progress bars)
  - **Chapter-by-chapter progress** with colored bars and percentages
  - **Milestone completion** tracker
  - Last active timestamp
- Click any developer in the leaderboard to view their detailed profile
- Editable display name (click your name to change it)

### 🔄 Full Reset
- Reset progress clears **everything**: solved problems, bookmarks, notes, and milestones
- Also **deletes your Supabase profile** so shared links reflect accurate data
- Generates a fresh identity (new UUID + random name)

### 🌓 Theme & Responsiveness
- Seamless Light and Dark mode with glassmorphic UI elements
- Fully responsive — custom layouts for desktop, tablet, and mobile
- Smooth micro-animations and hover effects

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Hooks, Functional Components) |
| Tooling | Vite (ultra-fast HMR + optimized builds) |
| Styling | Vanilla CSS with CSS Variables, Grid, Flexbox, backdrop-filters |
| State | Custom Hook (`useProgress.js`) with localStorage persistence |
| Backend | Supabase (PostgreSQL + REST API for community features) |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [Supabase](https://supabase.com/) project (free tier works)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dsa-cockpit.git
   cd dsa-cockpit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up the database:**
   Run the contents of `schema.sql` in your Supabase SQL Editor. This creates the `community_profiles` table with all required columns and RLS policies.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## 📦 Database Schema

The `community_profiles` table stores public progress for the leaderboard:

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (generated client-side) |
| `username` | text | Display name |
| `total_solved` | integer | Total problems solved |
| `chapter_progress` | jsonb | Per-chapter `{ done, total }` |
| `difficulty_breakdown` | jsonb | `{ easy, medium, hard }` counts |
| `solved_problems` | jsonb | Array of solved problem IDs |
| `bookmarked_problems` | jsonb | Array of bookmarked problem IDs |
| `tracker_progress` | jsonb | Milestone completion map |
| `last_active` | timestamptz | Last activity timestamp |

---

## 🎨 UI & Design Architecture

- **No whitespace gaps**: Component boundaries are fluid, maximizing screen real-estate
- **Micro-interactions**: Hover effects, smooth transitions, and bounding animations
- **Responsive Layout**: Sidebar collapsible menus and adaptable modals
- **Glassmorphism**: Frosted glass effects with backdrop-filter throughout
- **Premium color system**: HSL-tuned palettes with chapter-specific accent colors

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for mastering Data Structures and Algorithms.*
