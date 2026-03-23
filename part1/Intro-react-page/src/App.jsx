//SOME NOTES ABOUT REACT:
// first letter of component names should be uppercase!
// React component (usually) needs to contain one root element
// A fragment lets you group elements WITHOUT creating a real HTML element.
// <>...</> → invisible box, React-only
//the individual things rendered in braces must be primitive
// values, such as numbers or strings. do not render objects



const Hello = ({name, age }) => {


  // const  {name, age } = props this  is the same as {name, age } in the parameters or  the same as this :
  //  const name = props.name
  // const age = props.age

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name} you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  console.log('hola componente!!!')

  const now = new Date()
  const a = 10
  const b = 20
  const age = 10
  console.log(now, a + b)



  return (
    <>

      <p> it is {now.toString()}</p>
      <p> {a} plus {b} is {a+b}</p>
      <Hello  name ='Dais' age = {26 + 10}/>
      <Hello name ='Fer'/>
      <Hello name = 'Helena' age = {age}/>

    </>
  )
}

export default App
