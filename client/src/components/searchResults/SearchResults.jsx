import React from 'react'
import Topbar from '../topbar/Topbar';
import { useParams } from 'react-router';
export default function SearchResults() {
    const query = useParams().query;
    return (
      <>
        <Topbar/>
        <div>{query}</div>
      </>
  )
}
        //load all the users here
        //probably need to add search input as a param
        //need to make a separate component similar to Post

