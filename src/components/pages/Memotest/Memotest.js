import React from 'react';
import cx from 'classnames';
import ReactCardFlip from 'react-card-flip';
import pokeball from './imagenes/pokeball.png';
import './Memotest.css';
import useMemotestGameState from './useMemotestGameState';
import FancyButton from '../../small/FancyButton';

const WinnerCard = ({ show, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">The game has ended</span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

const Carta = ({ src, name, flipped, onClick }) => {
  return (
    <div className="memotest-carta">
      <ReactCardFlip isFlipped={flipped}>
        <div onClick={onClick} className="memotest-img-wrapper">
          <img className="memotest-img" src={pokeball} alt={name} />
        </div>
        <div onClick={onClick} className="memotest-img-wrapper">
          <img className="memotest-img" src={src} alt={name} />
        </div>
      </ReactCardFlip>
    </div>
  );
};

const Memotest = () => {
  const { cartas, flipped, onRestart, onClickCard, gameEnded, wonPairs } = useMemotestGameState();

  return (
    <div className="memotest-wrapper">
      <WinnerCard show={gameEnded} onRestart={onRestart} />
      {cartas.map(({ key, name, src }) => (
        <Carta
          key={key}
          name={name}
          src={src}
          onClick={() => onClickCard(key)}
          flipped={wonPairs.includes(name) || flipped.includes(key)}
        />
      ))}
    </div>
  );
};
export default Memotest;
