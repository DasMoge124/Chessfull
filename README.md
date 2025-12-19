# ♟️ Chessfull

An interactive pedagogical tool designed to teach advanced chess strategy through real-game simulations. This platform features a high-fidelity interactive lesson module based on the professional match between **GM Magnus Carlsen** and **GM Bardiya Daneshvar**.

**🚀 [Live Demo on Netlify](https://chessfull.netlify.app/)**

## ✨ Key Features

* **Interactive Lesson Engine:** A step-by-step game validator that compares user moves against Grandmaster-level game data using FEN strings.
* **Real-Time Tactical Feedback:** Provides immediate success/error messaging and contextual explanations for every move.
* **Intelligent Hint System:** Offers "Hint" and "Solution" toggles that appear dynamically when a user makes an incorrect move.
* **Professional Game State Management:** Handles complex chess mechanics including turn tracking, move history highlighting, and pawn promotion modals (Queen, Rook, Bishop, Knight).
* **Visual Learning Aids:** Includes custom visual markers for legal moves and dedicated sections explaining "Checkmates vs. Stalemates" with animated demonstrations.

## 🛠️ Technical Stack

* **Frontend:** React (Hooks, Functional Components)
* **State & Logic:** `chess.js` for move validation and game rules.
* **Styling:** Custom CSS3 for the 8x8 responsive grid and UI components.
* **Deployment:** Managed via **Netlify** for high-performance global delivery.

## 💡 Innovation: AI-Augmented Development

During the development of this platform, I utilized **Gemini** to act as a technical co-pilot to:
* **Architect Board-to-DOM Mapping:** Streamlined the complex process of mapping the nested arrays from the `chess.js` engine into a responsive React grid.
* **Optimize Move Validation:** Developed a custom hook to handle the asynchronous nature of "Black's" automatic response moves, ensuring the board updates smoothly without state conflicts.
* **Rapid Prototyping:** Accelerated the creation of the **Pawn Promotion Overlay**, moving from a conceptual logic bug to a fully functional UI choice modal in record time.

## 🏁 Installation & Development

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/chess-teaching-platform.git](https://github.com/yourusername/chess-teaching-platform.git)
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run Application:**
    ```bash
    npm start
    ```

---
