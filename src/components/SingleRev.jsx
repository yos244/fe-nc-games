import { useEffect, useState } from "react";
import {
  deleteComment,
  getComments,
  getReviewsList,
  postComment,
  reviewVoteDec,
  reviewVoteInc,
} from "../api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { NoValidRev } from "./NoValidRev";

export const SingleRev = () => {
  const { reviewId } = useParams();
  const [oneRev, setOneRev] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComm, setLoadingComm] = useState(true);
  const [input, setInput] = useState("");
  const { username, setUsername } = useContext(UserContext);
  const [voted, setVoted] = useState(false);
  const [deletingComm, setDeletingComm] = useState(false);
  const [posting, setPosting] = useState(``);
  const [voting, setVoting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [noValidRev, setNoValidRev] = useState(false);

  useEffect(() => {
    setNoValidRev(false);
    setLoading(true);
    getReviewsList(reviewId)
      .then((review) => {
        setOneRev((rev) => {
          setLoading(false);
          return review;
        });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setNoValidRev(true);
      })
      .then(() => {
        setLoadingComm(true);
        return getComments(reviewId);
      })
      .then((comment) => {
        setComments((comm) => {
          setLoadingComm(false);
          return comment;
        });
      });
  }, [reviewId]);

  useEffect(() => {
    setLoadingComm(true);
    getReviewsList(reviewId)
      .then(() => {
        setLoadingComm(false);
        return getComments(reviewId);
      })
      .then((comment) => {
        setComments((comm) => {
          setLoadingComm(false);
          return comment;
        });
      });
    setLoadingComm(false);
  }, [reviewId, deletingComm, deleteMsg]);

  const handleVoteInc = (id) => {
    if (voted === true) {
      alert("Already voted");
    } else {
      setOneRev((currRev) => {
        setVoted(true);
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
    }
  };

  const handleVoteDec = (id) => {
    if (voted === true) {
      alert("Already voted");
    } else {
      setOneRev((currRev) => {
        setVoted(true);
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
    }
  };

  const handlePostButton = (text) => {
    setLoadingComm(true);
    const regex = /^(?!\s)[\s\S]*$/;
    if (!regex.test(text.body) || text.body === ``) {
      alert("Please start typing a text");
      setLoadingComm(false);
      setPosting(``);
    } else {
      const sentComment = { id: text.id, username: username, body: text.body };
      postComment(sentComment).then((res) => {
        setComments((currComm) => {
          setLoadingComm(false);
          setPosting(``);
          return [res, ...currComm];
        });
      });
    }
  };

  const handleDeleteComment = (id) => {
    setDeleteMsg(true);
    setDeletingComm(true);
    setLoadingComm(true);
    deleteComment(id)
      .then((res) => {
        setDeletingComm(false);
        setLoadingComm(false);
        setPosting(``);
        setTimeout((func)=>{
          setDeleteMsg(false)
        }, 3000);
      })
      .catch((err) => {
        alert(`Could not delete comment`);
        setDeletingComm(false);
        setLoadingComm(false);
        setPosting(``);
        setDeleteMsg(false);
      });
  };
  const date = new Date(oneRev.created_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const timeFormat = hours >= 12 ? `PM` : `AM`;
  if (hours > 12) hours -= 12;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  return noValidRev ? (
    <NoValidRev />
  ) : loading ? (
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
          <p>
            Posted at:{" "}
            {day +
              "/" +
              month +
              "/" +
              year +
              " " +
              "At " +
              hours +
              ":" +
              minutes +
              " " +
              timeFormat}
          </p>
          <p>Votes: {oneRev.votes}</p>
          {!voting ? (
            <button
              onClick={(event) => {
                setVoting(true);
                handleVoteInc(oneRev.review_id);
                setVoting(false);
              }}
            >
              {" "}
              👍{" "}
            </button>
          ) : (
            <p></p>
          )}
          &nbsp;
          {!voting ? (
            <button
              onClick={(event) => {
                setVoting(true);
                handleVoteDec(oneRev.review_id);
                setVoting(false);
              }}
            >
              👎
            </button>
          ) : (
            <p></p>
          )}
        </li>
        <br></br>
        <h4>Comments:</h4>
        <ul>
          <input
            type="textbox"
            placeholder="Write a Comment"
            id="comment-box"
            onChange={(event) => {
              setInput(event.target.value);
              console.log(event);
              if (event.keyCode===13) {
                setPosting(`Posting`);
                handlePostButton({ id: oneRev.review_id, body: input });
                setInput(``);
              }
            }}
            value={input}
          ></input>{" "}
          <button
            onClick={(event) => {
              setPosting(`Posting`);
              handlePostButton({ id: oneRev.review_id, body: input });
              setInput(``);
            }}
          >
            Post
          </button>
          <br></br>
          <br></br>
          <br></br>
          <p>{posting}</p>
          <br></br>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : deleteMsg ? (
            <p className="comment-delete-message">Comment Deleted</p>
          ) : null}
          {comments.map((com) => {
            const commDate = new Date(com.created_at);
            const commYear = commDate.getFullYear();
            const commMonth = commDate.getMonth() + 1;
            const commDay = commDate.getDate();
            let commHours = commDate.getHours();
            const commTimeFormat = commHours >= 12 ? `PM` : `AM`;
            if (commHours > 12) commHours -= 12;
            let commMinutes = commDate.getMinutes();
            if (commMinutes < 10) commMinutes = `0${commMinutes}`;
            if (commHours < 10) commHours = `0${commHours}`;
            return loadingComm ? (
              <p>Loading, please wait ...</p>
            ) : (
              <li key={com.comment_id}>
                Username: {com.author}
                <p>{com.body}</p>
                <p>
                  Created at:{" "}
                  {commDay +
                    "/" +
                    commMonth +
                    "/" +
                    commYear +
                    " At " +
                    commHours +
                    ":" +
                    commMinutes +
                    " " +
                    commTimeFormat}
                </p>
                <button> 👍 {com.votes}</button>
                <br></br>
                <br></br>
                <deleteb>
                  {com.author === username ? (
                    <button
                      className="Delete-button"
                      onClick={(event) => {
                        setPosting(`Deleting`);
                        handleDeleteComment(com.comment_id);
                      }}
                    >
                      Delete Comment
                    </button>
                  ) : (
                    <p></p>
                  )}
                </deleteb>
                <br></br>
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
