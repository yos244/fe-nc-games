import { useEffect, useState } from "react";
import { getReviews, getReviewsList } from "../api";
import {  Link, useParams } from "react-router-dom";
import { SortButtons } from "./SortButtons";
import { WrongCat } from "./WrongCat";
import { Routes, Route } from "react-router-dom";


export const Reviews = ({ revList, setRevList }) => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [sort, setSort] = useState(`None`);
  const [order, setOrder] = useState(`asc`);
const [invalidCat, setInvalidCat] = useState(false)

  useEffect(() => {
    setInvalidCat(false)
    let sort_by= ``
    if (sort !== `None`) {
      sort_by = sort
    } 
    setLoading(true); 
    getReviews(category,sort_by,order).then((reviews) => {
      setRevList((revs) => {
        setLoading(false); 
        return reviews;     
    });
    }).catch((err)=>{
      setLoading(false)
      setInvalidCat(true)
    })
    
  }, [category,sort,order]);

  return loading ? (
    <p>Loading, Please wait ...</p>
  ) : ( invalidCat? (<WrongCat />) :
    <section>
      <SortButtons
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />
      <h3>Select a review</h3>
      <ul key="rev-list" className="Revs">
        {revList.map((review, index) => {
          return (
            <li key={review.review_id} className="single-rev">
              <Link to={`/reviews/${review.review_id}`}>{review.title}</Link>{" "}
              <br></br>
              <img
                src={review.review_img_url}
                alt=""
                width="100"
                height="100"
              />
              <br></br>
              <br></br>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
