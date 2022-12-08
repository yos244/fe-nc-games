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

export const getReviews = (category,sort_by,order_by) => {
  return nc_games_api.get(`/reviews`,{params:{category:category, sort_by:sort_by, order_by:order_by}}).then((res) => {
    return res.data;
  });
};


export const getComments = (id) => {
  return nc_games_api.get(`/reviews/${id}/comments`).then((res) => {
    return res.data;
  });
};

export const reviewVoteInc = (body) => {
  const patchedBody = { inc_votes: 1 };
  return nc_games_api
    .patch(`/reviews/${body.review_id}`, patchedBody)
    .then((res) => {
      return res.data;
    });
};

export const reviewVoteDec = (body) => {
  const patchedBody = { inc_votes: -1 };
  return nc_games_api
    .patch(`/reviews/${body.review_id}`, patchedBody)
    .then((res) => {
      return res.data;
    });
};

export const postComment = (comment) => {
  const postedComment = { username: comment.username, body: comment.body };
  return nc_games_api
    .post(`/reviews/${comment.id}/comments`, postedComment)
    .then((res) => {
      return res.data;
    });
};
