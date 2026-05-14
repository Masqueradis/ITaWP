const PRIORITY_RANK = { Высокий: 3, Средний: 2, Низкий: 1 };

export const SORT_OPTIONS = [
  "По умолчанию",
  "Название (А-Я)",
  "Название (Я-А)",
  "Сначала важные",
  "Сначала простые",
];

/**
 * Возвращает новый массив задач в порядке, заданном sortOrder.
 */
export function sortTasks(tasks, sortOrder) {
  const next = [...tasks];
  switch (sortOrder) {
    case "Название (А-Я)":
      next.sort((a, b) => a.title.localeCompare(b.title, "ru"));
      break;
    case "Название (Я-А)":
      next.sort((a, b) => b.title.localeCompare(a.title, "ru"));
      break;
    case "Сначала важные":
      next.sort(
        (a, b) =>
          (PRIORITY_RANK[b.priority] || 0) - (PRIORITY_RANK[a.priority] || 0)
      );
      break;
    case "Сначала простые":
      next.sort(
        (a, b) =>
          (PRIORITY_RANK[a.priority] || 0) - (PRIORITY_RANK[b.priority] || 0)
      );
      break;
    default:
      break;
  }
  return next;
}
