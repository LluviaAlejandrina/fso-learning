import { useState } from 'react'
// como se ejecuta:
// 1 React crea el estado , counter = 0
// 2  set timeout agenda : "En 1 segundo ejecutar: setCounter(0 + 1)"
 // 3  se ejecuta : console.log('rendering...', counter = 0)
 // 4. pantalla muestra 0
 // 5  1 seg despues : ahora se ejecuta set counter(1): guarda el nuevo estado
 // 6  cuando  cambia el estado : React vuelve a ejecutar TODA la función App desde arriba.

/*   lo que hace  set counter basicamente:
 function setCounter(nuevoValor) {
  guardarNuevoEstado(nuevoValor)
  volverARenderizar()
} */


  // An event handler is a function

const Display = ({ counter }) => <div>{counter}</div>


const Button  = ({ onClick, text }) => <button onClick = {onClick}>{text}</button>



const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne =() => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }


  return (
    <div>
      <Display counter={counter}/>
      <Button  onClick={increaseByOne} text = 'Plus'/>
      <Button  onClick = {setToZero} text = 'Zero'/>
      <Button  onClick ={decreaseByOne} text = 'Minus'/>

    </div>

  )
}

export default App
