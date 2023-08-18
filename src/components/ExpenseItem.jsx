import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

export const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
  return (
    <li className='item'>
        <div className='info'>
            <span className='expense'>{expense.charge} </span>
            <span className='amount'>${expense.amount} </span>   
        </div>
        <div>
            <button className='edit-btn' aria-label='edit button' onClick={() => handleEdit(expense.id)}><MdEdit/></button>
        </div>
        <div>
            <button className='clear-btn' aria-label='delete button' onClick={() => handleDelete(expense.id)}><MdDelete/></button>
        </div>
    </li>
  )
}
