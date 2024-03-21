import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Textarea, Alert } from "flowbite-react";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments])
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-600 text-md">
          <p>Signed in as: </p>
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-sm text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div>
          You must be logged in to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline mx-2">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          className="border border-teal-500 p-3 rounded-md"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comments yet!</p>
      ) : (
        <>
          <p className="my-4 text-gray-700 flex items-center gap-1 dark:text-gray-300">
            Comments:{" "}
            <span className="border border-gray-600 dark:border-gray-400 py-1 px-2">
              {comments.length}
            </span>
          </p>
          {comments.map((comment) => (
            <div className="flex justify-center w-full my-2 ">
              <Comment key={comment._id} comment={comment} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
