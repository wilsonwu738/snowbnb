import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing, getListing } from "../../store/listings";
import './ListingShow.css'
import ReservationForm from "../ReservationForm";
import ReviewsIndex from "../ReviewsIndex";
import { fetchReviews, getReviews } from "../../store/reviews";
import DayPickerWrapper from "../DayPickerWrapper";

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(getListing(listingId))
  const reviews = useSelector(getReviews)   
  
  const [selectedRange, setSelectedRange] = useState();
  const reservedDates = ['2023-11-15', '2023-11-16', '2023-11-20'];
  
  
  useEffect(() => {
  
    dispatch(fetchListing(listingId))
  
  }, [dispatch, listingId])

  useEffect(() => {
  
    dispatch(fetchReviews(listingId))
  
  }, [dispatch, listingId])

  if (!listing) {
    return null
  }
  
  return (
    <div className="show-page-container">

      <div className="listing-show-container">
        <div className="listing-show-summary">
          <div className="listing-show-title">{listing.title}</div>
          <div className="listing-show-location">{listing.location}</div>
        </div>
  
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

      <div className="main-content-container">
        <div className="left-container">
          <div className="listing-show-info">
            <div className="show-host">House hosted by {listing.firstName}</div>
            <br />
            <div className="show-details">{listing.maxGuests} guests · {listing.numBedrooms} bedrooms · {listing.numBaths} baths</div>
            <br />
            <div className="show-description">{listing.description}</div>
          </div>
          <div className="standalone-calendar">
            <DayPickerWrapper
            reservedDates={reservedDates}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            /> 
          </div>
        </div>

          <div className="reservation-form-container">
            <ReservationForm listingId={listingId} selectedRange={selectedRange} setSelectedRange={setSelectedRange} reservedDates={reservedDates}/>
           
          </div>
        
      </div>

      <div className="reviews-container">
        <ReviewsIndex listingId={listingId} reviews={reviews} />
      </div>

  

      <div className="bottom-container">
          <div className="map-text">Google Map coming soon!</div>
          <div className="map-img">
            <img src="https://snowbnb-seeds.s3.amazonaws.com/skimap.jpg" alt="" />
          </div>
      </div>
      
    </div>
    
  )
}

export default ListingShow