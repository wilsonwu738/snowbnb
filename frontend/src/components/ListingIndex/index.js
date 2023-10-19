import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, getListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import './ListingIndex.css'
import FiltersBar from "../FiltersBar";
import { useLocation } from "react-router-dom";



const ListingIndex = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  const location = useLocation();
  
  useEffect(() => {
    dispatch(fetchListings())
    console.log(location)
  }, [dispatch,location])

  const listingIndexItems = listings.map(listing => <ListingIndexItem key={listing.id} listing={listing} />)
  


  return (
    <div className="outer-wrapper">
      <div className="filters-bar">
        <FiltersBar />
      </div>

      
      <div className="index-container">
        {listingIndexItems}
      </div>

    </ div>
  )




}



export default ListingIndex
