export const filterByPriority = (tasks, priority) => {
  if (priority === "Все") return tasks;
  return tasks.filter(task => task.priority === priority);
};