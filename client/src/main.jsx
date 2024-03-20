import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'

//import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import Budget from './pages/Budget.jsx'
import Expense from './pages/Expense.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/budget',
        element: <Budget/>,
      },
      {
        path: '/expenses',
        element: <Expense/>,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
