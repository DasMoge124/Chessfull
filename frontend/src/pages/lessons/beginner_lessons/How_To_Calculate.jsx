import React from 'react';
import { Target, Swords, ShieldAlert, GraduationCap, ChevronRight } from 'lucide-react';

const ChessCalculationGuide = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 rounded-full">
            Chess Fundamentals
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-black mb-6 text-slate-800">
            How to Calculate
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "Calculating in chess is how one evaluates and mentally processes a sequence of moves to find the best course of action."
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-6 space-y-16">
        
        {/* Intro Section */}
        <section className="prose prose-slate lg:prose-xl">
          <p className="leading-loose">
            Calculating can be very difficult for many players considering the variety of possibilities a single position can have and how limited our brains can work. However, with enough practice, you can become a <strong>calculating master</strong>.
          </p>
          <div className="flex items-center gap-4 p-6 bg-slate-100 rounded-2xl border-l-4 border-slate-800">
            <GraduationCap className="text-slate-800 w-12 h-12 flex-shrink-0" />
            <p className="m-0 text-sm font-medium">
              This guide is intended to help you develop your calculation skills in addition to foundational skills like development and defending.
            </p>
          </div>
        </section>

        {/* CCT Framework */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Target className="text-amber-600" /> 
            The Three Pillars of Calculation
          </h2>
          <div className="grid gap-6">
            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-400 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-xl text-red-600">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-amber-700 transition-colors">Checks</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Attacking the king. If a player’s king is in check, he/she is forced to move the king or defend the king with another piece.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-400 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Swords size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-amber-700 transition-colors">Captures</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Look for trades or free material. Evaluate capturing your opponent’s pieces with your piece or vice versa.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-400 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-amber-700 transition-colors">Threats</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Threaten to capture a piece, checkmate, or utilize a deadly tactic like <strong>forks, pins, or skewers.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="space-y-8">
          <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Positional Awareness</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Consider how the position is set up. For instance, exchanging a rook for a knight on the opponent's kingside can weaken the king and allow for checkmate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                <span className="block text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">Active Pieces</span>
                <p className="text-sm">You can create more attacks than your opponent.</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                <span className="block text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">Passive Pieces</span>
                <p className="text-sm">Restricts your ability to defend and respond to threats.</p>
              </div>
            </div>
          </div>

          <blockquote className="border-l-4 border-amber-500 pl-6 py-2 italic text-slate-700 text-lg">
            "Don't blindly capture. If you notice your opponent sacrificing a rook, evaluate the next sequence first—or you might get checkmated."
          </blockquote>
        </section>

        {/* Call to Action */}
        <footer className="text-center pb-20">
          <p className="text-slate-500 mb-6">Ready to apply these concepts?</p>
          <button className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
            Practice Calculating Now <ChevronRight size={20} />
          </button>
          <div className="ButtonElements">
                <button onClick={() => navigate("/learn/beginner")}>
                Back to Lessons Page
                </button>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default ChessCalculationGuide;