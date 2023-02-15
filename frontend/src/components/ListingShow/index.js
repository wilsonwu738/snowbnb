import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing, getListing } from "../../store/listings";
import './ListingShow.css'

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  
 
  const listing = useSelector(getListing(listingId))   
 
  useEffect(() => {
  
    dispatch(fetchListing(listingId))
  
  }, [dispatch, listingId])

  if (!listing) {
    return null
  }
  
  return (
    <div className="show-container">
      <div className="show-title">{listing.title}</div>
      <div className="show-location">{listing.location}</div>
      <div className="photo-container">
        <div className="photo-box1">
          <img id="p1" src={listing.photoUrl[0]} alt="" />
        </div>
        <div className="photo-box2">
          <img id="p2" src={listing.photoUrl[1]} alt="" />
          <img id="p3"src={listing.photoUrl[2]} alt="" />
        </div>
        <div className="photo-box3">
          <img id="p4" src={listing.photoUrl[3]} alt="" />
          <img id="p5" src={listing.photoUrl[4]} alt="" />
        </div>
      </div>

      <div className="show-host">Hosue host by {listing.username}</div>
      <div className="show-details">{listing.numBedrooms} bedrooms {listing.maxGuests} Guest</div>

      <div className="show-description">{listing.description}</div>
      {/* <ReservationForm listingId={listingId}/>  */}
    </ div>
    
  )
}

export default ListingShow