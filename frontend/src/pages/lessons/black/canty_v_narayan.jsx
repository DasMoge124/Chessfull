import React, { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
// Assuming the path to Chessboard is correct and it handles move logic
import Chessboard from "./components/Chessboard";
import "./GameLesson.css";

// =========================================================
// 1. GAME DATA & UTILITIES
// =========================================================

const STARTING_FEN =
  "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3";

const INITIAL_SCENARIO =
  "FM James Canty and CM Lakshi Narayanan started the game with the Open Sicilian, consisting of the sequence: 1. e4 c5 2. Nf3 d6 3. d4. This allows dynamic and tactical play for both sides, grants Canty an attacking opportunity, and provides a queenside attack opportunity. In this position, Canty hated how Narayanan controlled the center with two pawns and a knight and decided to decide to simplify the position. **How did Canty simplify the position?**";

const GAME_LESSON_MOVES = [
  {
    move: "3... cxd4",
    player: "Black",
    explanation:
      "This simplifies the position and weakens Narayanan’s control over the center.",
    fen: "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    hint: "To simplify, try to exchange pieces of equal value. For instance, pawns have the same value of one point in material, knights and bishops all have the same value of 3 points in material, rooks all have the same value of 5 points in material, and queens all have the same value of 9 points in material.",
    solution: "cxd4",
  },
  {
    move: "4. Nxd4",
    player: "White",
    explanation:
      "Narayanan plays Nxd4, completing the pawn exchange. Canty must now continue developing and attack the vulnerable e4 pawn. What did Canty play in this position?",
    fen: "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nxd4",
  },
  {
    move: "4... Nf6",
    player: "Black",
    explanation:
      "This develops the knight and attacks the e4 pawn. This is a fundamental opening principle: develop your pieces and challenge the center.",
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    hint: "Remember the opening principle: develop your pieces. Try developing pieces like knights or bishops to control the center. Also, remember what the prompt says: 'Canty continues developing and attacks the vulnerable e4 pawn.'",
    solution: "Nf6",
  },
  {
    move: "5. Nc3",
    player: "White",
    explanation:
      "Narayanan plays Nc3 to defend the e4 pawn and continue development. Canty decides to prepare queenside development and limit Narayanan’s attacking possibilities. What move did Canty play?",
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nc3",
  },
  {
    move: "5... a6",
    player: "Black",
    explanation:
      "This prepares queenside development (with ...b5) and prevents White from playing Nb5 or Bb5, restricting White's pieces.",
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    hint: "Think about why there is a pawn on a6.",
    solution: "a6",
  },
  {
    move: "6. Bc4",
    player: "White",
    explanation:
      "Narayanan develops the Bishop to c4, putting pressure on Black's center. Canty needs to protect the f7 square and reinforce their position. What did Canty play in this position?",
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Bc4",
  },
  {
    move: "6... e6",
    player: "Black",
    explanation:
      "Canty plays e6 to protect the f7 square and prepare to develop the dark-squared bishop, reinforcing the center.",
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 7",
    hint: "Best to mainly focus on defending the **f7 square** and opening a path for development.",
    solution: "e6",
    customIncorrectFeedback: {
        "e5": "Incorrect Answer: e5. This move doesn’t solve the problem at all and allows white to play Nf5, further attacking the backwards d6 pawn, and the bishop on c4 still maintains control over the d5 square, along with three other pieces - the queen, knight on c3, and e4 pawn - which is more attackers than defenders. This means that if d5 was played, Narayanan can capture with either the e4 pawn, the bishop on c4, or the knight on c3 (note the queen cannot capture the pawn since the bishop on f8 is one of the defenders of the d5 square)."
    }
  },
  {
    move: "7. Bb3",
    player: "White",
    explanation:
      "Narayanan played Bb3, retreating the bishop. Canty decided to continue development and control more space on the queenside. What move did Canty play to do so?",
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/1BN5/PPP2PPP/R1BQK2R b KQkq - 1 7",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Bb3",
  },
  {
    move: "7... b5",
    player: "Black",
    explanation:
      "This move controls the c4 and a4 squares, which limits the b3 bishop’s options. This also allows the possibility of moving the light-squared bishop to b7, putting more pressure on the e4 pawn and pinning it to the g2 pawn.",
    fen: "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQK2R w KQkq b6 0 8",
    hint: "Think about why there is a pawn on a6.",
    solution: "b5",
  },
  {
    move: "8. O-O",
    player: "White",
    explanation:
      "Narayanan castled kingside. Canty decided that he wanted to do the same thing. What move did Canty play to prepare to castle kingside?",
    fen: "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQ1RK1 b kq - 1 8",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "O-O",
  },
  {
    move: "8... Be7",
    player: "Black",
    explanation:
      "This allows the h8 rook and the king to see each other, allowing Canty the potential opportunity to castle",
    fen: "rnbqk2r/4bppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQ1RK1 w kq - 2 9",
    hint: "Think about why Canty initially could not castle kingside a.",
    solution: "Be7",
  },
  {
    move: "9. Qf3",
    player: "White",
    explanation:
      "Narayanan plays Qf3, threatening to win either a rook or a knight if playing e5 is possible, while also leaving the knight on d4 vulnerable. Canty found a move that attacks the vulnerable knight on d4 and sets up protection against the potential discovered attack at the same time. What move did Canty play to do so?",
    fen: "rnbqk2r/4bppp/p2ppn2/1p6/3NP3/1BN2Q2/PPP2PPP/R1B2RK1 b kq - 3 9",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qf3",
  },
  {
    move: "9... Qb6",
    player: "Black",
    explanation:
      "Qb6. This sets up the protection against the queen on f3 and attacks the vulnerable knight on d4.",
    fen: "rnb1k2r/4bppp/pq1ppn2/1p6/3NP3/1BN2Q2/PPP2PPP/R1B2RK1 w kq - 4 10",
    hint: "Look for checks, captures and threats. Huge hint: there is an undefended piece and you can threaten it on the middle of the board.",
    solution: "Qb6",
  },
  {
    move: "10. Be3",
    player: "White",
    explanation:
      "Narayanan plays Be3, threatening to play Nxe6, winning a pawn while also creating a discovered attack threatening to either win the queen on b6 or the pawn on g7. How did Canty prevent this from happening?",
    fen: "rnb1k2r/4bppp/pq1ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 b kq - 5 10",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Be3",
  },
  {
    move: "10... Qb7",
    player: "Black",
    explanation:
      "Qb7. This simply moves the queen away from the pin created by the bishop on e3, preventing the dangerous tactical shot Nxe6 and keeping the queenside connected.",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 w kq - 6 11",
    hint: "Remember the posibility of creating a discovered attack via Nxe6. We can just move the queen away by moving it by one square.",
    solution: "Qb7",
    customIncorrectFeedback: {
        "e5": "Even though e5 first attacks the knight on d4, it still allows Narayan to create a discovered attack through a move like Nf5, which forces Canty to move his queen away from the bishop's threat and ultimately give up his pawn after Narayan plays Nxg7."
    }
  },
  {
    move: "11. Qg3",
    player: "White",
    explanation:
      "After Narayanan played Qg3 (threatening Qxg7), Canty decides to create a counterattack. What move did Canty play?",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1B1Q1/PPP2PPP/R4RK1 b kq - 7 11",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg3",
  },
  {
    move: "11... b4",
    player: "Black",
    explanation:
      "Canty decides to attack the knight on c3 after playing b3, prompting Narayanan to play the best move Na4. If Narayanan played Qxg7, Canty could play Rg8, forcing Narayanan’s Queen to move to a square like h6 for its own safety, allowing Canty to win a knight by playing bxc3. ",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 w kq - 6 11",
    hint: "Lets try kicking a piece by moving a pawn up, which can push that piece to a square where is controls less squares",
    solution: "b4",
  },
  {
    move: "12. Na4 Nbd7 13. f3 O-O 14. Bh6",
    player: "White",
    explanation:
      "After Narayanan played Qg3 (threatening Qxg7), Canty decides to create a counterattack. What move did Canty play?",
    fen: "r1b2rk1/1q1nbppp/p2ppn1B/8/Np1NP3/1B3PQ1/PPP3PP/R4RK1 b - - 2 14",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg3",
  },
  {
    move: "14... Nh5",
    player: "Black",
    explanation: "If you found that move, congrats. Let's continue",
    fen: "r1b2rk1/1q1nbppp/p2ppn1B/8/Np1NP3/1B3PQ1/PPP3PP/R4RK1 b - - 2 14",
    hint: "Notice any potential checks, captures, or threats from your opponent? Be sure to look for all of these in the list. This includes: capturing hang pieces, checkmates, forks, pins, skewers.",
    solution: "Nh5",
  },
  {
    move: "15. Qg4 ",
    player: "White",
    explanation: "Next moves consist of Canty attacking the queen.",
    fen: "r1b2rk1/1q1nbppp/p2pp2B/7n/Np1NP1Q1/1B3P2/PPP3PP/R4RK1 b - - 4 15",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg4 ",
  },
  {
    move: "15... Ndf6",
    player: "Black",
    explanation: "If you found that move, congrats. Let's continue",
    fen: "rnb1k2r/1q2bppp/p2ppn2/1p6/3NP3/1BN1BQ2/PPP2PPP/R4RK1 w kq - 6 11",
    hint: "Notice any potential checks, captures, or threats from your opponent? Be sure to look for all of these in the list. This includes: capturing hang pieces, checkmates, forks, pins, skewers.",
    solution: "Ndf6",
  },
  {
    move: "16. Qg5",
    player: "White",
    explanation:
      "After being attacked so much, Narayan seems to have trapped his own piece. What does Canty do to ensure Narayan's bishop gets captured?",
    fen: "r1b2rk1/1q2bppp/p2ppn1B/6Qn/Np1NP3/1B3P2/PPP3PP/R4RK1 b - - 6 16",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg4 ",
  },
  {
    move: "16... Kh8",
    player: "Black",
    explanation:
      "If you found that move, congrats. Now Narayan is guaranteed to win a bishop since the bishop is trapped by Narayan's own queen. Let's continue",
    fen: "r1b2r1k/1q2bppp/p2ppn1B/6Qn/Np1NP3/1B3P2/PPP3PP/R4RK1 w - - 7 17",
    hint: "Seems like one of Narayan's pieces is trapped by another piece (hint: his queen). Yet, at the same time, that piece cannot be captured since Canty's king is pinned. Let's fix that.",
    solution: "Kh8",
  },
  {
    move: "17. Bxg7+",
    player: "White",
    explanation: "How do you respond to the check?",
    fen: "r1b2r1k/1q2bpBp/p2ppn2/6Qn/Np1NP3/1B3P2/PPP3PP/R4RK1 b - - 0 17",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg4 ",
  },
  {
    move: "17... Nxg7",
    player: "Black",
    explanation:
      "In that sequence, Canty was forcing the Queen to move to a specific position by making multiple threats with his knights to eventually force a position that allows Canty to eventually win a bishop.",
    fen: "r1b2r1k/1q2bppp/p2ppn1B/6Qn/Np1NP3/1B3P2/PPP3PP/R4RK1 w - - 7 17",
    hint: "Hint: you should respond with a capture.",
    solution: "Nxg7",
  },
  // --- START of Part 10 Sequence ---
  {
    move: "18. Qh4",
    player: "White",
    explanation:
      "White plays Qh4. Find Black's move to begin the forcing sequence.",
    fen: "r1b2r1k/1q2bpnp/p2ppn2/8/Np1NP2Q/1B3P2/PPP3PP/R4RK1 b - - 1 18",
    hint: "Try to get rid of a minor piece that is chilling at the center of the board. (Hint from image for e5)",
    solution: "Qh4",
  },
  {
    move: "18... e5",
    player: "Black",
    explanation:
      "e5. This attacks the Knight on d4. Narayanan plays 19. Ne2. What's Canty's next move?",
    fen: "r1b2r1k/1q2bpnp/p2p1n2/4p3/Np1NP2Q/1B3P2/PPP1N1PP/R4RK1 w - - 0 19",
    hint: "Try to kick White's Queen out of the kingside.",
    solution: "e5",
  },
  {
    move: "19. Ne2",
    player: "White",
    explanation:
      "White plays Ne2. Find Black's move to attack the Queen again.",
    fen: "r1b2r1k/1q2bpnp/p2p1n2/4p3/Np2P2Q/1B3P2/PPP1N1PP/R4RK1 b - - 1 19",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Ne2",
  },
  {
    move: "19... Ng4",
    player: "Black",
    explanation:
      "Ng4. Canty attacks the Queen again. Narayanan plays 20. Qg3. What's Canty's next move?",
    fen: "r1b2r1k/1q2bpnp/p2p1n2/4p3/Np1NP1Q1/1B3P2/PPP1N1PP/R4RK1 w - - 0 20",
    hint: "Attack the Queen once more to force it into a passive position.",
    solution: "Ng4",
  },
  {
    move: "20. Qg3",
    player: "White",
    explanation:
      "White plays Qg3. Find Black's third consecutive Queen-attacking move.",
    fen: "r1b2r1k/1q2bpnp/p2p4/4p3/Np2P1n1/1B3PQ1/PPP1N1PP/R4RK1 b - - 3 20",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qg3",
  },
  {
    move: "20... Nh5",
    player: "Black",
    explanation:
      "Nh5. Narayanan retreats the Queen with 21. Qe1. Canty must now play a forcing check. What is Canty's move?",
    fen: "r1b2r1k/1q2bpnp/p2p1n2/4p3/Np1NP2Q/1B3P2/PPP1N1PP/R4RK1 w - - 0 21",
    hint: "It’s really annoying to have the queen on the same side as the king. Let’s try to kick it out of this place.",
    solution: "Nh5",
  },
  {
    move: "21. Qe1",
    player: "White",
    explanation:
      "White plays Qe1. Canty continues the forcing line with a check.",
    fen: "r1b2r1k/1q2bp1p/p2p4/4p2n/Np2P1n1/1B3P2/PPP1N1PP/R3QRK1 b - - 5 21",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qe1",
  },
  {
    move: "21... Qa7+",
    player: "Black",
    explanation:
      "Qa7+. Narayanan moves the King to 22. Kh1. Canty now plays the final move of the sequence, attacking the Queen's defense. What is Canty's move?",
    fen: "r1b2r1k/q3bpnp/p2p1n2/4p2n/Np1NP3/1B3P2/PPP1N1PP/R4RK1 w - - 1 22",
    hint: "Let’s try to confine the king to the corner. It will come in handy in the future.",
    solution: "Qa7+",
  },
  {
    move: "22. Kh1",
    player: "White",
    explanation:
      "White plays Kh1. Find Black's move to complete the winning sequence.",
    fen: "r1b2r1k/q3bp1p/p2p4/4p2n/Np2P1n1/1B3P2/PPP1N1PP/R3QR1K b - - 7 22",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Kh1",
  },
  {
    move: "22... Ne3",
    player: "Black",
    explanation:
      "Ne3. This attacks the Queen and the f3 pawn, leaving Narayanan in a miserable position. Narayanan plays 23. Rg1 to protect the rook. Canty now wants to offer an exchange to remove defenses of the c2 square. **What did Canty play in this position? (Part 11)**",
    fen: "r1b2r1k/q3bpnp/p2p1n2/4p2n/Np1NP3/1B2n3/PPP1N1PP/R4RQK w - - 2 23",
    hint: "Let’s try to confine the king to the corner. It will come in handy in the future.",
    solution: "Ne3",
  },
  // --- START of Part 11 Sequence ---
  {
    move: "23. Rg1",
    player: "White",
    explanation:
      "White plays Rg1. Find Canty's move to prepare the removal of the c2 square's defense.",
    fen: "r1b2r1k/q3bp1p/p2p4/4p2n/Np2P3/1B2nP2/PPP1N1PP/R3Q1RK b - - 9 23",
    hint: "Look for a square that prepares an exchange on the long diagonal (a6-f1 or a7-g1).",
    solution: "Rg1",
  },
  {
    move: "23... Be6",
    player: "Black",
    explanation:
      "This offers to exchange with the Bishop on b3, a key defender of the c2 square.",
    fen: "r1b2r1k/q3bpnp/p2p1b2/4p2n/Np1NP3/1B2n3/PPP1N1PP/R4RQK w - - 4 24",
    hint: "Look for a square that prepares an exchange on the long diagonal (a6-f1 or a7-g1).",
    solution: "Be6",
  },
  {
    move: "24. g4",
    player: "White",
    explanation:
      "White plays Nf5. Now, play the move that removes the defense of c2.",
    fen: "r4r1k/q3bp1p/p2pb3/4p2n/Np2P1P1/1B2nP2/PPP1N2P/R3Q1RK b - g3 0 24",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nf5",
  },
  {
    move: "24... Bxb3",
    player: "Black",
    explanation:
      "Bo6. This attacks the Bishop on b3. Narayanan captures 25. axb3.",
    fen: "r1b2r1k/q4pnp/p2pbb2/4pN1n/Np1NP3/1B2n3/PPP1N1PP/R4RQK w - - 6 25",
    hint: "Think about which piece can take advantage of the c2 square for what tactic. (Hint from image)",
    solution: "Bxb3",
  },
  {
    move: "25. axb3",
    player: "White",
    explanation: "White plays axb3. Find Black's move to win material.",
    fen: "r4r1k/q3bp1p/p2p4/4p2n/Np2P1P1/1P2nP2/1PP1N2P/R3Q1RK b - - 0 25",
    hint: "The move involves a capture.",
    solution: "axb3",
  },
  {
    move: "25... Nxc2",
    player: "Black",
    explanation:
      "Bxb3. Canty recaptures the Bishop. Narayanan plays Nxc2. This move forks the Queen on e1 and Rook on a1",
    fen: "r1b2r1k/q4pnp/p2p1b2/4pN1n/Np1NP3/1B2n3/PPP1N1PP/R4RQK w - - 0 25",
    hint: "think about which piece can take advantage of the c2 square for what tactic.",
    solution: "Nxc2",
  },
  {
    move: "26. Qd2 ",
    player: "White",
    explanation: "White plays Qd2. Find Black's winning move.",
    fen: "r4r1k/q3bp1p/p2p4/4p2n/Np2P1P1/1P3P2/1PnQN2P/R5RK b - - 1 26",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Qd2",
  },
  {
    move: "26... Nxa1",
    player: "Black",
    explanation:
      "Canty captures the rook with a knight, ultimately winning more material. Remember, rooks are more valuable than knights.",
    fen: "r4r1k/q3bp1p/p2p4/4p2n/Np2P1P1/1P3P2/1P1QN2P/n5RK w - - 0 27",
    hint: "There is a hanging piece. Capture it",
    solution: "Nxa1",
  },
  {
    move: "27. gxh5 Nxb3 28. Qh6 ",
    player: "White",
    explanation:
      "Narayan eventually plays the sequence 27. gxh5 Nxb3 28. Qh6. Pay attention to how the queen and rook are positioned How did Canty prevent checkmate in this position?",
    fen: "r4r1k/q3bp1p/p2p3Q/4p2P/Np2P3/1n3P2/1P2N2P/6RK b - - 1 28",
    hint: "White's move has been played. Click Next Move to continue.",
    solution: "Nxa1",
  },
  {
    move: "27... Rg8",
    player: "Black",
    explanation:
      "This prevents the immediate checkmate threat (Qg4#) and defends the King's position. Due to being down so much material and having fewer active pieces to checkmate efficiently, Narayanan resigned.",
    fen: "r1b2r1k/q4pnp/p2p1b2/4pN1n/Np1NP3/1B2n3/PPP1N1PP/R4RQK w - - 0 25",
    hint: "Pay attention to how the rook on g7 and queen on h6 are positioned at. Big hint: there is a Qg7# threat.",
    solution: "Rg8",
  },
];

// =========================================================
// 3. MAIN LESSON COMPONENT
// =========================================================
function CantyvNarayan() {
  const [game, setGame] = useState(new Chess(STARTING_FEN));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonMessage, setLessonMessage] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // This state tracks if we just displayed White's move and are waiting for the second click
  const [isAwaitingUserClick, setIsAwaitingUserClick] = useState(false);

  // Set initial feedback to the introductory scenario
  const [feedback, setFeedback] = useState(INITIAL_SCENARIO);

  const lesson = GAME_LESSON_MOVES[currentLessonIndex];
  const localUrl = "http://localhost:8085/";
  const url = localUrl;

  // --- NEW FUNCTION: Called by Chessboard when the user plays the correct Black move ---
  const handleCorrectMove = useCallback(
    (move) => {
      // 1. Display success message showing the correct move and the explanation
      setLessonMessage({
        type: "success",
        text: `Correct! Black played ${move}.`,
        explanation: lesson.explanation,
      });
      setFeedback(""); // Clear main feedback box

      // 2. Allow continuation
      setShowContinue(true);
      // Note: Do NOT set isAwaitingUserClick here. That is set only after White's move is processed.
    },
    [lesson]
  );

  useEffect(() => {
    // --- Logic for User's Turn (Black's turn) ---
    if (lesson && lesson.player === "Black" && game.turn() === "b") {
      // Set the message to the current question/instruction
      setLessonMessage({
        type: "instruction",
        text: `Your turn (Black). Find the correct move.`,
        // For Black's move, the *question* is in the main feedback box,
        // and the explanation is shown AFTER the correct move (via handleCorrectMove).
        explanation: `Find the move`,
      });

      // Update feedback box only if it's the very first move or if coming from a White move
      if (currentLessonIndex === 0 || isAwaitingUserClick) {
        setFeedback(INITIAL_SCENARIO);
      } else {
        // If coming from a White move, the feedback was cleared, so we need to set the next question
        const previousLesson = GAME_LESSON_MOVES[currentLessonIndex - 1];
        if (previousLesson && previousLesson.player === "White") {
          setFeedback(previousLesson.explanation);
        }
      }

      // Ensure controls are reset for user input
      setShowContinue(false);
      setIsAwaitingUserClick(false);
      setShowHint(false);
      setShowSolution(false);
    }
  }, [currentLessonIndex, lesson, game, isAwaitingUserClick]); // Added isAwaitingUserClick as dependency

  const advanceLesson = async () => {
    const nextIndex = currentLessonIndex + 1;

    // Check if there are more moves in the lesson array
    if (nextIndex < GAME_LESSON_MOVES.length) {
      const nextLesson = GAME_LESSON_MOVES[nextIndex];

      if (nextLesson.player === "White") {
        const tempGame = new Chess(nextLesson.fen);
        setGame(tempGame);

        setLessonMessage({
          type: "info",
          text: `White played ${nextLesson.move.split(" ")[0]}.`,
          explanation: nextLesson.explanation,
        });

        const finalIndex = nextIndex + 1;
        if (finalIndex < GAME_LESSON_MOVES.length) {
          setCurrentLessonIndex(finalIndex);
        } else {
          // This case handles if White makes the absolute last move of the array
          await saveProgress();
          setGameEnded(true);
        }

        setShowContinue(false);
        setFeedback(nextLesson.explanation);
      } else {
        setCurrentLessonIndex(nextIndex);
        setShowContinue(false);
      }
    } else {
      // 2. TRIGGER SAVE: No more moves left, lesson is finished
      await saveProgress();
      setGameEnded(true);
      setLessonMessage({
        type: "info",
        text: "Lesson Complete!",
      });
      setShowContinue(false);
    }

    setShowHint(false);
    setShowSolution(false);
  };

  // 3. Extracted Save Logic for cleaner code
  const saveProgress = async () => {
    const lessonId = "magnus_v_sina"; // Ensure this matches your expected ID
    const token = localStorage.getItem("token")?.trim();

    if (token) {
      try {
        const response = await fetch(`${url}api/progress/complete/${lessonId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          console.log("Progress saved successfully!");
        } else {
          console.error("Failed to save progress. Status:", response.status);
        }
      } catch (err) {
        console.error("Error connecting to progress API:", err);
      }
    } else {
      console.warn("No token found. Progress not saved.");
    }
  };
  const toggleHint = () => {
    setShowHint((prev) => !prev);
    if (!showHint) setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution((prev) => !prev);
    if (!showSolution) setShowHint(false);
  };
  const clearFeedback = () => setFeedback("");

  return (
    <div
      className="page-container"
      style={{
        margin: 0,
        padding: 20,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#1e1e1e",
        color: "#eee",
      }}
    >
      <div
        className="game-area"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div
          className="main-title"
          style={{
            fontSize: 36,
            fontWeight: "bold",
            width: 320,
            lineHeight: 1.2,
            marginBottom: 20,
            textAlign: "center",
            color: "#eee",
          }}
        >
          Canty vs. Narayanan
          <br />
          (Interactive Lesson - **Playing Black**)
        </div>

        {/* CORRECT AND ONLY CHESSBOARD INSTANCE */}
        <Chessboard
          game={game}
          setGame={setGame}
          currentLessonIndex={currentLessonIndex}
          lessonMoves={GAME_LESSON_MOVES}
          setLessonMessage={setLessonMessage}
          // PASS NEW HANDLER DOWN: This is the critical piece the Chessboard must call on correct move.
          handleCorrectMove={handleCorrectMove}
          setShowContinue={setShowContinue}
          showContinue={showContinue}
          clearFeedback={clearFeedback}
          // The Chessboard must call handleCorrectMove(move) upon a correct move.
        />
      </div>

      {/* FEEDBACK AND MESSAGE AREA (Used for Scenario/Question) */}
      {feedback && (
        <div
          className="feedback-box"
          style={{
            background: "#1976d2",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            marginTop: "16px",
            fontSize: "1.1em",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
            maxWidth: "400px",
            textAlign: "left",
          }}
          dangerouslySetInnerHTML={{ __html: feedback }}
        />
      )}

      {/* LESSON MESSAGE AREA (Used for Success/Error/Info/White Move) */}
      {lessonMessage && (
        <div
          className={`lesson-message ${lessonMessage.type}`}
          style={{
            marginTop: 20,
            maxWidth: 700,
            padding: 12,
            backgroundColor:
              lessonMessage.type === "error"
                ? "#8b0000"
                : lessonMessage.type === "success"
                  ? "#006400" // Green for success (Black's move explanation)
                  : lessonMessage.type === "info"
                    ? "#004080" // Blue for White's move
                    : "#1976d2",
            borderRadius: 8,
          }}
        >
          <strong>{lessonMessage.text}</strong>
          {lessonMessage.explanation && (
            <p style={{ marginTop: 8 }}>{lessonMessage.explanation}</p>
          )}
        </div>
      )}

      {/* HINT & SOLUTION BUTTONS - Only show for Black puzzle errors */}
      {lessonMessage?.type === "error" && (
        <div
          className="hint-solution-buttons"
          style={{ marginTop: 10, display: "flex", gap: 10 }}
        >
          <button
            onClick={toggleHint}
            style={{
              backgroundColor: showHint ? "#646401ff" : "#646401ff",
              color: "#eee",
              padding: "8px 12px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          <button
            onClick={toggleSolution}
            style={{
              backgroundColor: showSolution ? "#009b39ff" : "#009b39ff",
              color: "#eee",
              padding: "8px 12px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
            }}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>
      )}

      {/* HINT & SOLUTION TEXT */}
      {showHint && lessonMessage?.type === "error" && (
        <div
          className="hint-text"
          style={{
            marginTop: 10,
            maxWidth: 700,
            padding: 12,
            backgroundColor: "#646401ff",
            borderRadius: 8,
            fontStyle: "italic",
          }}
        >
          <strong>Hint:</strong> {lesson.hint}
        </div>
      )}
      {showSolution && lessonMessage?.type === "error" && (
        <div
          className="solution-text"
          style={{
            marginTop: 10,
            maxWidth: 700,
            padding: 12,
            backgroundColor: "#009b39ff",
            borderRadius: 8,
            fontStyle: "italic",
          }}
        >
          <strong>Solution:</strong> {lesson.solution}
        </div>
      )}

      {/* CONTINUE / NEXT MOVE BUTTON - Only visible after a successful Black move */}
      {showContinue && !gameEnded && (
        <button
          onClick={advanceLesson}
          style={{
            marginTop: 20,
            backgroundColor: "#0055cc",
            color: "#fff",
            borderRadius: 6,
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Next Move
        </button>
      )}

      {/* GAME END MESSAGE */}
      {gameEnded && (
        <div
          style={{
            marginTop: 30,
            fontSize: 18,
            fontWeight: "bold",
            color: "#aaffaa",
          }}
        >
          Lesson Complete!
        </div>
      )}
    </div>
  );
}

export default CantyvNarayan;
