import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, getListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import { useHistory } from "react-router-dom";
import './ListingIndex.css'
import FiltersBar from "../FiltersBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ListingMap from "../ListingMap"




const ListingIndex = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const location = useLocation();
  const history = useHistory(); 

  const [bounds, setBounds] = useState(null);
  const [highlightedListing, setHighlightedListing] = useState(null);




  const mapEventHandlers = useMemo(() => ({
    click: event => {
      const search = new URLSearchParams(event.latLng.toJSON()).toString();
      history.push({ pathname: '/benches/new', search });
    },
    idle: map => setBounds(map.getBounds().toUrlValue())
  }), [history]);

  
  useEffect(() => {
    dispatch(fetchListings())
  }, [dispatch,location])

  const listingIndexItems = listings.map(listing => <ListingIndexItem key={listing.id} listing={listing} />)
  


  return (
    <div className="outer-wrapper">
      <div className="filters-bar">
        <FiltersBar />
      </div>

      {Object.keys(listings).length > 0 ?
        <div className="index-container">
          {listingIndexItems}
        </div>
       : <div className="bad-search">
            <p>No listings available. <Link to="/">Check out other houses</Link></p>
          </div>
      }

      <ListingMap
        listings={listings}
        mapEventHandlers={mapEventHandlers}
        markerEventHandlers={{
          click: (listing) => history.push(`/listings/${listing.id}`),
          mouseover: (listing) => setHighlightedListing(listing.id),
          mouseout: () => setHighlightedListing(null)
        }}
        highlightedListing={highlightedListing} 
       
      />
     
    </ div>
  )




}



export default ListingIndex
