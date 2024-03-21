import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {}
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex flex-row p-4 border-b border-gray-400 dark:border-gray-600   items-center w-full md:w-[40vw]">
      {user && (
        <div>
          <img
            src={user.profilePicture}
            alt={user.username}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      )}
      <div className="mx-4">
        <span className="font-semibold mr-2 text-sm">
          {user ? `@${user.username}` : "Anonymous user"}
        </span>
        <span className="text-gray-600 text-sm dark:text-gray-300 ">
          {moment(comment.createdAt).fromNow()}
        </span>

        <p className="text-gray-500 dark:text-gray-300 pb-2">
          {comment.content}
        </p>
        <div>
          <button
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <span className="text-gray-500 ml-2">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </span>
        </div>
      </div>
    </div>
  );
}
