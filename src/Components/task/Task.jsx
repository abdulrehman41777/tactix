import React, { useState } from "react";
import style from "./task.module.css";
import { FaSquareCheck } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const Task = () => {
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState([
    { id: 1, task: "Landing Page Design", completed: false },
    { id: 2, task: "Dashboard Builder", completed: false },
    { id: 3, task: "Mobile App Design", completed: false },
    { id: 4, task: "Illustrations", completed: false },
    { id: 5, task: "Promotional LP", completed: false },
  ]);

  const handleDeleteTask = (id) => {
    const filterdData = updatedTask.filter((item) => item.id !== id);
    setUpdatedTask(filterdData);
  };

  const addNewTask = (e) => {
    e.preventDefault();
    const newID = updatedTask.length + 1;
    setUpdatedTask([
      ...updatedTask,
      { id: newID, task: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = updatedTask.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    setUpdatedTask(updatedTasks);
  };

  return (
    <div className={style.task_wrapper}>
      <div className={style.task_head_wrapper}>
        <div className={style.task_head}>
          <div className={style.task_check_head}>
            <FaSquareCheck className={style.icon} />
          </div>
          <h3>Task</h3>
        </div>
        <div className={style.task_head_dots}>
          {addTask ? (
            <MdCancel
              onClick={() => setAddTask(false)}
              style={{ cursor: "pointer" }}
              className={style.icon}
            />
          ) : (
            <IoIosAddCircle
              className={style.icon}
              style={{ cursor: "pointer" }}
              onClick={() => setAddTask(true)}
            />
          )}
        </div>
      </div>
      {addTask && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        >
          <form onSubmit={addNewTask} className="w-100">
            <input
              type="text"
              className="w-100"
              value={newTask}
              style={{
                border: "none",
                background: "#0B1437",
                borderRadius: "50px",
                padding: "0.5rem",
                outline: "none",
                paddingLeft: "1rem",
              }}
              onChange={(e) => setNewTask(e.target.value)}
              maxLength="25"
              placeholder="Add Tasks..."
            />
          </form>
        </div>
      )}
      <div className={style.task_list_wrapper}>
        {updatedTask.map((item, index) => (
          <div className={style.tasks} key={index}>
            <div className={style.task_head}>
              <div className={style.task_check_head}>
                <input
                  type="checkbox"
                  onChange={() => toggleTaskCompletion(item.id)}
                  checked={item.completed}
                />
              </div>
              <h6
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item?.task}
              </h6>
            </div>
            <div className={style.task_head_dots}>
              <MdCancel
                className={style.icon}
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteTask(item?.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
