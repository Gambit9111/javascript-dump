import { useState, useEffect } from "react";
import "./index.css";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "./components/MainLayout";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // get expenses from backend
  useEffect(() => {
    fetch("http://localhost:3001/api/expenses/")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      });
  }, []);

  console.log(expenses);

  return (
    // makes everything nice and centered
    <div className="h-screen w-sceen flex justify-center items-center">
      <MainLayout />
    </div>
  );
};

export default App;
