import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing, getListing } from "../../store/listings";
import './ListingShow.css'
import ReservationForm from "../ReservationForm";
import ReviewsIndex from "../ReviewsIndex";
import { fetchReviews, getReviews } from "../../store/reviews";
import DayPickerWrapper from "../DayPickerWrapper";
import { fetchListingReservations, getReservations } from "../../store/reservations";
import checkinPic from '../../icons/checkin.png'
import cancellationPic from '../../icons/cancellation.png'
import superhostPic from '../../icons/superhost.png'
import wifiPic from '../../icons/wifi.png'
import kitchenPic from '../../icons/kitchen.png'
import workspacePic from '../../icons/workspace.png'
import { differenceInDays } from 'date-fns';
import ListingMap from "../ListingMap"




const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(getListing(listingId));
  const reviews = useSelector(getReviews);
  const reservations = useSelector(getReservations)
  
  const [selectedRange, setSelectedRange] = useState();

  const shortLocation = (listing?.location.split(',')[0] ?? 'Unknown snow mountain');
  
  
  
  useEffect(() => {
    
    dispatch(fetchListing(listingId))
  
  }, [dispatch, listingId])

  useEffect(() => {
  
    dispatch(fetchReviews(listingId))
  
  }, [dispatch, listingId])

  useEffect(() => {
  
    dispatch(fetchListingReservations(listingId))
  
  }, [dispatch, listingId])

  //for furture default calendar highlight implementation
  // useEffect(() => {
  //   if (reservations.length > 0) {
  //     let maxEndDate = null;
  //     reservations.forEach((reservation) => {
  //       const endDate = new Date(reservation.endDate);
  //       if (!maxEndDate || endDate > maxEndDate) {
  //         maxEndDate = endDate;
  //       }
  //     });
  //     const earliestDate = maxEndDate
  //       ? new Date(maxEndDate.getTime() + 24 * 60 * 60 * 1000) 
  //       : null;
  //     const endDate = earliestDate
  //       ? new Date(earliestDate.getTime() + 5 * 24 * 60 * 60 * 1000) 
  //       : null;

  //     setSelectedRange(earliestDate ? [earliestDate, endDate] : null);
  //   }
  // }, [reservations]);


  if (!listing) {
    return null
  }

  const reservationRanges = reservations.map(reservation => ({
    from: new Date(reservation.startDate),
    to: new Date(reservation.endDate),
  }));

  

 
  
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
          <div className="show-highlights">
            <div className="show-checkin">
              <img src={checkinPic} alt="" />
              <div className="show-checkin-text">
                <div className="show-checkin-text-summary">
                  Self Check-in
                </div>
                <div className="show-checkin-text-details">
                  Check yourself in with the lockbox
                </div>
              </div>
            </div>
            <div className="show-superhost">
              <img src={superhostPic} alt="" />
              <div className="show-superhost-text">
                <div className="show-superhost-text-summary">
                  {listing.firstName} is a Superhost
                </div>
                <div className="show-superhost-text-details">
                  Superhosts are experienced, highly rated Hosts.
                </div>
              </div>
            
            </div>
            <div className="show-cancellation">
              <img src={cancellationPic} alt="" />
              <div className="show-cancellation-text">
                Free cancellation for 48 hours
              </div>
            </div>
          </div>

          <div className="show-amenities">
            <h1 className="amenities-header">What this place offers</h1>
            <div className="amenities-type">
            <div className="amenities-wifi">
              <img src={wifiPic} alt="" />
              <div className="wifi-text">Wifi</div>
            </div>
            <div className="amenities-kitchen">
              <img src={kitchenPic} alt="" />
              <div className="kitchen-text">
                Kitchen
              </div>
            </div>
            <div className="amenities-workspace">
              <img src={workspacePic} alt="" />
              <div className="space-text">
                Dedicated workspace
              </div>
            </div>
            </div>


          </div>

          <div className="standalone-calendar">
            <div className="show-date-description">
              {differenceInDays(selectedRange?.to, selectedRange?.from) || 0} nights in {shortLocation}
            </div>
            <DayPickerWrapper
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            reservationRanges={reservationRanges}
            /> 
          </div>
        </div>

          <div className="reservation-form-container">
            <ReservationForm listingId={listingId} selectedRange={selectedRange} setSelectedRange={setSelectedRange} reservationRanges={reservationRanges}/>
           
          </div>
        
      </div>

      <div className="reviews-container">
        <ReviewsIndex listingId={listingId} reviews={reviews} />
      </div>

  

      <div className="show-map-container">
          <div className="map-text">Google Map coming soon!</div>
          {/* <div className="map-img">
            <img src="https://snowbnb-seeds.s3.amazonaws.com/skimap.jpg" alt="" />
          </div> */}
          <div className="show-map-container">
            <ListingMap
            listings={[listing]}
            mapOptions={{ center: { lat: listing.lat, lng: listing.long }}}
            />
          
          </div>
      </div>
      
    </div>
    
  )
}

export default ListingShow