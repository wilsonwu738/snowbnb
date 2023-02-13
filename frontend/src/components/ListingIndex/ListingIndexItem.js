// import { useDispatch } from "react-redux";
// import { fetchListing } from "../../store/listings";
import "./index.css"

const ListingIndexItem = ({listing}) => {
  // const dispatch = useDispatch();
  
  return (
    <div className="index-item">
      <img className='item-pic' src={listing.photoUrl} alt="" />
      <div>
        {listing.location}
      </div>
      <div>
        {listing.numBedrooms} Bedrooms
      </div>
      <br />
      <div>
        ${listing.nightlyPrice} night
      </div>

      <br />
      <br />
      <br />



    </div>
  )

}

export default ListingIndexItem