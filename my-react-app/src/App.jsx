import React from "react";
import Header from "./components/layout/Header";
import TaskList from "./components/features/TaskList";
import mockTasks from "./data/mockData";
import AddTaskForm from "./components/features/AddTaskForm";
import FilterButtons from "./components/features/FilterButtons";
import SortTask from "./components/features/SortTask";
import { sortTasks, SORT_OPTIONS } from "./utils/sortTasks";

function App() {
  // 1. Читаем параметры из адресной строки (например, ?priority=Высокий)
  const urlParams = new URLSearchParams(window.location.search);
  const priorityFilter = urlParams.get("priority") || "Все";
  const statusFilter = urlParams.get("status") || "Все";
  const sortOrder = urlParams.get("sort") || SORT_OPTIONS[0];

  // 2. ФУНКЦИИ КЛИКА: они просто меняют URL и перезагружают страницу
  const handlePriorityChange = (value) => {
    urlParams.set("priority", value);
    window.location.search = urlParams.toString(); // Перезагрузка с новым URL
  };

  const handleStatusChange = (value) => {
    urlParams.set("status", value);
    window.location.search = urlParams.toString();
  };

  const handleSortChange = (value) => {
    urlParams.set("sort", value);
    window.location.search = urlParams.toString();
  };

  // 3. ЛОГИКА ФИЛЬТРАЦИИ (простой JS)
  // Сначала берем все задачи (включая те, что в localStorage, если ты делала тот шаг)
  const userTasks = JSON.parse(localStorage.getItem("added_tasks") || "[]");
  const allTasks = [...userTasks, ...mockTasks];

  // Фильтруем массив перед отрисовкой
  const filteredTasks = allTasks.filter((task) => {
    const matchPriority =
      priorityFilter === "Все" || task.priority === priorityFilter;
    const matchStatus = statusFilter === "Все" || task.status === statusFilter;
    return matchPriority && matchStatus;
  });

  const sortedTasks = sortTasks(filteredTasks, sortOrder);

  return (
    <div className="app-wrapper">
      <Header title="My Task Manager" />
      <AddTaskForm />

      <section className="filters-section container">
        <SortTask currentSort={sortOrder} onSortChange={handleSortChange} />
        <FilterButtons
          currentPriority={priorityFilter}
          currentStatus={statusFilter}
          onPriorityChange={handlePriorityChange}
          onStatusChange={handleStatusChange}
        />
      </section>

      <main className="container">
        <TaskList tasks={sortedTasks} />
      </main>
    </div>
  );
}

export default App;
