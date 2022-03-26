import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { deleteData, getData, postData, updateData } from "./utils/fetchRequest";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (new Date(a.day) > new Date(b.day)) return 1;
      else if (new Date(a.day) < new Date(b.day)) return -1;
      else return 0;
    });
  };

  useEffect(() => {
    // Fetch task list
    const getTasks = async () => {
      const tasks = await getData();
      const sortedTasks = sortTasks(tasks);
      setTasks(sortedTasks);
    };

    getTasks();
  }, []);

  // Fetch Task
  const fetchTask = async (id) => {
    const data = await getData(id);
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const data = await postData(task);
    const updatedData = sortTasks([...tasks, data]);
    setTasks(updatedData);
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteData(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      alert("Error Deleting This Task");
    }
  };

  // Toggle Reminder
  const toggleStatus = async (id, action, event) => {
    const taskToToggle = await fetchTask(id);
    let updatedTask;
    if (action === "reminder") {
      updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    } else {
      updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
    }

    const data = await updateData(updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder, completed: data.completed } : task)));
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <main>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleStatus} onComplete={toggleStatus} />
        ) : (
          "No Tasks To Show"
        )}
      </main>
    </div>
  );
};

export default App;
