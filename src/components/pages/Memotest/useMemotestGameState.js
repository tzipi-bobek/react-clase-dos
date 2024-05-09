import { useState, useRef } from 'react';

const crearCuadros = () => {
  let cuadros= [];
  const coloresBase = ['red', 'blue', 'green', 'yellow', 'black', 'purple'];
  coloresBase.forEach((color) => {
    cuadros.push({color, key: `${color} 1`}, {color, key: `${color} 2`})
  })
  for (let i = cuadros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cuadros[i], cuadros[j]] = [cuadros[j], cuadros[i]];
  }

  return cuadros;
};

const useMemotestGameState = () => {
  const [cuadros, setCuadros] = useState(crearCuadros);
  const [turnos, setTurnos] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [wonPairs, setWonPairs] = useState([]);
  const [isChanging, setIsChanging] = useState({});
  const timeoutRef = useRef();
  const gameEnded = wonPairs.length === cuadros.length / 2;

  const manejarClickCuadro = (key) => {
    const newColor = key.split(' ')[0];
    if (!flipped.includes(key) && flipped.length < 2 && !wonPairs.includes(newColor)) {
      setFlipped([...flipped, key]);
      const newLength = flipped.length + 1;
      if (newLength === 2) {
        const firstColor = flipped[0].split(' ')[0];
        setTurnos(turnos + 1);

        if (firstColor === newColor) {
          setWonPairs([...wonPairs, firstColor]);
          setFlipped([]);
          timeoutRef.current = setTimeout(() => {
            setIsChanging(prevState => ({ ...prevState, [firstColor]: true }));
          }, 500);  
        } else {
          timeoutRef.current = setTimeout(() => {
            setFlipped([]);
          }, 500);
        }
      }
    } else if (!flipped.includes(key) && flipped.length === 2) {
      clearTimeout(timeoutRef.current);
      setFlipped([key]);
    }
  };

  const onRestart = () => {
    setIsChanging({})
    setFlipped([]);
    setWonPairs([]);
    setCuadros(crearCuadros);
    setTurnos(0);
  }

  return {turnos, cuadros, flipped, onRestart, manejarClickCuadro, gameEnded, wonPairs, isChanging}
}

export default useMemotestGameState;