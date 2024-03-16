import { useState } from 'react'
import './App.css'
import ExpenseList from './components/Expenses/ExpenseList'
import SignUpForm from './pages/SignUp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUpForm></SignUpForm>
      <ExpenseList/>
    </>
  )
}

export default App
