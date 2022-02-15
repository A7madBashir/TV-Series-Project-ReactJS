import React, { useContext } from 'react'
import Showitem from './Showitem'
import { ShowContext } from '../../context/Showcontext'
const Showlist = () => {
    const { loading, shows } = useContext(ShowContext)
    return (
        <section className='shows'>
            <div className='container '>
                <div className='row py-2 justify-between'>
                    {loading && (<div className='col-full'>
                        <div className='not-found'>Loading</div>
                    </div>)}
                    {shows.length === 0 && !loading ? (<div className='col-full'>
                        <div className='not-found'>
                            Show Not Found
                        </div>
                    </div>) : (
                        <>
                            {shows.map((item, id) => (
                                <div className='col-1-5' key={id}>
                                    <Showitem show={item}/>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

        </section>
    )
}

export default Showlist