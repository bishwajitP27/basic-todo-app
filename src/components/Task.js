import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  let { text, date, id, completed, reminder } = task;
  const [completeTask, setCompleteTask] = useState(completed);
  text = text[0].toUpperCase() + text.substring(1);
  date = new Date(task.day).toDateString();

  const completeTaskHandler = () => {
    setCompleteTask(!completed);
    return onToggle(id, "complete");
  };
  return (
    <div className={`task ${reminder && "reminder"} ${completed && "completed"}`} onDoubleClick={() => onToggle(id, "reminder")}>
      <section className="task-data">
        <input type="checkbox" value="completed" checked={completeTask} onChange={completeTaskHandler} />
        <h3>
          {text} <FaTimes style={{ color: "red", cursor: "pointer" }} onClick={() => onDelete(task.id)} />
        </h3>
      </section>
      <p className="task-date">{date}</p>
    </div>
  );
};

export default Task;
