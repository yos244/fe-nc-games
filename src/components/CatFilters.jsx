import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const CatFilters = ({ revList }) => {
  const [filteredRev, setFilteredRev] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(false);
  const {category} = useParams()


  useEffect(() => {
    setFilteredRev((currRev) => {
      setLoading(true);
      const newList = revList.filter((rev) => {
        if (rev.category === category) {
          return rev;
        }
      });
      setLoading(false);
      return newList;
    });
  }, [revList, category]);

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
