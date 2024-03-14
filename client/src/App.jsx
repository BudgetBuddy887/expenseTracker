import { useState } from 'react'
import './App.css'
import ExpenseList from './components/Expenses/ExpenseList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ExpenseList/>
    </>
  )
}

export default App
