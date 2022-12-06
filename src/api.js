import axios from "axios";

const nc_games_api = axios.create({
  baseURL: "https://itchy-rose-pea-coat.cyclic.app/api",
});

export const getListCategories = () => {
  return nc_games_api.get("/categories").then((res) => {
    return res.data;
  });
};

export const getReviewsList = (id) => {
  return nc_games_api.get(`/reviews/${id}`).then((res) => {
    return res.data;
  });
};


export const getComments = (id) => {
  return nc_games_api.get(`/reviews/${id}/comments`).then((res) =>{
  return res.data})
}