import React from 'react';
import styled from '@emotion/styled'
import useMemotestGameState from './useMemotestGameState';
import FancyButton from '../../small/FancyButton';

const MemotestWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

const ColumnaJuego = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const FilaJuego = styled.div`
  height: 21.5vh;
`;

const WinnerCard = styled.div`
  height: 663px;
  width: 675px;
  position: absolute;
  background: #365324;
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

const WinnerCardText = styled.span`
  margin-bottom: 10px;
`;

const Cuadro = styled.div`
  transition: opacity ease 0.2s;
  width: 200px;
  height: 160px;
  border: 1px solid;
  padding: 10px;
  background-color: ${props => props.isChanging ? 'darkgrey' : props.color};
  opacity: ${props => props.flipped ? 1 : 0};
  cursor: pointer;
`;

const Memotest = () => {
  const {turnos, cuadros, flipped, onRestart, manejarClickCuadro, gameEnded, wonPairs, isChanging} = useMemotestGameState()

  let copiaCuadros = [...cuadros];
  let cuadrosDivididos = [];
  let tamaño = copiaCuadros.length / 4;

  for (let i = 0; i < 4; i++) {
    cuadrosDivididos.push(copiaCuadros.splice(0, tamaño));
  }

  return (
    <MemotestWrapper>
      <WinnerCard show={gameEnded}>
        <WinnerCardText>
          ¡Fin del juego! Tardaste <strong>{turnos}</strong> turnos en terminar.
        </WinnerCardText>
        <FancyButton onClick={onRestart}>Play again?</FancyButton>
      </WinnerCard>

      {/* <WinnerCard show={gameEnded} onRestart={onRestart} turnos={turnos} /> */}
      <div id="tablero">
        <div className="container-fluid h-100">
          {cuadrosDivididos.map((subArray, index) => {
            return (
              <FilaJuego className="row" key={`grupo${index}`}>
                {subArray.map(({color, key}) => {
                  return (
                    <ColumnaJuego className="col" key={key}>
                      <Cuadro
                        key={key}
                        color={color}
                        onClick={() => manejarClickCuadro(key)}
                        flipped={wonPairs.includes(color) || flipped.includes(key)}
                        isChanging={isChanging[color]}
                      />
                    </ColumnaJuego>
                  );    
                })}
              </FilaJuego>
            );
          })}
        </div>
      </div>
    </MemotestWrapper>
  );
};

export default Memotest;