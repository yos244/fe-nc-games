import { useEffect, useState } from "react";
import { getComments, getReviewsList } from "../api";
import { useParams } from "react-router-dom";

export const SingleRev = ({ loading, setLoading }) => {
  const { reviewId } = useParams();
  const [oneRev, setOneRev] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    getReviewsList(reviewId).then((review) => {
      setOneRev((rev) => {
        setLoading(false);
        return review;
      });
    });
  }, [reviewId]);

  useEffect(() => {
    setLoading(true);
    getComments(reviewId).then((comment) => {
      setComments((comm) => {
        setLoading(false);
        return comment;
      });
    });
  }, [reviewId]);
  const handleVote = () => {};

  const handleVoteComm = () => {};
  return loading ? (
    <p>Loading, Please wait ...</p>
  ) : (
    <section>
      <ul>
        <li key={oneRev.review_id}>
          <p>Title: {oneRev.title}</p> <br></br>
          <img src={oneRev.review_img_url} alt="" width="500" height="400" />
          <br></br>
          <p>Category: {oneRev.category}</p>
          <p>Owner: {oneRev.owner}</p>
          <p>Category: {oneRev.category}</p>
          <p>Designer: {oneRev.designer}</p>
          <p>Posted at: {oneRev.created_at}</p>
          <button onClick={handleVote}> 👍 {oneRev.votes}</button>
        </li>{" "}
        <br></br>
        <h4>Comments:</h4>
        <ul>
          {comments.map((com) => {
            return (
              <li key={com.comment_id}>
                Username: {com.author}
                <p>{com.body}</p>
                <p>Created at: {com.created_at}</p>
                <button onClick={handleVoteComm}> 👍 {com.votes}</button>
                <br></br>
                <br></br>
                <br></br>
              </li>
            );
          })}
        </ul>
      </ul>
    </section>
  );
};
