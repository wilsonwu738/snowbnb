// import { useDispatch } from "react-redux";
// import { fetchListing } from "../../store/listings";
import "./ListingIndex.css"
import { Link } from "react-router-dom"

const ListingIndexItem = ({listing}) => {
  // const dispatch = useDispatch();
  
  return (
    <div className="listing-container">
      <Link className="listing-link" to={`/listings/${listing.id}`}>
      
        <img className='listing-photo' src={listing.photoUrl[0]} alt="" />
        <br />
        <br />
        <div className="listing-location">
          {listing.location}
        </div>
        <div className="listing-bedrooms">
          {listing.numBedrooms} Bedrooms
        </div>
        <br />
        <div className="listing-price">
          ${listing.nightlyPrice} night
        </div>

        <br />
        <br />
        <br />


      </Link>
    </div>
  )

}

export default ListingIndexItem