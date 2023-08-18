
import React, { useState, useEffect } from "react";
import './App.css';
import { Alert } from './components/Alert';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { v4 as uuidv4 } from "uuid";

// Localstorage

//const initialExpenses = [
//  { id: uuidv4(), charge: "rent", amount: 1600},
//  { id: uuidv4(), charge: "card payment", amount: 400},
//  { id: uuidv4(), charge: "credit card bill", amount: 1200}
//]; 
const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [] ;




function App() {
  // ------ set values ------
  // All expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single expense
  const [charge, setCharge] = useState("");
  // Single Amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({show:false, type:"", text:""});
  // edit Activator(true/false)
  const [edit, setEdit] = useState(false)
  // edi Item
  const [id, setId] = useState(0);
  // ------ useeffect ------
  useEffect(() => {
    console.log('we called useEffect');
    localStorage.setItem('expenses',JSON.stringify(expenses));
  }, [expenses])
  // ------ functionnality ------
  const handleCharge = (e) => {
    setCharge(e.target.value);
    //console.log(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    //console.log(e.target.value);
  };
  const handleAlert = ({type,text}) => {
    setAlert({show:true, type, text})
    setTimeout(() => {
      setAlert({show:false})
    }, 3000)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(charge, amount);
    if(charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item;
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:'success', text:'item Updated'});
      } else {
        const singleExpense = {id:uuidv4(), charge: charge, amount: amount};
        setExpenses([...expenses,singleExpense]);
        handleAlert({type:'success', text:'item added'});
      }
    } else {
      // handle alert call
      handleAlert({type:'danger', text:`charge can't be empty value and amount value has to be bigger than zero` });
    }
    setCharge("");
    setAmount("");
  };
  const handleClear = () => {
    
    setExpenses([]);
  }
  const handleDelete = (id) => {
    //console.log('Item Deleted');
    setExpenses(expenses.filter((expense) => expense.id !== id ));
    handleAlert({ type: "danger", text: "Item Deleted"});
  }
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge,amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">

      <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
      <ExpenseList expenses={expenses} handleClear={handleClear} handleDelete={handleDelete} handleEdit={handleEdit}/>
      </main>
      <h1>
        total spending : {" "}
        <span className="total"> 
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
