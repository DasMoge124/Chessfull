import React from "react";
import { useNavigate } from "react-router-dom";
import KnightBetter from "./Images/KnightBetter.png";
import BishopBetter from "./Images/BishopBetter.png";
import TwoRooksBetter from "./Images/TwoRooksBetter.png";
import QueenBetter from "./Images/QueenBetter.png";
import OCBAdvantage from "./Images/OCBAdvantage.png";

import "./lesson.css";

const Imbalances = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-container">
      <h1><br/><br/>Imbalances</h1>
      <h2>What is an imbalance?</h2>
      <p>
        An imbalance in chess is a situation in which White and Black have different pieces.
        <br/>
        For example, if White has a Bishop and Black has a Knight, then there is an imbalance in the position.
        <br/>There are many types of imbalances, but the most common include:
        Bishop vs Knight, Opposite colored bishops, Queen vs 2 Rooks

      </p>
      <h2>Bishop vs Knight</h2>
      <p>
        For Bishop vs Knight imbalances, there are several key characteristics of a position to determine which player has the upper hand.
        <br/>
        If the position is open, then the player with the Bishop usually has the advantage, as the Bishop can control long diagonals.
        <br/>
        If the position is closed, then the player with the Knight usually has the advantage, as the Knight can jump over pieces.
        <br />
        Additionally, Knight's love it when they can control outposts (a location where the Knight cannot get attacked), and Bishops love it when they have many targets and have free range
        Here are two examples that elucidate this concept:

        <br/>
       

      </p>
                    <h4>Example 1</h4>
        <img className="najdorf" src={KnightBetter} alt="Chess players" />
      <p>
        In this position, White has a Knight and Black has a Bishop.
        
        Now, we need to determine which piece is better:
        
        <br/>
        This position is closed, which means Knights are generally better
        <br/>
        Additionally, the Bishop lacks mobility and doesn't have any targets it can attack
        <br/>
        Finally, White's Knight has delicious outposts on c5 and e5 and White can attack Black's pawn on a4.
        <br/>
        Therefore, we conclude in this example that White's Knight is better than Black's Bishop

      </p>
            <h4>Example 2</h4>
        <img className="najdorf" src={BishopBetter} alt="Chess players" />

      <p>
        In this position, White has a Bishop and Black has a Knight.
        
        Which one is better? Let's see ...

        <br/>
        This position is mostly open, so Bishops generally have the advantage in this scenario
        <br/>
        Also, the Bishop has many targets it can attack, such as b5 and g6
        <br/>
    Black's Knight does have a possible outpost on g4. However, Black's Knight won't actually be able to occupy that square since it will spend all its time defending the g6 pawn. After all, if it moves away, White's Bishop can take that pawn.
        <br/>
        Therefore, we conclude in this example that White's Bishop is better than Black's Knight
      </p>
            <h2>Queen vs Two Rooks</h2>

      
      <p>
        For a Queen versus two rooks, many factors are involved in determining which has the upper hand.
        <br/>One of them is mobility - the Queen will have the advantage if it is active, and the rooks likewise.
        <br/>Another is coordination - if the Rooks are coordinated, they will attack better
        
        <br/>The third is King safety - the Queen is very good at giving checks. If the person with the Rooks has an exposed King, more often than not the person with the Queen will have an advantage
        <br/>
        The fourth is passed pawns - if the side with the Queen has passed pawns, its a huge advantage for them. The same cannot be said for the two Rooks - having passed pawns when you have two Rooks isn't as beneficial
      </p>
      <p>
        Here are some examples to help you better understand:
      </p>
      <h4> Example 1 </h4>
      <img className="najdorf" src={TwoRooksBetter} alt="Chess players" />
        <p> 
            In this position, White has a Queen and Black has two rooks. Which side has a better position?
            <br/>
            Well, let's see...
            <br/>
            White's Queen isn't active; its stuck defending the f2 pawn.
                <br/>
            However, Black's Rooks are very active, as they are attacking White's f2 pawn.
            <br/>
            Additionally, Black's rooks have good coordination, as they are defending each other and attacking.
            <br/>
            White's King is very safe, but Black's King is very safe as well.
            <br/>
            No side has any passed pawns.
            <br/>
            Therefore, we conclude that Black has the upper hand in this position.
            
            </p>
                  <h4> Example 2 </h4>

              <img className="najdorf" src={QueenBetter} alt="Chess players" />
        <p>
        In this position, White has a Queen and Black has two Rooks.
        <br/>
        Who has the better position?
        Let's see ...
        <br/>
        White's Queen is very active; it has the ability to give checks to the Black King and is restricting Black's Rooks
                <br/>
            However, Black's Rooks are very passive; they aren't doing anything. Specifically, that Rook on h6 is just staring at his own pawns!
            <br/>
            Additionally, Black's rooks are not coordinated - they are all over the place!
            <br/>
            White's King is VERY safe, but Black's King is very open and prone to checks!
            <br/>
            White (who has the Queen) has passed pawns. Black has none. 
            <br/>
            Therefore, we conclude that White has the upper hand in this position.
            


        </p>
        <h2>Opposite Colored Bishops</h2>
        <p>
        Opposite colored bishop endgames are a special type of imbalance - they are known for being extremely drawish. This is because White's bishop and Black's bishop can never interact with each other, as they are on different colored squares.

        <br/>
        However, occasionally, one side can have the advantage. This can happen if one side is more active than the other, has more passed pawns than the other, or has more pawns it can target. Here is an example:


        </p>
                <h4> Example </h4>
        <img className="najdorf" src={OCBAdvantage} alt="Chess players" />
        <p>
        In this position, there are opposite colored bishops. Despite that, White is better. Here's why:

        Firstly, Black is in a very passive position. Their Bishop is stuck preventing White's a5 pawn from promoting, and Black's King cannot really do anything.
        <br/>
        On the other hand, White's Bishop has a lot of mobility and White's King can move around to attack pieces; e.g. the pawn on c6
        <br/>
        Also, Black's Bishop has no targets to attack. However, White's Bishop can attack Black's pawn on f6
        <br/>
        Finally, White has one passed pawn, but Black has zero.
        <br/>
        Therefore, we conclude that White is better in this position. 


        </p>
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")}>
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default Imbalances;
