import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
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
          You must be logged in to comment.<Link to="/sign-in">Sign In</Link>
        </div>
      )}
    </div>
  );
}
