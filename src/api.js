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
  return nc_games_api.get(`/reviews/${id}/comments`).then((res) => {
    return res.data;
  });
};


export const reviewVoteInc = (body) => {
  const patchedBody = {inc_votes: 1}
    return nc_games_api.patch(`/reviews/${body.review_id}`,patchedBody).then((res) => {
      return res.data;
    });
  };
  
  
  export const reviewVoteDec = (body) => {
    const patchedBody = {inc_votes: -1}
      return nc_games_api.patch(`/reviews/${body.review_id}`,patchedBody).then((res) => {
        return res.data;
      });
    };