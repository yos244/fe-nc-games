import { getListCategories } from "../api";
import { useEffect, useState } from "react";

export const CategoriesList = () => {
  const [catList, setCatList] = useState([]);
  useEffect(() => {
    getListCategories().then((categories) => {
      setCatList((currCat) => {
        return categories;
      });
    });
  }, []);
  console.log(catList);
  return (
    <section>
      <h2>Select a category</h2>
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
