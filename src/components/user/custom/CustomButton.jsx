import React from 'react'
import styles from './CustomButton.module.css'
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';





export default function CustomButton() {
  return (
    <Link to={'/shop'}>
      <div className='p-5'>
      <button className={styles.button}>
        <FaCartShopping/>
        <span> shop now</span>
        <span className={styles.span}></span>
      </button>
    </div>
    </Link>
  )
}
