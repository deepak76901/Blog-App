import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative max-w-[350px] overflow-hidden h-[350px] transition-all border border-teal-400 rounded-lg hover:border-2">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[220px] w-[350px] object-cover  group-hover:h-[175px] transition-all duration-300 z-20"
        />
        <div className="flex flex-col gap-1 justify-center p-3 w-full">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic">{post.category}</span>
          <Link
            to={`/post/${post.slug}`}
            className="  absolute text-md left-0 right-0 bottom-[-75px]  group-hover:bottom-4 border-2  border-teal-400  h-12 w-5/6 flex justify-center  items-center rounded-lg hover:bg-teal-400 mx-auto !rounded-tl-none"
          >
            Read article
          </Link>
        </div>
      </Link>
    </div>
  );
}
