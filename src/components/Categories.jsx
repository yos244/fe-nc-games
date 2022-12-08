import { getListCategories } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export const Categories = ({loading, setLoading , setInnerUrl}) => {

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
      <ul key="big-list" className="topnav">
        {catList.map((category, index) => {
          return (
              <Link to ={`/categories/${category.slug}`} onClick={((event)=>{
                  setInnerUrl (category.slug)
              })}>{category.slug}</Link>
          );
        })}
      </ul>
    </section>
  );
};
