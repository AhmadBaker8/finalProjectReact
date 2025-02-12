import React from 'react'
import { Link } from 'react-router-dom'

export default function PageTitle({title}) {
  return (
    <>
    <div className="page-title-area">
      <div className="container">
        <div className="page-title-content" >
          <h2>{title}</h2>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>{title}</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}
