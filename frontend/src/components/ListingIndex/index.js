import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, getListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import './ListingIndex.css'
import FiltersBar from "../FiltersBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingModal from "../LoadingModal";



const ListingIndex = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const location = useLocation();
  const loading = useSelector((state) => state.ui.showLoading)
  
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
            <p>No listings available. <Link to="/">Go back to the homepage</Link></p>
          </div>
      }
      {loading && <LoadingModal/>}
    </ div>
  )




}



export default ListingIndex
