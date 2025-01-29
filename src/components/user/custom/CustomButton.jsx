import React from 'react'
import styles from './CustomButton.module.css'
import { FaCartShopping } from "react-icons/fa6";





export default function CustomButton() {
  return (
    <div className='p-5'>
      <button className={styles.button}>
        <FaCartShopping/>
        <span> shop now</span>
        <span className={styles.span}></span>
      </button>
    </div>
  )
}
