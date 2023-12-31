import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>It is a Dead End Route</h1>
        <Link to="/" className="btn btn-primary">Back to the Home Page</Link>
      </div>
    </section>
  )
}

export default Error
