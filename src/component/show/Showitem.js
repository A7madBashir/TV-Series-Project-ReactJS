import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import noImg from '../../assets/images/no-img.png'

const Showitem = (item) => {
  const score = item.show.score
  const { name, image, id, rating } = { ...item.show.show }
  return (
    <Link to={`/shows/${id}`} className='show-item'>
      <div className='show-item_img'>
        <img src={image && image.medium ? image.medium : noImg}
          alt={name ? name : "Show-Image"} />
        <div className='show-item_img-hover'>
          <div className='rating'>
            {rating && rating.average && (
              <><span>⭐️</ span>{score}</>
            )}</div>
          <h3 className='title'>
            {name ? name : null}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default Showitem;