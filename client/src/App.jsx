import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import Budgets from "./pages/Budgets";
import CategoryList from "./components/Categories/CategoryList";
import LoginForm from "./components/user/LoginForm";
import SignUpForm from "./components/user/SignupForm";
import BudgetForm from "./components/Budgets/budgetForm";
import CategoryForm from "./components/Categories/categoryForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/budget" element={<Budgets />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/expenseform" element={< ExpenseForm/>} />
            <Route path="/budgetform" element={< BudgetForm/>} />
            <Route path="/categoryform" element={< CategoryForm/>} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
