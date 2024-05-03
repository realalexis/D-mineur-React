import React from "react";
import Cell from "./Cell";
import { useState, useEffect } from "react";

// Génère une grille avec des mines en fonction du niveau
const generateGrilleAvecMines = (level) => {
  let lignes, col, minePercentage;
  switch (level) {
    case "easy":
      lignes = 8;
      col = 8;
      minePercentage = 0.1;
      break;
    case "medium":
      lignes = 16;
      col = 16;
      minePercentage = 0.2;
      break;
    case "hard":
      lignes = 24;
      col = 24;
      minePercentage = 0.3;
      break;
    default:
      lignes = 8;
      col = 8;
      minePercentage = 0.1;
  }

  // génère une grille vide
  const grilleVoid = Array(lignes)
    .fill()
    .map(() => Array(col).fill(false));

  // génère un tableau de mines
  let mines = Array(lignes * col)
    .fill(false)
    .map((_, i) => i < Math.floor(lignes * col * minePercentage));
  mines.sort(() => Math.random() - 0.5);
  console.log(mines);
  // remplit la grille avec des mines
  return grilleVoid.map((ligne, i) =>
    ligne.map((_, j) => ({
      mine: mines[i * col + j],
      count: 0,
      revealed: false,
    }))
  );
};

// Composant pour une grille
function Grille({ level }) {
  // permet de savoir si le jeu est terminé
  const [gameOver, setGameOver] = useState(false);
  // permet de réinitialiser la grille
  const [victory, setVictory] = useState(false);

  const [gameEnded, setGameEnded] = useState(false);
  // permet de réinitialiser la grille
  const [resetCount, setResetCount] = useState(0);
  // génère la grille avec des mines
  const [grille, setGrille] = useState(() => generateGrilleAvecMines(level));
  // met à jour le compteur de mines adjacentes à chaque cellule

  useEffect(() => {
    // Réinitialise la grille avec le nouveau niveau
    setGrille(generateGrilleAvecMines(level));
  }, [level]);

  useEffect(() => {
    // calcule le nombre de mines adjacentes à une cellule
    const calculateAdjacentMines = (i, j) => {
      // directions pour les mines adjacentes à une cellule
      const directions = [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ];
      // compte le nombre de mines adjacentes à une cellule
      return directions.reduce((count, dir) => {
        const ni = i + dir.x;
        const nj = j + dir.y;
        // vérifie si la cellule est une mine et si elle est dans la grille
        if (
          ni >= 0 &&
          ni < grille.length &&
          nj >= 0 &&
          nj < grille[0].length &&
          grille[ni][nj].mine
        ) {
          // incrémente le compteur de mines adjacentes
          return count + 1;
        }

        return count;
      }, 0);
    };
    // met à jour le compteur de mines adjacentes à chaque cellule
    const newGrille = grille.map((ligne, i) =>
      ligne.map((cell, j) => ({
        ...cell,
        count: cell.mine ? 0 : calculateAdjacentMines(i, j),
      }))
    );
    // met à jour la grille
    setGrille(newGrille);
  }, [resetCount]);

  // vérifie si le jeu est terminé (toutes les cellules sans mine sont révélées)
  const checkVictory = () => {
    for (let i = 0; i < grille.length; i++) {
      for (let j = 0; j < grille[0].length; j++) {
        if (!grille[i][j].mine && !grille[i][j].revealed) {
          return false;
        }
      }
    }
    return true;
  };

  // révèle une cellule et vérifie si le jeu est terminé
  const handleMineClick = (i, j) => {
    // Si la cellule est une mine, le jeu est terminé
    if (grille[i][j].mine) {
      setGameOver(true);
      setGameEnded(true);
    } else {
      // Sinon, révèle la cellule et vérifie la victoire
      const newGrille = [...grille];
      newGrille[i][j].revealed = true;
      setGrille(newGrille);

      if (checkVictory()) {
        setVictory(true);
        setGameEnded(true);
      }
    }
  };
  // réinitialise le jeu
  const resetGame = () => {
    setGrille(generateGrilleAvecMines(level));
    setGameOver(false);
    setVictory(false);
    setGameEnded(false);
    setResetCount((prev) => prev + 1);
  };
  // affiche la grille
  return (
    <div className="">
      <div className="text-2xl font-bold">
        {victory ? <div>Victoire !</div> : null}
        {gameOver && !victory ? (
          <div className="flex justify-between">
            <p>Game Over</p>
            <button onClick={resetGame}>Reset</button>
          </div>
        ) : null}
      </div>

      {grille.map((ligne, i) => (
        <div key={i} className="flex">
          {ligne.map((cell, j) => (
            <Cell
              key={`${i}-${j}`}
              mine={cell.mine}
              count={cell.count}
              handleMineClick={() => handleMineClick(i, j)}
              reset={resetCount}
              gameEnded={gameEnded}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
export default Grille;
