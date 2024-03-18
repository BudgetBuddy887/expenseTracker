import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'

//import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import Expense from './pages/Expense';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Expense/>
      },
      // {
      //   path: '/Expense',
      //   element: <ExpenseList/>,
      // },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
