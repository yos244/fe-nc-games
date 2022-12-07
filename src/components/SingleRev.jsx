import { useEffect, useState } from "react";
import {
  getComments,
  getReviewsList,
  postComment,
  reviewVoteDec,
  reviewVoteInc,
} from "../api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const SingleRev = () => {
  const { reviewId } = useParams();
  const [oneRev, setOneRev] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComm, setLoadingComm] = useState(true);
  const [input, setInput] = useState("");
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getReviewsList(reviewId)
      .then((review) => {
        setOneRev((rev) => {
          setLoading(false)
          return review;
        });
      })
      .then(() => {
        setLoadingComm(true)
        return getComments(reviewId);
      })
      .then((comment) => {
        setComments((comm) => {
          setLoadingComm(false);
          return comment;
        });
      });
  }, [reviewId]);

  const handleVoteInc = (id) => {
    setOneRev((currRev) => {
      return { ...oneRev, votes: oneRev.votes + 1 };
    });
    reviewVoteInc(oneRev)
      .then((res) => {})
      .catch((err) => {
        alert("Request failed, please refresh the page or try again");
        setOneRev((currRev) => {
          return { ...oneRev, votes: oneRev.votes };
        });
      });
  };

  const handleVoteDec = (id) => {
    setOneRev((currRev) => {
      return { ...oneRev, votes: oneRev.votes - 1 };
    });
    reviewVoteDec(oneRev)
      .then((res) => {})
      .catch((err) => {
        alert("Request failed, please refresh the page or try again");
        setOneRev((currRev) => {
          return { ...oneRev, votes: oneRev.votes };
        });
      });
  };

  const handlePostButton = (text) => {
    setLoadingComm(true)
    const regex = /^[^-\s][a-zA-Z0-9_\s-]+$/;
    if (!regex.test(text.body)) {
      alert("Please start typing a text");
    } else {
      const sentComment = {id:text.id, username: username, body: text.body };
      postComment(sentComment).then((res) => {
        setComments((currComm)=>{
          setLoadingComm(false)
          alert("Comment posted successfully")
          return [...currComm, res]
        })
      });
    }
  };

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
              return loadingComm? (<p>Loading, please wait ...</p>) : (
                <li key={com.comment_id}>
                  Username: {com.author}
                  <p>{com.body}</p>
                  <p>Created at: {com.created_at}</p>
                  <button> 👍 {com.votes}</button>
                  <br></br>
                  <br></br>
                  <br></br>
                </li>
              );
            })
          )}
          <input
            type="textbox"
            placeholder="Write a Comment"
            id="comment-box"
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></input>{" "}
          <button
            onClick={(event) => {
              handlePostButton({id:oneRev.review_id ,body:input});
            }}
          >
            Post
          </button>
        </ul>
      </ul>
    </section>
  );
};
