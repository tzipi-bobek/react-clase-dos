import { useState, useRef } from 'react';
import cartasDiferentes from './cartas';

const crearCartasIniciales = () => {
  let cartasIniciales = [];
  cartasDiferentes.forEach(({ src, name }) => {
    cartasIniciales.push({
      name,
      src,
      key: `${name}-1`,
    });
    cartasIniciales.push({
      name,
      src,
      key: `${name}-2`,
    });
  });
  cartasIniciales.sort(() => 0.5 - Math.random());
  return cartasIniciales;
};

const useMemotestGameState = () => {
  const [cartas, setCartas] = useState(crearCartasIniciales);
  const [flipped, setFlipped] = useState([]);
  const [wonPairs, setWonPairs] = useState([]);
  const timeoutRef = useRef();
  const gameEnded = wonPairs.length === cartas.length / 2;

  const onClickCard = (key) => {
    if (!flipped.includes(key) && flipped.length < 2) {
      setFlipped([...flipped, key]);

      const newLength = flipped.length + 1;

      if (newLength === 2) {
        const firstName = flipped[0].match(/^\w+/)[0];
        const secondName = key.match(/^\w+/)[0];

        if (firstName === secondName) {
          setWonPairs([...wonPairs, firstName]);
          setFlipped([]);
        } else {
          timeoutRef.current = setTimeout(() => {
            setFlipped([]);
          }, 1000);
        }
      }
    } else if (!flipped.includes(key) && flipped.length === 2) {
      clearTimeout(timeoutRef.current);
      setFlipped([key]);
    }
  };

  const onRestart = () => {
    setCartas(crearCartasIniciales);
    setWonPairs([]);
  };

  return { cartas, flipped, onClickCard, onRestart, wonPairs, gameEnded };
};
export default useMemotestGameState;
