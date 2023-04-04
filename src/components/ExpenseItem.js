import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const {id, charge, amount, newDate} = expense;

  return (
      <li className='item'>
        <div className='info'>
            <span className='expense'>{charge}</span>
            <span className='amount'>{amount}</span>
        </div>
        <button className='edit-btn' aria-label='edit button' onClick={() => handleEdit(id)}>
          <MdEdit></MdEdit>
        </button>
        <button className='clear-btn' aria-label='delete button' onClick={ () => handleDelete(id)}>
          <MdDelete></MdDelete>
        </button>
        <button className='clear-btn'>{newDate}</button>
      </li>
  )
}

export default ExpenseItem
