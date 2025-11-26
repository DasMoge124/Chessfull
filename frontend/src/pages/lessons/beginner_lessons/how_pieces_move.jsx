import React from "react";
import kingImage from "./Images/king.png";
import knightImage from "./Images/knight.png";
import rooksImage from "./Images/rooks.png";
import bishopsImage from "./Images/bishops.png";
import queenImage from "./Images/queen.png";
import pawnOneImage from "./Images/pawnOne.png";
import pawnTwoImage from "./Images/pawnTwo.png";
import promoOne from "./Images/queen_promotion.gif";
import promoTwo from "./Images/knight_promo.gif";
import kingsidecastling from "./Images/kingside_castling.gif";
import queensidecastling from "./Images/queenside_castling.gif";
import enPassantImage from "./Images/en_passant.png";
import { useNavigate } from "react-router-dom";

function how_pieces_move() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>How each piece moves</h1>
      <p>In this section, you will learn how the pieces move. </p>
      <p>
        Each piece has its own unique movement and value - the value of each
        piece is set up as the number of points in material.
      </p>
      <h2>Kings</h2>
      <p>
        The King is the most important piece in the game. If the king has no
        possible way to escape an attack in the next turn, the game is lost.
      </p>
      <p>
        {" "}
        It can move to any adjacent square. Specifically, the king can move only
        one square in any direction.
      </p>
      <p>
        The kings tend to be more involved in the later stage of the game. You
        will see why eventually.{" "}
      </p>
      <p>
        But most of the time, players keep the kings in safe, closed positions
        and don't use them often. Also, an attack on the king is called a{" "}
        <b>check</b>. In the image below, the king can move to any of the dotted
        squares on the next turn.
      </p>
      <div className="image-container">
        <img src={kingImage} alt="How King moves" />
      </div>
      <h2>Rooks</h2>
      <p>
        Rooks are a powerful piece that move in straight lines. Rooks are worth
        5 points in material. In the image below, the rook can move to any
        square highlighted in one turn.
      </p>
      <div className="image-container">
        <img src={rooksImage} alt="How Rook moves" />
      </div>
      <h2>Bishops</h2>
      <p>
        There are 2 bishops per player, one on a dark square and one on a light
        square. They can only move diagonally given the color squares they are
        assigned. The bishop below can move to all of these squares on the next
        turn. Notice how this bishop will never be able to move to a dark square
        such as a1. Also, bishops are worth 3 points in material. Bishops tend
        to be better utilized when placed in the center or paired together to
        cover both color complexes.
      </p>
      <div className="image-container">
        <img src={bishopsImage} alt="How Bishop moves" />
      </div>
      <h2>Queens</h2>
      <p>
        The queen is the most powerful piece in the game; only 1 is given to
        each player at the start of a match. It has the abilities of both a rook
        and a bishop. In the image below, it can move to these highlighted
        squares on the next turn. Also, the queen is worth 9 points in material.
      </p>
      <div className="image-container">
        <img src={queenImage} alt="How Queen moves" />
      </div>
      <h2>Knights</h2>
      The knight is a tricky piece. It is the only one in the game with the
      ability to move unobstructed by other pieces. It moves in an L shape and
      can move to any of the highlighted squares below on the next turn in the
      image below. Also, the knight is worth 3 points in material. Knights tend
      to do better when placed in the center of the board and can operate well
      in closed positions.
      <div className="image-container">
        <img src={knightImage} alt="How Knight moves" />
      </div>
      <h2>Pawns</h2>
      <p>
        The pawn is the piece of lowest value (worths 1 point in material) but a
        very high potential. There are 8 pawns per player at the start of a
        match. It can move only in a straight line forward, but can move
        diagonally forward one square if there is an enemy piece in the way.
      </p>
      <div className="image-container">
        <img src={pawnOneImage} alt="How Pawn1 moves" />
      </div>
      <p>
        The pawn can also move two squares forward if it hasn’t moved yet, a.k.a
        it is still on the second rank. It still has the ability to move only
        one square forward or capture diagonally.
      </p>
      <div className="image-container">
        <img src={pawnTwoImage} alt="How Pawn2 moves" />
      </div>
      <p>
        Once the pawn reaches the other side of a board, it promotes itself to
        either a queen (best choice in most cases), rook, bishop, or knight.
      </p>
      <p>
        The first gif on the left showcases a pawn promoting to a queen while
        the second gif on the right showcases a pawn promoting to a knight.
      </p>
      <div className="image-container">
        <img src={promoOne} alt="How Pawn2 moves" />
        <img src={promoTwo} alt="How Pawn3 moves" />
      </div>
      <h2>Castling</h2>
      <p>
        Castling is a special move that involves the king and one of the rooks.
        It is the only move in chess that allows a player to move two pieces in
        one turn.
      </p>
      <p>
        The primary purpose of castling is to safeguard the king and connect the
        rooks. There are two types of castling: kingside and queenside.
      </p>
      <h2>Kingside Castling</h2>
      <p>
        If the king and the rook closer to the king haven’t moved yet, the
        player can kingside castle, which moves the king two squares to the
        right and the rook to the square left of the king. This is usually done
        in games to protect the king, bringing it away from the center of the
        board where it’s vulnerable to the corner where it is safe, usually
        sheltered behind pawns for extra cover.
      </p>
      <div className="image-container">
        <img
          src={kingsidecastling}
          alt="How Kingside Castling works"
          width="500"
          height="600"
        />
      </div>
      <h2>Queenside Castling</h2>
      <p>
        If the king and the rook on the queen’s side of the board (or farther
        away from the king) haven’t moved yet, the player can queenside castle,
        which moves the king two squares to the left and the rook to the square
        right of the king. This also protects the king by moving it away from
        the center.
      </p>
      <h2>En Passant</h2>
      <p>
        Translating to ‘in passing’ in English, if a pawn on the second rank
        (hasn’t moved yet) moves forward 2 squares and is beside an enemy pawn,
        that pawn can capture the first by capturing diagonally.
      </p>
      <div className="image-container">
        <img
          src={enPassantImage}
          alt="How Kingside Castling works"
          width="500"
          height="600"
        />
      </div>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/beginner")}>
          Return to lessons page
        </button>
      </div>
    </div>
  );
}

export default how_pieces_move;
//2r1r1k1/pp3ppp/1q1p4/8/1p2Pn2/4QP2/PPP3PP/R4R1K b - - 6 20
