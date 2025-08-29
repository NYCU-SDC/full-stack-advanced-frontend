import { type Task } from "@/types/task.types.ts";
export const tasks: Task[] = [
  {
    id: 1,
    labels: ["frontend", "backend"],
    title: "Implement user authentication",
    description: "Set up user login and registration functionality.",
    status: "INBOX",
    dueDate: "2025-09-10",
    assignee: "Alice",
  },
  {
    id: 2,
    labels: ["api", "database"],
    title: "Design database schema",
    description: "Create the initial database schema for the project.",
    status: "TO_DO",
    dueDate: "2025-09-15",
    assignee: "Bob",
  },
  {
    id: 3,
    labels: ["testing"],
    title: "Write unit tests",
    description: "Develop unit tests for the authentication module.",
    status: "IN_PROGRESS",
    dueDate: "2025-09-20",
    assignee: null,
  },
  {
    id: 4,
    labels: ["documentation"],
    title: "Update project documentation",
    description: "Add new API endpoints to the project documentation.",
    status: "DONE",
    dueDate: "2025-09-08",
    assignee: "Charlie",
  },
];
