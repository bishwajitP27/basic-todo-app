import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { deleteData, getData, postData, updateData } from "./utils/fetchRequest";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const URL = "https://621535a9cdb9d09717b1e3a2.mockapi.io/todo-api/v1/tasks";

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (new Date(a.day) > new Date(b.day)) return 1;
      else if (new Date(a.day) < new Date(b.day)) return -1;
      else return 0;
    });
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const data = await getData();
    const sortedData = sortTasks(data);
    return sortedData;
  };

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
    const res = await deleteData(id);
    res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert("Error Deleting This Task");
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
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleStatus} onComplete={toggleStatus} />
        ) : (
          "No Tasks To Show"
        )}
      </main>
    </div>
  );
};

export default App;
