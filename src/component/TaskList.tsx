import React, { useState } from "react";
import { useTasks } from "../hook/useTask";
import type { ITask } from "../types/Task";
import type {TaskStatus } from "../types/Task"

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useTasks();

  // Filter states
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [assignedUserFilter, setAssignedUserFilter] = useState("");

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Incomplete" && !task.completed);

    const matchPriority = priorityFilter ? task.priority === priorityFilter : true;
    const matchCategory = categoryFilter ? task.category === categoryFilter : true;
    const matchAssignedUser = assignedUserFilter
      ? task.assignedUser.toLowerCase().includes(assignedUserFilter.toLowerCase())
      : true;

    return matchStatus && matchPriority && matchCategory && matchAssignedUser;
  });

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border px-2 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Meeting">Meeting</option>
          <option value="Design">Design</option>
        </select>

        <input
          type="text"
          placeholder="Assigned User"
          value={assignedUserFilter}
          onChange={(e) => setAssignedUserFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Task Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Task</th>
            <th className="py-3 px-4 text-left">Assigned To</th>
            <th className="py-3 px-4 text-left">Priority</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Due Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task: ITask) => (
            <tr
              key={task.id}
              className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-2 px-4">{task.name}</td>
              <td className="py-2 px-4">{task.assignedUser}</td>
              <td className="py-2 px-4">{task.priority}</td>
              <td className="py-2 px-4">{task.category}</td>
              <td className="py-2 px-4">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No Due Date"}
              </td>
              <td className="py-2 px-4">
                {task.completed ? (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="text-sm px-2 py-1 bg-green-500 text-white rounded">
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
