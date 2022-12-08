import { getListCategories } from "../api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Categories = ({ loading, setLoading }) => {
  const [catList, setCatList] = useState([]);
  useEffect(() => {
    getListCategories().then((categories) => {
      setCatList((cats) => {
        setLoading(false);
        return categories;
      });
    });
  }, []);



  return loading ? (
    <p>Loading, Please wait ...</p>
  ) : (
    <section>
      <ul key="big-list" className="topnav">
        <h2 className="topnav">Categories</h2>
        {catList.map((category, index) => {
          return (
            <Link
              to={`/categories/${category.slug}`}
            >
              {category.slug}
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
