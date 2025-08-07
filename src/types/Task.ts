export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Completed" | "Incomplete";
export type DueDateType = "Overdue" | "Today" | "Upcoming" | "No Due Date";

export interface ITask {
  id: number;
  name: string;
  priority: TaskPriority;
  category: string;
  dueDate?: string;
  assignedUser: string;
  assignedOn: string;
  completed: boolean;
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: ITask }
  | { type: "EDIT_TASK"; payload: ITask }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string };
