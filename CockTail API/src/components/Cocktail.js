import React from 'react'
import { Link } from 'react-router-dom'


// This will Basically Setup the Image, Name and the Other Properties
// inside the Individual CockTail Components:
const Cocktail = ({image, name, id, info, glass}) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name}/>
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-secondary btn-details">More Details</Link>
      </div>
    </article>
  )
}

export default Cocktail
