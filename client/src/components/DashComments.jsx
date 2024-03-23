import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ModalBody,
  ModalHeader,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, []);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto md:mx-auto overflow-x-scroll  scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-400   dark:scrollbar-thumb-slate-600 p-3 md:overflow-x-auto sm:max-w-[70vw]">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md divide-y ">
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Number of Likes</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>UserId</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {comments.map((comment) => (
                <TableRow
                  className="bg-white dark:bg-gray-800 divide-x"
                  key={comment._id}
                >
                  <TableCell className="text-gray-800 dark:text-white">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium ">
                    <p className="line-clamp-3">{comment.content}</p>
                  </TableCell>
                  <TableCell className="font-medium">
                    {comment.numberOfLikes}
                  </TableCell>
                  <TableCell className="font-medium">
                    {comment.postId}
                  </TableCell>
                  <TableCell className="font-medium">
                    {comment.userId}
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-red-600 dark:text-red-500 hover:underline cursor-pointer font-medium"
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm py-5 self-center font-medium"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet.</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="h-24"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-12 w-12 text-gray-400 dark:text-gray-200 mx-auto mb-4" />
            <h3 className="mx-auto mb-5  text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this Comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
