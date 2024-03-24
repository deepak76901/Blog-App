import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts?limit=6`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 py-10 px-6 md:py-20 md:px-16 max-w-4xl ">
        <h1 className="text-gray-700 dark:text-gray-200 text-3xl font-bold md:text-5xl">
          Welcome to my Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-300  text-sm md:text-base">
          Here you'll find a variety of articles and tutorials on topics such as
          web developement, software engineering, and pogramming languages.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-base font-semibold italic hover:underline text-teal-500"
        >
          View all Posts
        </Link>
      </div>
      <div className="p-5 bg-amber-100 dark:bg-slate-700 ">
        <CallToAction />
      </div>
      <div className="max-w-6xl p-3 mx-auto  py-7 gap-8">
        {posts && posts.length > 0 && (
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl text-gray-800 font-bold text-center mb-6">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <span className="px-6 py-4 text-center">
              <Link
                to="/search"
                className="text-base sm:text-lg font-semibold italic hover:underline text-teal-600 "
              >
                View all Posts
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
