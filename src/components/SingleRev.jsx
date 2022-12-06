import { useEffect, useState } from "react";
import {
  getComments,
  getReviewsList,
  ReviewVoteDec,
  ReviewVoteInc,
} from "../api";
import { useParams } from "react-router-dom";

export const SingleRev = () => {
  const { reviewId } = useParams();
  const [oneRev, setOneRev] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getReviewsList(reviewId)
      .then((review) => {
        setOneRev((rev) => {
          return review;
        });
      })
      .then(() => {
        return getComments(reviewId);
      })
      .then((comment) => {
        setComments((comm) => {
          setLoading(false);
          return comment;
        });
      });
  }, [reviewId]);

  const handleVoteInc = (id) => {
    setOneRev((currRev) => {
      return { ...oneRev, votes: oneRev.votes + 1 };
    });
    ReviewVoteInc(oneRev).then((res) => {});
  };

  const handleVoteDec = (id) => {
    ReviewVoteDec(oneRev).then((res) => {
        setOneRev((currRev) => {
          return { ...oneRev, votes: res.votes };
        });
      }
    ).catch((err)=>{
      alert("Request failed, please refresh the page or try again");
    }
    );
  };

  console.log(oneRev.votes);
  const handleVoteComm = () => {};

  const returnQuery = "";

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
          <p>Votes: {oneRev.votes}</p>
          <button
            onClick={(event) => {
              handleVoteInc(oneRev.review_id);
            }}
          >
            {" "}
            👍{" "}
          </button>{" "}
          &nbsp;
          <button
            onClick={(event) => {
              handleVoteDec(oneRev.review_id);
            }}
          >
            {" "}
            👎{" "}
          </button>
        </li>
        <br></br>
        <h4>Comments:</h4>
        <ul>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : (
            comments.map((com) => {
              return (
                <li key={com.comment_id}>
                  Username: {com.author}
                  <p>{com.body}</p>
                  <p>Created at: {com.created_at}</p>
                  <button onClick={handleVoteComm()}> 👍 {com.votes}</button>
                  <br></br>
                  <br></br>
                  <br></br>
                </li>
              );
            })
          )}
        </ul>
      </ul>
    </section>
  );
};
