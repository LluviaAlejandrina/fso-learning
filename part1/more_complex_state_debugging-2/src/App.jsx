import { useState } from 'react'

// In React, state must be treated as immutable.
// ❌ Don’t modify the existing object
// ✅ Always create a new object
// or React might think: “Oh, this is the same object. No need to re-render.”


/* NEVER:

Push into arrays in state

Modify objects in state

Do ++, .push(), .splice() directly

ALWAYS:

Spread ...

Use .map(), .filter(), concat()

Create new objects */

// React updates state after the event handler finishes.
// separate the things you want to log to the console with a comma:

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Button2 = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])
 //  the state of React components, like allClicks,
 //  must not be mutated directly.
 const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }
  // // React updates state after the event handler finishes.
  //thats why we are calculating manually  the updated  left
 // Adding the new item to the array is accomplished with
 //  the concat method, which does not mutate the existing
 // array but rather returns a new copy of the array

 const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  }
 // *debugger* you can  write this to make  program stop at this point
 //and find what the variables are in the console
 // can also add breakpoints from  the sources tab double click in the line of code


//another diferent example here  of state:
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />

      {value}
      <Button2 onClick = {() => setToValue(1000)} text = 'thousand'/>
      <Button2 onClick={() => setToValue(0)} text = 'reset'/>
      <Button2 onClick={() => setToValue(value + 1)} text = 'increment'/>

    </div>
  )
}
 // onClick necesita una función, No necesita el resultado de una función.
 // Necesita una función que pueda ejecutar después.
 // 2 options then :  definir  una funcion directamente en onclick y hacer  referencia al event handler
 // o event handler sea una funcion que devuelva otra funcion y solo hacer referencia al event handler en el onclick

/*  You always define your event handler as a function.
The difference is:

If it needs no parameters, you pass it directly.
If it needs parameters, you wrap it in another function. */




 export default App
