# 🎁 Piksy

**Piksy** is a SaaS app for creating interactive, shareable **gift websites** — where the recipient chooses their present.

Instead of guessing what someone wants, you send them a beautifully designed page with curated gift options.

---

## ✨ Features

- 🧱 **Present Builder**
  - Create a custom “gift experience” step-by-step
  - Landing page → gift options → final selection

- 🎯 **Gift Options**
  - Add multiple gift choices
  - Mix AI-generated + manually added ideas

- 🌐 **Shareable Pages (coming soon)**
  - Send a unique link to the recipient
  - Let them pick their preferred gift

- 📦 **Presents Hub**
  - Manage all your gift experiences in one place

- 🔍 **Gifts Library**
  - Store, filter, and reuse gift ideas

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Architecture:** Component-based + service layer
- **State:** Custom hooks (migration-ready for Zustand/API)
- **Deployment:** Vercel

---

## 🚀 Live Demo

👉 https://piksy-steel.vercel.app

---

## 📁 Project Structure

```bash
piksy/
  app/                # React application
    src/
      components/     # UI components
      pages/          # App pages (Home, Presents, Gifts, Builder)
      services/       # Business logic layer
      hooks/          # State management
      types/          # Models (Present, Gift, etc.)
