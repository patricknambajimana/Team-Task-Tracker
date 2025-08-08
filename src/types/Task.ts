export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Completed" | "Incomplete" | "All";
export type DueDateType = "Overdue" | "Today" | "Upcoming" | "No Due Date";

export interface ITask {
  id?: number;
  name: string;
  priority: TaskPriority;
  category: string;
  dueDate?: string;
  assignedUser: string;
  assignedOn?: string;
  completed?: boolean;
}


