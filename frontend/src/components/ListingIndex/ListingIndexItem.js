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
        <div className="listing-index-info">
          <div className="location_rating">
            <div className="listing-index-location">
              {listing.location}
            </div>
            {listing.averageRating && <div className="listing-index-rating">
              ⭑{listing.averageRating.toFixed(1)}
            </div>}
          </div>
          <div className="listing-index-bedrooms">
            {listing.numBedrooms} Bedrooms
          </div>
          <div className="listing-index-price">
            ${listing.nightlyPrice} night
          </div>

        </div>
    


      </Link>
    </div>
  )

}

export default ListingIndexItem