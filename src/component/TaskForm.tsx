import { useTasks } from "../hook/useTask";
import { useState } from "react";
import type { ITask } from "../types/Task";

const TaskForm: React.FC = () => {
  const [tasks, setTasks] = useTasks();

  const [formData, setFormData] = useState({
    name: "",
    assignedUser: "",
    priority: "Low",
    category: "Frontend",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newTask: ITask = {
      id: Date.now(),
      name: formData.name,
      assignedUser: formData.assignedUser,
      priority: formData.priority,
      category: formData.category,
      dueDate: new Date(formData.dueDate).toISOString(),
      assignedOn: new Date().toISOString(),
      completed: false,
    };

    setTasks([...tasks, newTask]);

    // Reset form
    setFormData({
      name: "",
      assignedUser: "",
      priority: "Low",
      category: "Frontend",
      dueDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center underline capitalize">
          Team Task Tracker
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label className="block text-blue-700 text-lg mb-1 capitalize">
              Enter the task
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the name of task"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-1 capitalize">
              Assigned User
            </label>
            <input
              name="assignedUser"
              type="text"
              value={formData.assignedUser}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-1 capitalize">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg mb-1 capitalize">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Meeting">Meeting</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-lg mb-1 capitalize">
              Due Date
            </label>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
