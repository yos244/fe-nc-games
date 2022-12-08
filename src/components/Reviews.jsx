import { useEffect, useState } from "react";
import { getReviews, getReviewsList } from "../api";
import { Routes, Route, Link, useParams } from "react-router-dom";

export const Reviews = ({revList, setRevList}) => {
  const [loading, setLoading] = useState(true);
const {category} = useParams()


  useEffect(() => {
    setLoading(true);
    getReviews(category).then((reviews) => {
      setRevList((revs) => {
        setLoading(false);
        return reviews;
      });
    });
    
  }, [category]);
 

  return loading ? (
    <p>Loading, Please wait ...</p>
  ) : (
    <section>
      <h3>Select a review</h3>
      <ul key="rev-list" className="Revs">
        {revList.map((review, index) => {
          return (
            <li key={review.review_id} className="single-rev">
              <Link to={`/reviews/${review.review_id}`} >{review.title}</Link> <br></br>
              <img src={review.review_img_url} alt ="" width="100" height="100"/><br></br>
              <br></br>
            </li>
          );
        })}
      </ul>
    </section>
  );
};


