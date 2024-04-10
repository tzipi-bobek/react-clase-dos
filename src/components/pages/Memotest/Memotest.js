import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Memotest.css';
import useMemotestGameState from './useMemotestGameState';
import FancyButton from '../../small/FancyButton';

const WinnerCard = ({ show, onRestart = () => {}, turnos }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })} style={{width: 675, height: 663}}>
      <span className="winner-card-text">¡Fin del juego! Tardaste <strong>{turnos}</strong> turnos en terminar.</span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

const Cuadro = ({ color, onClick, flipped, isChanging }) => {
  const className = isChanging ? 'cuadro h-100 gris' : `cuadro h-100 ${color}`;

  return (
    <div className={cx(className, { [`${className} flipped`]: flipped })} onClick={onClick} /* style={flipped ? {opacity: 1}: {opacity: 0}} */></div>
    
  );
};

Cuadro.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  isChanging: PropTypes.bool,
};

const Memotest = () => {
    const {turnos, cuadros, flipped, onRestart, manejarClickCuadro, gameEnded, wonPairs, isChanging} = useMemotestGameState()
  
    let copiaCuadros = [...cuadros];
    let cuadrosDivididos = [];
    let tamaño = copiaCuadros.length / 4;

    for (let i = 0; i < 4; i++) {
      cuadrosDivididos.push(copiaCuadros.splice(0, tamaño));
    }
  
    return (
        <div className="memotest-wrapper">
            <WinnerCard show={gameEnded} onRestart={onRestart} turnos={turnos} />
            <div id="tablero">
                <div className="container-fluid h-100">
                    {cuadrosDivididos.map((subArray, index) => {
                        return (
                          <div className="row fila-juego" key={`grupo${index}`}>
                                {subArray.map(({color, key}) => {
                                    return (
                                      <div className="col columna-juego" key={key}>
                                        <Cuadro
                                          key={key}
                                          color={color}
                                          onClick={() => manejarClickCuadro(key)}
                                          flipped={wonPairs.includes(color) || flipped.includes(key)}
                                          isChanging={isChanging[color]}
                                        />
                                      </div>
                                    );    
                                })}
                          </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
  }
  export default Memotest;