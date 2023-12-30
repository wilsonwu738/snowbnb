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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';
import BottomBar from "../BottomBar";






const ListingIndex = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const location = useLocation();
  const history = useHistory(); 

  // const [bounds, setBounds] = useState(null);
  const [highlightedListing, setHighlightedListing] = useState(null);

  const [showMap, setShowMap] = useState(false);




  const mapEventHandlers = useMemo(() => ({
    // click: event => {
    //   const search = new URLSearchParams(event.latLng.toJSON()).toString();
    //   history.push({ pathname: '/benches/new', search });
    // },
    // idle: map => setBounds(map.getBounds().toUrlValue())
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
      <div className={`content-container ${showMap ? 'show-map' : ''}`}>

        {Object.keys(listings).length > 0 ?
          <div className={`index-container ${!showMap ? 'show-index' : ''}`}>
            {listingIndexItems}
          </div>
         : <div className="bad-search">
              <p>No listings available. <Link to="/">Check out other houses</Link></p>
            </div>
        }
        <div className={`index-map-container ${showMap ? 'show-map' : ''}`}>

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
          </div>
      </div>
      <button className="showmap-button" onClick={() => setShowMap(!showMap)}>
        {showMap ? 'Show Listings' : 'Show Map'}
        <div className="showmap-icon">
          {showMap ? <FontAwesomeIcon icon={faList} /> : <FontAwesomeIcon icon={faMap} />}
        </div>
      </button>
      
    </ div>
  )




}



export default ListingIndex
