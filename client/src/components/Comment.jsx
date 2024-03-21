import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
  const [user, setUser] = useState(null);

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
    <div className="flex flex-row p-4 border border-gray-400 dark:border-gray-600  rounded-md  items-center w-full md:w-[40vw]">
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

        <p className="text-gray-500 dark:text-gray-300 pb-2">{comment.content}</p>
      </div>
    </div>
  );
}
