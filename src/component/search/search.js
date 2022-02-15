import React, { useContext, useEffect, useState } from 'react'
import Homeimg from '../../assets/images/home-bg.jpg'
import { ShowContext } from '../../context/Showcontext';
import { AlertContext } from '../../context/Alertcontext';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '../alert';
const Search = (props) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, search } = useContext(ShowContext)
  const { alert, setAlert } = useContext(AlertContext)

  const handleSearchForm = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      search(searchTerm)
      navigate(`/search?key=${searchTerm}`)
    } else {
      setAlert('Search Bar is Empty', 'danger')
    }
  }

  useEffect(() => {
    // console.log('your path name?',location.search.slice(5))
    // console.log('your path name?',location.search.split('?key=')[1])
    if (location.search && location.search.includes('key')) {
      let key = location.search.split('?key=')[1];
      console.log('Your Params Pathname:', key)
      if (key) {
        key = decodeURIComponent(key)
        setSearchTerm(key);
        search(key)
      }
    }
  }, [])
  const styleclass = props.size === 'large' ? 'col-2-4 search-content mx-auto mh-100' : 'col-2-4 search-content mx-auto pt-6 pb-2'
  return (
    <section className='search' style={{ background: `url(${Homeimg})` }}>
      <div className='container'>
        <div className='row'>
          <div className={styleclass} >
            {props.size === 'large' ? <>
              <h1> Find your next show</h1><br />
            </> : null}
            <form className='search-form' onSubmit={handleSearchForm}>
              <input type={'search'} value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value)
              }} placeholder='type your imagine' />
              <button type='submit' disabled={loading} className='btn btn-primary'>{loading ? "loading ..." : "Search"}</button>
            </form>
            {alert && (<Alert type={alert.type} message={alert.message} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Search