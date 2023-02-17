import './FiltersBar.css'
const FiltersBar = () => {
  return (
    <div className="filters-wrapper">
      <div className="filter-1">
        <img className='filter-1-img' src="https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg" alt="" />
        <div className='filter-1-text'>Top of the World</div>
      </div>

      <div  className="filter-2">
        <img className='filter-2-img' src="https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg" alt="" />
        <div className='filter-2-text'>Off-the-grid</div>
      </div>

      <div  className="filter-3">
        <img className='filter-3-img' src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt="" />
        <div className='filter-3-text'>Trending</div>
      </div>

      <div  className="filter-4">
        <img className='filter-4-img' src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt="" />
        <div className='filter-4-text'>OMG!</div>
      </div>


    </div>
  )

}

export default FiltersBar



