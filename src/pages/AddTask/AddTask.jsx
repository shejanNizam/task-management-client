import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch(`https://task-management-server-alpha.vercel.app/tasks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Add a Task | Task Management</title>
      </Helmet>
      <div className="py-20 bg-gray-300">
        <form
          className=" w-1/2 mx-auto my-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="rounded p-2"
            placeholder="title"
            {...register("title")}
          />
          <input
            className="ms-4 rounded p-2"
            placeholder="description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>This field is required</span>}
          <br />
          <input
            className="mt-4 rounded p-2"
            placeholder="status"
            {...register("status")}
          />
          <input
            className="mt-4 ms-4 rounded p-2"
            placeholder="days"
            {...register("days")}
          />
          <br />
          <input
            className="btn btn-primary btn-sm mt-4"
            type="submit"
            value="Add Task"
          />
        </form>
      </div>
    </>
  );
};

export default AddTask;
