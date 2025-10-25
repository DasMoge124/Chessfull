const STARTING_FEN =
  "r1b1k2r/ppq2p1p/2nbpnp1/1B1pN3/3P2P1/2P1B3/PP1N1P1P/R2QK2R w KQkq - 3 12";

export const GAME_LESSON_MOVES = [
  {
    move: "12. Qf3",
    player: "White",
    explanation:
      "Developing a piece and winning a tempo by attacking the knight on d6...",
    fen: "r1b2rk1/p1q1ppbp/1p4p1/2p1P3/8/2PBBN2/PP3PPP/R2Q1RK1 b - - 0 12",
    hint: "Try to put pressure on the knight on d6.",
    solution: "The correct move is Qf3, attacking the knight and developing.",
  },
  {
    move: "13. dxe5 Qxe5 14. O-O-O Ke7 15. Bxc6 bxc6",
    player: "Black",
    explanation: "Black plays 13...Qe5 but could have defended better.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3pq3/6P1/2P1BQ2/PP1N1P1P/2KR3R w - - 0 16",
    hint: "Black should look to improve king safety.",
    solution:
      "Black played Qe5, but a better defensive move was possible to avoid loss of material.",
  },
  {
    move: "16. Bd4",
    player: "White",
    explanation: "Strong tactical Bd4 hitting queen + rook.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
    hint: "Look for pins and attacks on high-value pieces.",
    solution: "Bd4 is a strong move pinning Black’s queen to the rook.",
  },
  {
    move: "17. Qg5",
    player: "Black",
    explanation: "Find the final blow",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2P1/2P2Q2/PP1N1P1P/2KR3R w - - 2 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
  {
    move: "18. h4",
    player: "White",
    explanation:
      "The final blow! Threatens queen, rook, knight. Black resigned.",
    fen: "r1b4r/p3kp1p/2p1pnp1/3p2q1/3B2PP/2P2Q2/PP1N1P2/2KR3R b - h3 0 17",
    hint: "Push pawns to open lines for attack.",
    solution: "h4 threatens to open lines and forces Black’s resignation.",
  },
];
