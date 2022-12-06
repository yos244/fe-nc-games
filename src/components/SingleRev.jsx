import { useEffect, useState } from "react";
import { getReviewsList } from "../api";
import { useParams } from "react-router-dom";



export const SingleRev = ({loading, setLoading}) => {
  const {reviewId} = useParams()
  const [oneRev, setOneRev] = useState({})
  useEffect(() => {
    getReviewsList(reviewId).then((review) => {
      setOneRev((rev) => {
        setLoading(false);
        console.log(review);
        return review;
      });
    });
    
  }, [reviewId]);
  return (
    <section>
      <ul>
      <li key={oneRev.review_id}>
<p>Title: {oneRev.title}</p> <br></br>
<img src={oneRev.review_img_url} alt ="" width="500" height="400"/><br></br>
<p>Category: {oneRev.category}</p>
<p>Owner: {oneRev.owner}</p> 
<p>Designer: {oneRev.designer}</p>
<p>Posted at: {oneRev.created_at}</p>
<p>Comments: {oneRev.comment_count}</p></li>
      </ul>
    </section>
  )
};
