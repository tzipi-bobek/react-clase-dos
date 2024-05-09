import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import FancyButton from '../small/FancyButton';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = styled.div`
  width: 100px;
  height: 100px;
  background: white;
  border: 1px solid black;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
`;
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const TicTacToeWrapper = styled.div`
  position: relative;
`;

const TicTacToeRow = styled.div`
  display: flex;
`;

const WinnerCard = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: #365324;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  flex-direction: column;
  color: black;
  transition: ${props => !props.show ? 'none' : 'opacity ease-in-out 0.7s'};
  pointer-events: ${props => !props.show ? 'none' : 'auto'};
  opacity: ${props => !props.show ? 0 : 1};
`;
WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
};

const WinnerCardText = styled.span`
  margin-bottom: 10px;
`;

const getWinner = tiles => {
  for (let i = 0; i < 3; i++) {
    const row = tiles.slice(i * 3, i * 3 + 3);
    if (row.every(cell => cell === 'X')) return 'X';
    if (row.every(cell => cell === 'O')) return 'O';
  }

  for (let i = 0; i < 3; i++) {
    const col = [tiles[i], tiles[i + 3], tiles[i + 6]];
    if (col.every(cell => cell === 'X')) return 'X';
    if (col.every(cell => cell === 'O')) return 'O';
  }

  const diag1 = [tiles[0], tiles[4], tiles[8]];
  const diag2 = [tiles[2], tiles[4], tiles[6]];
  if (diag1.every(cell => cell === 'X') || diag2.every(cell => cell === 'X')) return 'X';
  if (diag1.every(cell => cell === 'O') || diag2.every(cell => cell === 'O')) return 'O';

  return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  const setTileTo = (tileIndex, player) => {
    if (tiles[tileIndex] || winner || gameEnded) return; 
    const updatedTiles = [...tiles];
    updatedTiles[tileIndex] = player;
    setTiles(updatedTiles);
    const newWinner = getWinner(updatedTiles);
    if (newWinner) {
      setWinner(newWinner);
      setGameEnded(true);
    } else {
      if (updatedTiles.every(cell => cell !== '')) {
        setGameEnded(true);
      } else {
        setCurrentPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  };

  const restart = () => {
    setTiles(Array(9).fill(''));
    setCurrentPlayer(initialPlayer);
    setWinner(null);
    setGameEnded(false);
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');

  return (
    <TicTacToeWrapper>
      <WinnerCard show={gameEnded} winner={winner}>
        <WinnerCardText>
          {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
        </WinnerCardText>
        <FancyButton onClick={restart}>Play again?</FancyButton>
      </WinnerCard>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <TicTacToeRow key={rowIndex}>
          {Array.from({ length: 3 }).map((_, colIndex) => {
            const tileIndex = rowIndex * 3 + colIndex;
            return (
              <Square key={tileIndex} onClick={() => setTileTo(tileIndex, currentPlayer)}>
                {tiles[tileIndex]}
              </Square>
            );
          })}
        </TicTacToeRow>
      ))}
    </TicTacToeWrapper>
  );
};

export default TicTacToe;
