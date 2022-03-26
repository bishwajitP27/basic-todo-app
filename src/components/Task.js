import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        <div className="input-group">
          <input type="checkbox" value="completed" checked={completeTask} onChange={completeTaskHandler} />
          {completed ? <div className="inner-checkbox"></div> : null}
        </div>
        <div>
          <h3>{text}</h3>
          <p>{date}</p>
        </div>
      </section>
      <section className="delete-task">
        <RiDeleteBin6Line className="delete-icon" onClick={() => onDelete(task.id)} />
      </section>
    </div>
  );
};

export default Task;
