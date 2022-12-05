import { getListCategories } from "../api";
import { useEffect, useState } from "react";


export const CategoriesList = ({loading, setLoading}) => {
  const [catList, setCatList] = useState([]);
  useEffect(() => {
    getListCategories().then((categories) => {
      setCatList((cats) => {
        setLoading(false)
        return categories
      });
    });
  }, []);

  return loading ? (<p>Loading, Please wait ...</p>) : (
    <section>
      <h2>Categories</h2>
      <ul key="big-list">
        {catList.map((category, index) => {
          return (
            <li key={category.slug}>
              <a href="">{category.slug}</a>
              <p>{category.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
