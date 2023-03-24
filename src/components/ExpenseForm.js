import React from 'react'
import { MdSend} from "react-icons/md";

const ExpenseForm = ({amount, charge, handleCharge, handleAmount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='expense'>Charge</label>
          <input type="text" value={charge} onChange={handleCharge} className='form-control' id='charge' name='charge' placeholder='e.g rent'></input>
        </div>

       <div className='form-group'>
          <label htmlFor='amount'>Amount</label>
          <input type="number" value={amount} onChange={handleAmount} className='form-control' id='amount' name='amount' placeholder='e.g 3000'></input>
        </div>

      </div>
      <button type='submit' className='btn'>
        {edit ? 'edit': 'submit'}
        <MdSend className='btn-icon'></MdSend>
      </button>
    </form>
  )
}

export default ExpenseForm
