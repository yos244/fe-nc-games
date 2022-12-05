import { useEffect, useState } from "react";
import { getReviewsList } from "../api";

export const Reviews = ({ loading, setLoading }) => {
  const [revList, setRevList] = useState([]);

  useEffect(() => {
    getReviewsList().then((reviews) => {
      setRevList((revs) => {
        setLoading(false);
        return reviews;
      });
    });
  }, []);
  console.log(revList);

  return loading ? (
    <p>Loading, Please wait ...</p>
  ) : (
    <section>
      <h3>Categories</h3>
      <ul key="rev-list">
        {revList.map((review, index) => {
          return (
            <li key={review.review_id}>
              <p>title: {review.title}</p>
              <img src={review.review_img_url} alt ="" width="500" height="400"/>
              <p>Category: {review.category}</p>
              <p>Owner: {review.owner}</p>
              <a href="">{}</a>
              <p>{review.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
