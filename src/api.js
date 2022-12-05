import axios from "axios";


const nc_games_api = axios.create({
    baseURL: "https://itchy-rose-pea-coat.cyclic.app/api",
  });

export const getListCategories = () =>{
    return nc_games_api.get("/categories").then((res) =>{
        return res.data
    })
} 


export const getReviewsList = () =>{
    return nc_games_api.get("/reviews").then((res) =>{
        return res.data
    })
} 
