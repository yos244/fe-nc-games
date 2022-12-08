import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CatFilters = ({ revList, innerUrl }) => {
  const [filteredRev, setFilteredRev] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(false);

  useEffect(() => {
    setFilteredRev((currRev) => {
      setLoading(true);
      const newList = revList.filter((rev) => {
        if (rev.category === innerUrl) {
          return rev;
        }
      });
      return newList;
    });
    setLoading(false);
  }, [revList, innerUrl]);


  return loading ? (
    <p>Loading list, please wait ...</p>
  ) : (
    <section>
      <ul key="rev-list-DeBu">
        {filteredRev.map((review, index) => {
          return (
            <li key={review.review_id}>
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
