import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lesson.css";
import italianGame from "./Images/italian.png";
import twoKnights from "./Images/twoknights.png";
import guicoPiano from "./Images/GiuocoPiano.png";

const ItalianGame = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="lesson-container italian-game">
      {/* Hero Section */}
      <div className="lesson-hero">
        <h1><br/><br/>The Italian Game</h1>
        <p className="lesson-subtitle">Master One of Chess's Most Classical and Strategic Openings</p>
        <div className="opening-moves-notation">
          <span>1. e4 e5</span>
          <span>2. Nf3 Nc6</span>
          <span>3. Bc4</span>
        </div>
        <img src={italianGame} alt="Italian Game Opening" className="opening-diagram" />
      </div>

      {/* Introduction */}
      <section className="lesson-section intro-section">
        <div className="content-card">
          <h2>📜 A Timeless Opening</h2>
          <p>
            The Italian Game is one of the oldest and most respected chess openings, with analyses dating back to 1620 
            that remain relevant today. Popular among beginners for its straightforward development principles and favored 
            by Grandmasters for its strategic depth, this opening offers a rich battlefield for players at every level.
          </p>
          <div className="key-points">
            <div className="point">
              <span className="icon">🎯</span>
              <span>Control the center early</span>
            </div>
            <div className="point">
              <span className="icon">🏰</span>
              <span>Rapid piece development</span>
            </div>
            <div className="point">
              <span className="icon">⚔️</span>
              <span>Attack the weak f7 square</span>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Moves */}
      <section className="lesson-section">
        <h2>Opening Moves and Initial Setup</h2>
        <div className="content-card">
          <div className="move-explanation">
            <h3>The Foundation</h3>
            <ol className="chess-moves">
              <li>
                <strong>1. e4 e5</strong> - Both sides stake their claim in the center, controlling key central squares 
                and opening lines for piece development.
              </li>
              <li>
                <strong>2. Nf3 Nc6</strong> - White develops the knight, attacking Black's e5 pawn. Black defends with 
                Nc6, maintaining central control while developing.
              </li>
              <li>
                <strong>3. Bc4</strong> - The defining move of the Italian Game. White's bishop aims directly at f7, 
                Black's weakest square in the opening, defended only by the king.
              </li>
            </ol>
          </div>

          <div className="position-diagram">
            <div className="board-placeholder">
              {/* Chess board would be rendered here */}
              <div className="diagram-note">
                <p><strong>Position after 3. Bc4</strong></p>
                <p>White has completed three key opening principles: control the center (e4 pawn), develop pieces 
                toward the center (Nf3), and create immediate threats (Bc4 targeting f7).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black's Main Responses */}
      <section className="lesson-section">
        <h2>Black's Primary Defensive Systems</h2>

        {/* Two Knights Defense */}
        <div className="content-card expandable">
          <div className="card-header" onClick={() => toggleSection('twoKnights')}>
            <h3>⚔️ Two Knights Defense (3...Nf6)</h3>
            <img src={twoKnights} alt="Italian" className="opening-diagram"></img>
            <p><br/></p>
            <span className="expand-icon">{activeSection === 'twoKnights' ? '− (Click me to Collapse)' : '+ (Click me to Expand)'}</span>
          </div>
          {activeSection === 'twoKnights' && (
            <div className="card-content">
              <p>
                Black develops the knight to f6, attacking White's e4 pawn and adding another piece to the center. 
                However, this allows White to play the aggressive 4. Ng5, creating tactical complications.
              </p>
              <div className="tactical-note warning">
                <strong>⚠️ Caution:</strong> After 3...Nf6 4. Ng5, Black must navigate carefully. White threatens 
                Nxf7, and the position becomes sharp and tactical.
              </div>
              <h4>Alternatives to Avoid Ng5</h4>
              <ul>
                <li><strong>3...h6</strong> - Prevents Ng5 but weakens the kingside</li>
                <li><strong>3...Be7</strong> - Solid development, preparing to castle</li>
              </ul>
              <p className="strategic-insight">
                Both moves can be met by 4. d4, giving White a strong initiative and central control. For this reason, 
                many players prefer Black's most solid response: 3...Bc5.
              </p>
            </div>
          )}
        </div>

        {/* Bishop c5 Response */}
        <div className="content-card expandable">
          <div className="card-header" onClick={() => toggleSection('bishopC5')}>
            <h3>🛡️ The Giuoco Piano (3...Bc5)</h3>
            <img src={guicoPiano} alt="Italian" className="opening-diagram"></img>
            <p><br/></p>
            <span className="expand-icon">{activeSection === 'bishopC5' ? '−' : '+'}</span>
          </div>
          {activeSection === 'bishopC5' && (
            <div className="card-content">
              <p>
                Black actively develops the dark-squared bishop to c5, mirroring White's setup and fighting for control 
                over the crucial d4 square. This is considered Black's most solid and principled response.
              </p>
              
              <div className="tactical-note success">
                <strong>✓ Key Insight:</strong> After 3...Bc5, the aggressive 4. Ng5 doesn't work! Black simply plays 
                4...Qxg5, winning the knight because the queen on d8 can capture on g5.
              </div>

              <h4>Main Continuations</h4>
              <div className="variations">
                <div className="variation">
                  <h5>4. c3 - The Classical Approach</h5>
                  <p>
                    White prepares d4, aiming to build a strong pawn center. This leads to the main lines of the 
                    Giuoco Piano, where both sides fight for central control with d4 and d5 breaks being critical.
                  </p>
                  <ul className="sub-variations">
                    <li>After 4. c3 Nf6 5. d4 exd4 6. cxd4, White achieves a two-pawn center</li>
                    <li>Black often counters with ...Bb4+ or ...d5 to challenge White's center</li>
                  </ul>
                </div>

                <div className="variation">
                  <h5>4. d3 - The Quiet Italian</h5>
                  <p>
                    A solid, positional approach. White supports the center without forcing immediate confrontation. 
                    This can transpose into slow maneuvering games where subtle positional understanding becomes crucial.
                  </p>
                  <div className="strategic-insight">
                    <strong>Strategic Plan:</strong> After 4. d3 Nf6 5. Nc3, both sides develop naturally, often 
                    followed by castling and gradual central expansion.
                  </div>
                </div>

                <div className="variation">
                  <h5>4. b4 - The Evans Gambit</h5>
                  <p>
                    An aggressive pawn sacrifice! White offers the b4 pawn to deflect Black's bishop from c5, gaining 
                    rapid development and central control in return. This gambit leads to sharp, tactical play.
                  </p>
                  <div className="tactical-note warning">
                    <strong>Evans Gambit:</strong> After 4. b4 Bxb4 5. c3, White gains a powerful center and rapid 
                    piece development. Black must respond energetically to avoid being overwhelmed.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Strategic Themes */}
      <section className="lesson-section">
        <h2>🎯 Key Strategic Themes and Concepts</h2>

        <div className="content-card">
          <h3>Development Principles</h3>
          <div className="principles-grid">
            <div className="principle">
              <div className="principle-icon">👶</div>
              <h4>Beginner's Approach</h4>
              <ul>
                <li>Develop pieces rapidly toward the center</li>
                <li>Castle early for king safety</li>
                <li>Control central squares (e4, e5, d4, d5)</li>
                <li>Don't move the same piece twice in the opening</li>
              </ul>
            </div>

            <div className="principle">
              <div className="principle-icon">⏳</div>
              <h4>Advanced: Delayed Castling</h4>
              <ul>
                <li>In slower variations, delaying castling maintains flexibility</li>
                <li>You can choose which side to castle based on White's setup</li>
                <li>Prevents tactical vulnerabilities from premature castling</li>
                <li>Allows central pawn breaks without weakening the king</li>
              </ul>
            </div>
          </div>

          <div className="tactical-note info">
            <strong>⚠️ Important Warning:</strong> Automatic castling can lead to disaster! Always assess whether 
            castling exposes your king to immediate threats. For example, if White has Bg5 pinning your knight to the 
            queen, castling may invite Nd5 with devastating effect.
          </div>
        </div>

        <div className="content-card">
          <h3>The Battle for d4</h3>
          <p>
            Throughout the Italian Game, the d4 square becomes a critical battleground. Both sides fight for control 
            of this square, as it represents the key to central expansion and piece activity.
          </p>
          
          <div className="strategic-points">
            <div className="point-item">
              <strong>White's Perspective:</strong> Playing d4 opens the position and activates the pieces. White often 
              supports this with c3 or aims for it after piece development with d3.
            </div>
            <div className="point-item">
              <strong>Black's Perspective:</strong> Black fights against d4 with ...Bc5 (controlling d4), and often 
              responds to d4 with ...exd4, followed by central counterplay with ...d5.
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>Piece Coordination and Pins</h3>
          <p>
            The Italian Game features rich tactical motifs involving pins and piece coordination. Understanding these 
            patterns is essential for both sides.
          </p>

          <h4>Common Tactical Patterns</h4>
          <div className="tactics-list">
            <div className="tactic">
              <span className="tactic-name">Bishop Pins:</span>
              <span className="tactic-desc">Bg5 pinning the knight on f6 to the queen is a recurring theme. Black 
              can counter with ...h6 or ...Be7.</span>
            </div>
            <div className="tactic">
              <span className="tactic-name">Knight Forks:</span>
              <span className="tactic-desc">Nd5 often creates multiple threats, attacking the bishop on c5 and 
              threatening forks on c7 or f6.</span>
            </div>
            <div className="tactic">
              <span className="tactic-name">Bishop Pressure:</span>
              <span className="tactic-desc">The bishops on c4 and c5 eye the f7 and f2 squares respectively, creating 
              constant pressure.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Positions and Tactics */}
      <section className="lesson-section">
        <h2>💥 Critical Tactical Complications</h2>

        <div className="content-card">
          <h3>The Danger of Premature Castling</h3>
          <p>
            One of the most instructive lessons from the Italian Game is understanding when NOT to castle. Let's examine 
            a critical tactical sequence that punishes automatic castling.
          </p>

          <div className="tactical-sequence">
            <h4>Example: After 4. d3 Nf6 5. Nc3 d6</h4>
            <p className="setup-text">
              If White now plays 6. Bg5 (pinning the knight) and Black castles automatically with 6...O-O?, White can 
              unleash a devastating tactical blow:
            </p>
            
            <div className="move-sequence">
              <div className="sequence-step">
                <strong>7. Nd5!</strong> - Attacking the pinned knight and threatening Nxc7
              </div>
              <div className="sequence-step">
                <strong>7...Nxd5 8. exd5</strong> - White opens the e-file toward Black's king
              </div>
              <div className="sequence-step">
                <strong>8...Bg4?</strong> (trying to create counterplay)
              </div>
              <div className="sequence-step">
                <strong>9. h3 Bh5 10. Bh4!</strong> - Maintaining the pin
              </div>
            </div>

            <div className="tactical-note warning">
              <strong>The Tactic:</strong> If Black continues carelessly, White can play Bxf7+! followed by tactical 
              combinations exploiting the exposed king. The key lesson: don't castle into danger!
            </div>

            <h4>Proper Defense</h4>
            <p>
              Instead of castling, Black should play <strong>6...h6!</strong>, challenging the bishop. After 7. Bxf6 
              Qxf6, Black has the bishop pair and a solid position. If White retreats 7. Bh4, Black can continue with 
              7...g5 8. Bg3, and the position remains balanced.
            </p>
          </div>
        </div>

        <div className="content-card">
          <h3>Greco's Sacrifice - A Historical Lesson</h3>
          <p>
            The Italian Game has a rich tactical heritage. One famous pattern involves Greco's sacrifice, demonstrating 
            the principle of time and development over material.
          </p>

          <div className="greco-example">
            <h4>The Trap</h4>
            <p>After the moves: 1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O 
            Nxc3?! (greedy!) 9. bxc3 Bxc3?? (too greedy!)</p>
            
            <div className="tactical-note danger">
              <strong>White to play and win!</strong> After 10. Qb3! (attacking f7 and the bishop), Black is in serious 
              trouble. The position demonstrates that grabbing material while falling behind in development leads to 
              disaster.
            </div>

            <p className="lesson-text">
              If Black tries 10...d5 to block the attack on f7, White plays 11. Bxf7+! Kf8 (forced) 12. Bg5!, attacking 
              the queen. White threatens Qf7# and has overwhelming compensation for the piece due to Black's exposed 
              king and lack of development.
            </p>
          </div>

          <blockquote className="historical-quote">
            <p>
              "In the Italian Game, material is temporary, but a lead in development and piece coordination can be 
              permanent." - Classical Chess Wisdom
            </p>
          </blockquote>
        </div>
      </section>

      {/* Main Line Strategy */}
      <section className="lesson-section">
        <h2>📋 Main Line Plans and Ideas</h2>

        <div className="content-card">
          <h3>The c3-d4 System (Giuoco Piano)</h3>
          <p>
            After 1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3, White prepares the central thrust d4. This is the most 
            principled and testing line of the Italian Game.
          </p>

          <div className="plan-section">
            <h4>White's Plan</h4>
            <ul className="strategic-list">
              <li>Support d4 with the c3 pawn</li>
              <li>After 4...Nf6 5. d4 exd4 6. cxd4, establish a two-pawn center</li>
              <li>Develop with Nc3, supporting the center and preparing O-O</li>
              <li>Use the central space advantage to launch a kingside attack or queenside expansion</li>
              <li>Be prepared to sacrifice material (like in the Evans Gambit) for initiative</li>
            </ul>
          </div>

          <div className="plan-section">
            <h4>Black's Counterplay</h4>
            <ul className="strategic-list">
              <li>Challenge the center immediately with 6...Bb4+ or 6...d5</li>
              <li>The thematic ...d5 break is Black's main equalizing resource</li>
              <li>After exd5 Nxd5, Black achieves equality despite White's isolated d-pawn</li>
              <li>Develop pieces actively: Be6, Qd7, O-O-O in some lines</li>
              <li>Look for tactical opportunities based on White's loose d4 pawn</li>
            </ul>
          </div>

          <div className="critical-position">
            <h4>Critical Position After 4. c3 Nf6 5. d4 exd4 6. cxd4</h4>
            <p>
              This position is a crossroads. Black must choose how to challenge White's center:
            </p>
            <div className="options">
              <div className="option">
                <strong>6...Bb4+</strong> - Forces White to block with Bd2 or Nc3, disrupting development
              </div>
              <div className="option">
                <strong>6...Bb6</strong> - Maintains the bishop on the long diagonal, preparing ...d5
              </div>
              <div className="option recommended">
                <strong>6...d5!</strong> - The most direct challenge, striking at White's center immediately
              </div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>The d3 System (Quiet Italian)</h3>
          <p>
            After 4. d3, White chooses a slower, more positional approach. This leads to rich strategic play where 
            understanding typical plans is more important than concrete calculation.
          </p>

          <div className="quiet-italian-plans">
            <div className="side-plan">
              <h4>White's Strategic Ideas</h4>
              <ul>
                <li><strong>Nc3 and Bg5:</strong> Develop naturally and create pins</li>
                <li><strong>a4-a5 or h3:</strong> Gain space on the wings</li>
                <li><strong>Bb3:</strong> Secure the bishop on a good diagonal</li>
                <li><strong>Nbd2-Nf1-Ng3:</strong> Classic knight maneuver to support kingside play</li>
                <li><strong>Re1:</strong> Support the center and prepare d4 expansion</li>
              </ul>
            </div>

            <div className="side-plan">
              <h4>Black's Strategic Ideas</h4>
              <ul>
                <li><strong>d6 + Be6:</strong> Solid central control</li>
                <li><strong>a6 + Ba7:</strong> Secure the bishop and prepare ...b5</li>
                <li><strong>h6:</strong> Prevent Bg5 or prepare kingside expansion</li>
                <li><strong>Nh5-Nf4:</strong> Create kingside pressure</li>
                <li><strong>...c5 or ...c6+...d5:</strong> Central counterplay</li>
              </ul>
            </div>
          </div>

          <div className="strategic-insight">
            <strong>Key Concept:</strong> In the quiet Italian, both sides maneuver for optimal piece placement. 
            The player who better understands typical plans and maintains flexibility often gains the advantage. 
            This is not about forcing tactics but about subtle positional pressure.
          </div>
        </div>
      </section>

      {/* Modern Grandmaster Practice */}
      <section className="lesson-section">
        <h2>🏆 Modern Grandmaster Practice</h2>

        <div className="content-card">
          <h3>Why Grandmasters Love the Italian</h3>
          <p>
            In recent years, the Italian Game has experienced a renaissance at the highest levels. Many top players 
            have turned to it as a reliable weapon, especially as Black's defenses in the Ruy Lopez (particularly the 
            Berlin Defense and Marshall Attack) have become increasingly solid.
          </p>

          <div className="gm-insights">
            <div className="insight">
              <h4>Strategic Richness</h4>
              <p>
                The Italian offers a perfect blend of strategic and tactical play. Unlike some openings where concrete 
                preparation is everything, the Italian rewards general understanding and the ability to outmaneuver 
                opponents in complex middlegames.
              </p>
            </div>

            <div className="insight">
              <h4>Flexibility</h4>
              <p>
                White can choose between sharp attacking lines (Evans Gambit, c3-d4), positional squeeze (d3 systems), 
                or even transpositional possibilities. This flexibility makes it difficult for Black to prepare against.
              </p>
            </div>

            <div className="insight">
              <h4>Long-Term Advantages</h4>
              <p>
                Even in seemingly equal positions, White often maintains a slight space advantage and better piece 
                coordination. Against lower-rated players, this can be converted into persistent pressure and eventual 
                victory.
              </p>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>Key Modern Lines</h3>
          
          <div className="modern-line">
            <h4>The Bb3 Setup</h4>
            <p className="line-description">
              4. d3 Nf6 5. Bb3 - White immediately secures the light-squared bishop on b3, maintaining flexibility on 
              the a2-g8 diagonal. This has become one of the most popular grandmaster approaches.
            </p>
            <div className="line-plan">
              <strong>White's Plan:</strong> After ...d6 6. c3, White can expand with a4, push h3 to prevent ...Bg4, 
              develop with Nbd2, and eventually push d4 when the time is right. The bishop on b3 can later relocate 
              to c2 to support central or kingside operations.
            </div>
          </div>

          <div className="modern-line">
            <h4>The a6-Ba7 System for Black</h4>
            <p className="line-description">
              Black plays ...a6 followed by ...Ba7, securing the dark-squared bishop on an excellent diagonal while 
              preventing Bb5. This subtle but effective plan has become Black's main defensive resource.
            </p>
            <div className="line-plan">
              <strong>Black's Idea:</strong> With the bishop secure on a7, Black maintains flexibility in the center. 
              If White plays d4, the bishop is already well-placed. Black can then choose between ...d6 setups or even 
              ...d5 breaks depending on White's configuration.
            </div>
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="lesson-section">
        <h2>💡 Practical Tips and Common Mistakes</h2>

        <div className="tips-grid">
          <div className="tip-card success">
            <h3>✓ Do This</h3>
            <ul>
              <li>Control the center before expanding on the wings</li>
              <li>Delay castling if it exposes your king to immediate tactics</li>
              <li>Use the d5 (for Black) or d4 (for White) pawn break at the right moment</li>
              <li>Maintain tension - don't release it without a good reason</li>
              <li>Coordinate your pieces before launching an attack</li>
              <li>Study typical plans rather than memorizing long variations</li>
            </ul>
          </div>

          <div className="tip-card warning">
            <h3>✗ Avoid This</h3>
            <ul>
              <li>Castling automatically without checking for tactics</li>
              <li>Grabbing material while falling behind in development</li>
              <li>Moving the same piece multiple times in the opening</li>
              <li>Weakening your kingside with unnecessary pawn moves (h6, g5)</li>
              <li>Playing Ng5 when it loses a piece to ...Qxg5</li>
              <li>Ignoring your opponent's threats to pursue your own plan</li>
            </ul>
          </div>
        </div>

        <div className="content-card">
          <h3>Common Beginner Mistakes</h3>
          
          <div className="mistake">
            <h4>Mistake #1: Nxf7 Too Early</h4>
            <p>
              After Black castles, playing Nxf7 (sacrificing the knight) is tempting but usually unsound. Black 
              responds Rxf7, Bxf7+ Kxf7, and while White has two minor pieces for a rook and pawn, Black's king quickly 
              escapes to g8, and White has wasted precious time. Black's lead in development often proves decisive.
            </p>
            <div className="mistake-lesson">
              <strong>Lesson:</strong> Sacrifices must be based on concrete calculation, not hope. In the Italian, 
              development and piece coordination are more important than material in the opening phase.
            </div>
          </div>

          <div className="mistake">
            <h4>Mistake #2: Automatic Bg4 Pin</h4>
            <p>
              Black often plays ...Bg4 to pin White's knight, but this isn't always effective. If White has already 
              played c3, Black cannot add pressure with ...Nd4. White can simply play h3, forcing the bishop to make 
              a decision, and after ...Bh5, the bishop is often misplaced.
            </p>
            <div className="mistake-lesson">
              <strong>Lesson:</strong> Pins are only effective if you can increase the pressure. Check whether your 
              pin actually achieves something concrete before committing.
            </div>
          </div>

          <div className="mistake">
            <h4>Mistake #3: Ignoring Central Breaks</h4>
            <p>
              Both sides must be alert to central pawn breaks. For Black, missing the ...d5 break often allows White 
              to consolidate a comfortable advantage. For White, allowing ...d5 at the wrong moment can equalize 
              immediately.
            </p>
            <div className="mistake-lesson">
              <strong>Lesson:</strong> The center is the heart of the position. Always consider central pawn breaks 
              (...d5 for Black, d4 for White) before making quiet moves on the wings.
            </div>
          </div>
        </div>
      </section>

      {/* Summary and Next Steps */}
      <section className="lesson-section summary-section">
        <div className="content-card">
          <h2>✅ Summary: Mastering the Italian Game</h2>
          
          <div className="summary-points">
            <div className="summary-point">
              <span className="point-number">1</span>
              <div className="point-content">
                <h4>Understand the Opening Principles</h4>
                <p>
                  The Italian Game embodies classical chess principles: rapid development, central control, and king 
                  safety. Master these fundamentals and they'll serve you throughout your chess career.
                </p>
              </div>
            </div>

            <div className="summary-point">
              <span className="point-number">2</span>
              <div className="point-content">
                <h4>Choose Your Style</h4>
                <p>
                  Whether you prefer sharp tactics (Evans Gambit, c3-d4) or positional maneuvering (d3 systems), the 
                  Italian has a variation that suits your style. Experiment and find what works for you.
                </p>
              </div>
            </div>

            <div className="summary-point">
              <span className="point-number">3</span>
              <div className="point-content">
                <h4>Study Typical Plans</h4>
                <p>
                  Don't just memorize moves. Understand the plans: where pieces belong, when to break with d4 or d5, 
                  when to castle (or not to castle), and how to create and exploit weaknesses.
                </p>
              </div>
            </div>

            <div className="summary-point">
              <span className="point-number">4</span>
              <div className="point-content">
                <h4>Practice and Analyze</h4>
                <p>
                  Play the Italian Game regularly and analyze your games. You'll develop an intuition for the typical 
                  positions and patterns that arise, making you a much stronger player overall.
                </p>
              </div>
            </div>
          </div>

          <blockquote className="final-quote">
            <p>
              "The Italian Game is a rich opening that can be utilized throughout one's chess-playing life. It can 
              evolve into quiet maneuvering battles or explosive tactical melees. With centuries of theory behind it 
              and modern innovations constantly emerging, it remains one of chess's most enduring and rewarding openings."
            </p>
          </blockquote>

          <div className="next-steps">
            <h3>Continue Your Journey</h3>
            <p>
              Now that you understand the key concepts of the Italian Game, practice these ideas in your games. Start 
              with the basic 4. d3 system to get comfortable with the positions, then gradually explore the sharper 
              4. c3 lines as you gain experience. Remember: understanding trumps memorization!
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="ButtonElements">
        <button onClick={() => navigate("/learn/intermediate")} className="return-button">
          Return to Lessons
        </button>
      </div>
    </div>
  );
};

export default ItalianGame;