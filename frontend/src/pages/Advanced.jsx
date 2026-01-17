/**
 * Advanced page component for experienced chess players.
 * Displays advanced-level games and lessons with grandmaster-level tactics.
 * Includes games featuring high-level players like Eric and Emilia.
 */
import React from "react";
import EricVEmilia from "./lessons/white/eric_v_emilia";

function Advanced() {
  return (
    <div>
      <h1>Advanced Page</h1>
      <EricVEmilia />
    </div>
  );
}

export default Advanced;
