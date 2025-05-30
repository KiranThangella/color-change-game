# Color Change Game:
A fun React game where players click colors to reach a count of 3, win prizes (1st, 2nd, 3rd), and trigger "Game Over" after three winners. Features a responsive UI with dynamic background changes and distinct colors.

# Features:

Click colors (Red, Blue, Yellow, Orange, etc.) to increment counts.
First three colors to reach count 3 win 1st, 2nd, 3rd prizes.
White background initially; changes to current color (e.g., blue for Blue) every 3 seconds when running.
Winner list items show bold names, centered text, and colored backgrounds (e.g., light blue for Orange).
Mobile-friendly with Bootstrap styling.

# Requirements:

Node.js (≥14)
npm

# Setup:

Clone or Create Project:
git clone https://github.com/KiranThangella/color-change-game.git
cd color-game

Or use Vite:
npm create vite@latest color-game -- --template react
cd color-game


Install Dependencies:
npm install
npm install bootstrap@5.3.3


Add Custom CSS:In src/index.css:
@media (min-width: 768px) {
  .btn-md-normal {
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
  }
}


Run:
npm start

Opens at http://localhost:5173 (Vite) or http://localhost:3000 (Create React App).


# How to Play:

Start: Click "Start" to begin (background changes every 1 seconds).
Play: Click color buttons to increment counts.
Win: Colors reaching count 3 get prizes (e.g., "Orange Congratulations You Got 2nd Prize!").
Game Over: Ends after 3 winners; restart with "Start".
Stop: Pause random color changes.

Troubleshooting
Check console logs (Right-click → Inspect → Console) for issues.

Game Won’t Start: Ensure npm install bootstrap; check for Starting game log.
Colors Not Updating: Verify logs show Handling color change: [Color].
Prizes Missing: Check Rendering [Color]: count=3, prize=2nd Prize.
Text Not Centered/Bold: Ensure <li> has justify-content-center, <span> has fw-bold.
Yellow/Orange Same Color: Confirm colorList has Orange: { code: "info" }, Yellow: { code: "warning" }.
Fix: Reinstall dependencies (npm install), reload page, or restart (npm start).

# License:

This project is licensed under the MIT License. See the LICENSE file for details.

Developed by: [Kiran]
Date: May 30, 2025
Contact: [https://github.com/KiranThangella]
Repository: [https://github.com/KiranThangella/color-change-game.git]




