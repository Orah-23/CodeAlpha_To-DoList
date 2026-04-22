# 📝 To-Do List App

A modern, dark-themed task management web application built with HTML, CSS, and JavaScript. Supports full CRUD operations, task descriptions, live search, filtering, and persistent localStorage.

**Author:** Francois Oratile Kgatlhanye  
**Date:** 2026-04-20

---

## Preview

> Dark-themed card UI with slide-in task panel, live search, and filter tabs.

---

## Features

- **Add tasks** — open a clean panel with a task name and optional description
- **Edit tasks** — update name or description via the same panel, pre-filled
- **Complete tasks** — custom checkbox with strikethrough styling
- **Delete tasks** — remove individual tasks with the × button
- **Live search** — filters tasks in real time across name and description
- **Filter tabs** — view All, Active, or Completed tasks
- **Clear completed** — bulk-remove all finished tasks in one click
- **Task descriptions** — each task supports a multi-line description (up to 400 characters)
- **Persistent storage** — tasks are saved to `localStorage` and survive page refreshes

---

## Project Structure

```
todo/
├── index.html
├── README.md 
├── Styles/
│   └── style.css
└── js/
    └── script.js   
```

---

## Getting Started

No build tools or dependencies required.

**1. Clone the repository**
```bash
git clone https://github.com/your-username/CodeAlpha_To-DoList.git
cd CodeAlpha_To-DoList
```

**2. Open in your browser**
```bash
open index.html
```
Or simply double-click `index.html` in your file explorer.

---

## Usage

| Action | How |
|---|---|
| Add a task | Click the **+** button (top-right) |
| Save a task | Fill in the name → click **Save task** |
| Discard | Click **Discard**, the × icon, the backdrop, or press `Escape` |
| Complete a task | Click the checkbox on the left |
| Edit a task | Hover the task → click the **✎** button |
| Delete a task | Hover the task → click the **✕** button |
| Search | Type in the search bar — filters live across name and description |
| Filter | Click **All**, **Active**, or **Completed** tabs |
| Clear finished | Click **Clear completed** in the bottom bar |

---

## Key Concepts

- **CRUD operations** — create, read, update, and delete tasks entirely in JavaScript
- **Event handling** — click and input events drive all interactions with no page reloads
- **localStorage** — tasks are serialised as JSON and persisted between sessions
- **XSS prevention** — all user input is sanitised via `escapeHTML()` before being injected into the DOM
- **Animated panel** — the add/edit panel uses CSS transitions (`opacity` + `transform`) for a smooth slide-in effect

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Dark theme, grid layout, keyframe animations, transitions |
| JavaScript | Task logic, DOM manipulation, localStorage, event handling |
| Google Fonts | DM Sans + DM Mono typefaces |

---

## Browser Support

Works in all modern browsers — Chrome, Firefox, Edge, and Safari. No polyfills or external libraries required.

---

## License

This project is for educational purposes. Feel free to use and adapt it as needed.
