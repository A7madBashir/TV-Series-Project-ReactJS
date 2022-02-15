import React, { useContext, useEffect, useState } from 'react'
import { ShowContext } from '../../context/Showcontext'
import { useParams } from 'react-router-dom'
import noImg from '../../assets/images/no-img.png'
const Show = () => {
  const { getActiveShow, activeShow, loading } = useContext(ShowContext);
  const [showImg, setShowImg] = useState(noImg)
  const params = useParams()
  useEffect(() => {
    console.log(params.id)
    if (params.id) {
      getActiveShow(params.id)
    }
  }, [params.id])
  useEffect(() => {
    if (activeShow && activeShow.image) {
      if (activeShow.image.original) {
        setShowImg(activeShow.image.original)
      } else if (activeShow.show.medium) {
        setShowImg(activeShow.image.medium)
      }
    } else {
      setShowImg(noImg)
    }
  }, [activeShow])
  const bgStyle = {
    backgroundImage: `url(${showImg})`
  }
  return (
    <section className='show' style={bgStyle}>
      <div className='container'>
        {loading && (<div className='row'>
          <div className='col-full'>
            <div className='not-found'>Loading</div>
          </div>
        </div>)}
        {!loading && !activeShow && (<div className='row'>
          <div className='col-full'>
            <div className='not-found'>Not Found</div>
          </div>
        </div>)}
        {!loading && activeShow && (
          <div className='row'>
            <div className='col-1-4 '>
              <div className='show-img'>
                <img src={showImg} alt={activeShow.name ? activeShow.name : "Show Name"} />
              </div>
            </div>
            <div className='col-3-4'>
              <div className='show-info'>
                <h1 className='mb-2'>{activeShow.name ? activeShow.name : "..."}</h1>

                {activeShow.genres && activeShow.genres.length > 0 && (
                  <div className='show-info_type mb-2'>
                    {activeShow.genres.map((el) => (
                      <span className='badge' key={el}>{el}</span>
                    ))}
                  </div>

                )}

                {activeShow.status && (<div className='sow-info_status mb-1'>
                  <strong>Status : </strong>{activeShow.status}
                </div>
                )}

                {activeShow.rating && (

                  <div className='show-info_rating mb-1'>
                    <strong>Rating :</strong> {activeShow.rating.average}
                  </div>
                )}
                {activeShow.officialSite && (

                  <div className='show-info_site mb-1'>
                    <a href={activeShow.officialSite} rel="noreferrer" target='_blank'><strong>Official Site</strong></a>
                  </div>
                )}
                {activeShow.summary && (
                  <div className='show-info_about d-flex'>
                    <strong>Story :</strong>
                    <span dangerouslySetInnerHTML={{ __html: activeShow.summary }}></span>
                  </div>
                )}

              </div>
            </div>
          </div>)}
      </div>
    </section>
  )
}

export default Show