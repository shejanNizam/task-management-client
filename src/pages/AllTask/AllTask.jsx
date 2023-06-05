import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRev, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllTask = () => {
  const [tasks, setTasks] = useState();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-management-server-alpha.vercel.app/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task deleted Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              const remaining = tasks.filter((task) => task?._id !== id);
              setTasks(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    fetch(`https://task-management-server-alpha.vercel.app/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "updated" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          const remaining = tasks.filter((task) => task?._id !== id);
          const updated = tasks.find((task) => task?._id === id);
          updated.status = "updated";
          const newTasks = [updated, ...remaining];
          setTasks(newTasks);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`https://task-management-server-alpha.vercel.app/tasks`)
      .then((data) => {
        setTasks(data.data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>All Task | Task Management</title>
      </Helmet>
      <div className="overflow-x-auto w-full py-20">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={task?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{task.title}</td>
                <td className="">{task.description}</td>
                <td>
                  {task?.status === "updated" ? (
                    <span className="font-bold text-secondary ">Updated</span>
                  ) : (
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="btn btn-ghost bg-gray-600  text-white"
                    >
                      <FaRev />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllTask;
