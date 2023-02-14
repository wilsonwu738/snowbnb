import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, getListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import './ListingIndex.css'

const ListingIndex = () => {
  const dispatch = useDispatch()
  const listings = useSelector(getListings)
  
  useEffect(() => {
    dispatch(fetchListings())
  }, [dispatch])

  const listingIndexItems = listings.map(listing => <ListingIndexItem key={listing.id} listing={listing} />)
  


  return (
    <div className="index-container">
      {listingIndexItems}
    </div>
  )




}



export default ListingIndex
