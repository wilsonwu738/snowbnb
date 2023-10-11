import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing, getListing } from "../../store/listings";
import './ListingShow.css'
import ReservationForm from "../ReservationForm";
import ReviewsIndex from "../ReviewsIndex";

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
        <div className="top-container">
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
        </div>
        <div className="bottom-container">
          <div className="text-info">
            <div className="show-host">House host by {listing.username}</div>
            <br />
            <div className="show-details">{listing.maxGuests} guests · {listing.numBedrooms} bedrooms · {listing.numBaths} baths</div>
            <br />
            <div className="show-description">{listing.description}</div>
            <div className="map-text">Google Map coming soon!</div>
            <div className="map-img">
              <br />
              <br />
              
              <img src="https://snowbnb-seeds.s3.amazonaws.com/skimap.jpg" alt="" />

            </div>
          </div>
          <div className="reservation-container">
            <ReservationForm listingId={listingId}/> 
          </div>

          <div className="reviews-container">
            <ReviewsIndex listingId={listingId} />

          </div>

        </div>
        <br />
        <br />
        <br />

    </div>
    
  )
}

export default ListingShow