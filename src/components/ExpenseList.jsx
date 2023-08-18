import React from 'react'
import {  ExpenseItem as Item } from './ExpenseItem'
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({expenses, handleClear, handleEdit, handleDelete}) => {
  return (
    <>
        <ul className='list'>
            {expenses.map((expense) => {
                return(
                    <Item expense={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>
                );
            })}
        </ul>
        {expenses.length > 0 && <button className='btn' onClick={handleClear}>Clear expenses  <MdDelete className='btn-icon'/> </button>}
    </>
  )
}
