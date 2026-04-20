import React from "react";
import Header from "./components/layout/Header";
import TaskList from "./components/features/TaskList";
import mockTasks from "./data/mockData";
import AddTaskForm from "./components/features/AddTaskForm";
import FilterButtons from "./components/features/FilterButtons";

function App() {
  // 1. Читаем параметры из адресной строки (например, ?priority=Высокий)
  const urlParams = new URLSearchParams(window.location.search);
  const priorityFilter = urlParams.get("priority") || "Все";
  const statusFilter = urlParams.get("status") || "Все";

  // 2. ФУНКЦИИ КЛИКА: они просто меняют URL и перезагружают страницу
  const handlePriorityChange = (value) => {
    urlParams.set("priority", value);
    window.location.search = urlParams.toString(); // Перезагрузка с новым URL
  };

  const handleStatusChange = (value) => {
    urlParams.set("status", value);
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

  return (
    <div className="app-wrapper">
      <Header title="My Task Manager" />
      <AddTaskForm />

      {/* Передаем текущие фильтры и функции управления */}
      <FilterButtons
        currentPriority={priorityFilter}
        currentStatus={statusFilter}
        onPriorityChange={handlePriorityChange}
        onStatusChange={handleStatusChange}
      />

      <main className="container">
        {/* Показываем уже отфильтрованный список */}
        <TaskList tasks={filteredTasks} />
      </main>
    </div>
  );
}

export default App;
