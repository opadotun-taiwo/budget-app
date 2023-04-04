import './App.css';
import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car payment", amount: 400 },
//   { id: uuidv4(), charge: "credit card bill ", amount: 1200 }
// ];
//persistency with localstorage
const initialExpenses = localStorage.getItem('expenses')? 
JSON.parse(localStorage.getItem('expenses')): []



function App() {
  const [expenses, setExpenses] = useState(initialExpenses)

  const [charge, setCharge] = useState('')

  const [amount, setAmount] = useState('')

  const [alert, setAlert] = useState({show:false})

  const [edit, setEdit] = useState(false)

  const [id, setId] = useState(0)

  //useeffect for side effect to let react know when to rerender on change of states
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text})
    setTimeout(() => {
      setAlert({show:false});
    }, 7000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(charge !== "" && amount > 0){
      if(edit){
        let tempExpense = expenses.map(item => {
          //overwrite the specific item
          return item.id === id? {...item, charge, amount} : item
        })
        setExpenses(tempExpense)
        //return to submit
        setEdit(false)
        handleAlert({type: 'success', text: 'item successfully edited'})
      }else{
          //also amount:amount
        const newDate = new Date().toLocaleString();
        const singleExpense = {id:uuidv4(), charge:charge, amount:amount, newDate }
        //use spread operator to copy the exiting array it prevents override
        setExpenses([...expenses, singleExpense])
        handleAlert({type: 'success', text: 'item added'})
      }
      setAmount("")
      setCharge("")
    }else{
      //handleAlert
      handleAlert({type:'danger', text:`Charge and amount cannot be empty, plese enter a value`})
    }
  }

  const clearItems = () => {
    setExpenses([])
    handleAlert({type: 'danger', text: `All Item deleted`})
  }

  const handleDelete = (id) => {
    //only return item that do not match the item I click on by filtering
    let tempExpense = expenses.filter((item) => {
      return item.id !== id
    })
    setExpenses(tempExpense)
    handleAlert({type: 'danger', text: `Item deleted`})
  }

  const handleEdit = (id) => {
    let expense = expenses.find((item) => {
      return item.id === id
    })
    let {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    //set id in place
    setId(id)
  }

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.type}/>}
    <Alert></Alert>
    <h1>Budget Calculator</h1>
    <main className='App'>
      <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} 
      handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit}></ExpenseForm>
      <ExpenseList expenses={expenses} handleDelete={handleDelete}
       handleEdit={handleEdit} clearItems={clearItems}></ExpenseList>
    </main>
    <h1>
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            //convert input to numbers becuase it is collected as str
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    
    </>
  );
}

export default App;
