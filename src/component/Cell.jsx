import React from "react";
import { useState, useEffect } from "react";

// Composant pour une cellule

function Cell({ mine, count, handleMineClick, reset, gameEnded }) {
  console.log(mine);
  // permet de savoir si la cellule a été révélée
  const [isRevealed, setIsRevealed] = useState(false);

  // permet de réinitialiser la cellule
  useEffect(() => {
    setIsRevealed(false);
  }, [reset]);

  // permet de révéler la cellule et de gérer le game over
  const handleClick = () => {
    setIsRevealed(true);
    handleMineClick();
  };

  // permet de définir la couleur de la cellule

  const cellColor = isRevealed
    ? mine
      ? "bg-red-500 "
      : "bg-white text-purple-500"
    : gameEnded && mine
    ? "bg-red-500"
    : "bg-black";

  return (
    <div
      onClick={handleClick}
      className={`flex justify-center items-center w-8 h-8 border border-white ${cellColor}`}
    >
      {(isRevealed || (gameEnded && mine)) && (mine ? "💣" : count)}
    </div>
  );
}

export default Cell;
