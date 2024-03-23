import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center w-full my-8 gap-6">
        <div className="flex justify-between bg-gray-200 dark:bg-slate-600 w-full sm:w-64 h-40 p-5 rounded-lg">
          <div className=" flex flex-col gap-2">
            <h3 className="text-md dark:text-gray-200 uppercase">
              Total Users
            </h3>
            <p className="text-2xl dark:text-gray-200">{totalUsers}</p>
            <div className="flex items-start gap-2 my-2 text-md">
              <span className="flex text-green-500 items-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <p className=" dark:text-gray-200">Last Month's</p>
            </div>
          </div>
          <HiOutlineUserGroup className="bg-teal-600 text-white text-5xl p-3 rounded-full" />
        </div>
        <div className="flex justify-between bg-gray-200 dark:bg-slate-600 w-full sm:w-64 h-40 p-5 rounded-lg">
          <div className=" flex flex-col gap-2">
            <h3 className="text-md dark:text-gray-200 uppercase">
              Total Posts
            </h3>
            <p className="text-2xl dark:text-gray-200">{totalPosts}</p>
            <div className="flex items-start gap-2 my-2 text-md">
              <span className="flex text-green-500 items-center">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <p className=" dark:text-gray-200">Last Month's</p>
            </div>
          </div>
          <HiDocumentText className="bg-indigo-600 text-white text-5xl p-3 rounded-full" />
        </div>
        <div className="flex justify-between bg-gray-200 dark:bg-slate-600 w-full sm:w-64 h-40 p-5 rounded-lg">
          <div className=" flex flex-col gap-2">
            <h3 className="text-md dark:text-gray-200 uppercase">
              Total Comments
            </h3>
            <p className="text-2xl dark:text-gray-200">{totalComments}</p>
            <div className="flex items-start gap-2 my-2 text-md">
              <span className="flex text-green-500 items-center">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <p className=" dark:text-gray-200">Last Month's</p>
            </div>
          </div>
          <HiAnnotation className="bg-lime-600 text-white text-5xl p-3 rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-5 justify-center my-7">
        <div className="w-full md:w-96 min-w-[300px] bg-gray-200 dark:bg-slate-600 p-3 rounded-lg">
          <div className="flex justify-between items-center text-md mb-2 font-semibold">
            <h1>Recent Users</h1>
            <Link to="/dashboard?tab=users">
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <div className="table-auto">
            <Table hoverable>
              <TableHead className="divide-y text-gray-700 dark:text-gray-200">
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
              </TableHead>
              {users &&
                users.map((user) => (
                  <TableBody className="divide-y text-gray-700 dark:text-gray-200">
                    <TableRow key={user._id}>
                      <TableCell>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>
        <div className="w-full sm:w-auto min-w-[300px] bg-gray-200 dark:bg-slate-600 p-3 rounded-lg">
          <div className="flex justify-between items-center text-md mb-2 font-semibold">
            <h1>Recent Comments</h1>
            <Link to="/dashboard?tab=comments">
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <div className="table-auto">
            <Table hoverable>
              <TableHead className="divide-y text-gray-700 dark:text-gray-200">
                <TableHeadCell>Comment Content</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableHead>
              {comments &&
                comments.map((comment) => (
                  <TableBody className="divide-y text-gray-700 dark:text-gray-200">
                    <TableRow key={comment._id}>
                      <TableCell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </TableCell>
                      <TableCell>{comment.numberOfLikes}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>
        <div className="w-full sm:w-auto min-w-[300px] bg-gray-200 dark:bg-slate-600 p-3 rounded-lg">
          <div className="flex justify-between items-center text-md mb-2 font-semibold">
            <h1>Recent Posts</h1>
            <Link to="/dashboard?tab=users">
              <Button gradientDuoTone="purpleToPink" outline>
                See all
              </Button>
            </Link>
          </div>
          <div className="table-auto">
            <Table hoverable>
              <TableHead className="divide-y text-gray-700 dark:text-gray-200">
                <TableHeadCell className="w-28">Post Image</TableHeadCell>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableHead>
              {posts &&
                posts.map((post) => (
                  <TableBody className="divide-y text-gray-700 dark:text-gray-200">
                    <TableRow key={post._id}>
                      <TableCell className="w-28">
                        <img
                          src={post.image}
                          className="h-10 w-14 rounded-md "
                        />
                      </TableCell>
                      <TableCell className="w-96">
                        <Link to={`/post/${post.slug}`}>
                          <p className="line-clamp-2 hover:underline cursor-pointer">
                            {post.title}
                          </p>
                        </Link>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
