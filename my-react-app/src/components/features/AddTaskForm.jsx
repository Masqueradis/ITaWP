import React from "react";
import Button from "../ui/Button";
import { generateTaskId } from "../../utils/generateTaskId";

const AddTaskForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = {
      id: generateTaskId(),
      title: formData.get("title"),
      priority: formData.get("priority"),
      description: formData.get("description"),
      status: "Нужно сделать",
    };

    if (!newTask.title) return alert("Введите название!");
    const savedTasks = JSON.parse(localStorage.getItem("added_tasks") || "[]");
    savedTasks.unshift(newTask);
    localStorage.setItem("added_tasks", JSON.stringify(savedTasks));

    window.location.reload();
  };

  return (
    <section className="add-task-section container">
      <div className="add-task-card">
        <h2 className="form-title">Новое задание</h2>

        {/* Добавляем обработчик onSubmit */}
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="title" // Добавили имя!
              type="text"
              className="form-input"
              placeholder="Что нужно сделать?"

            />
            <select name="priority" className="form-select">
              <option value="Высокий">Высокий</option>
              <option value="Средний">Средний</option>
              <option value="Низкий">Низкий</option>
            </select>
          </div>

          <textarea
            name="description" // Добавили имя!
            className="form-textarea"
            placeholder="Добавьте описание задачи..."
          ></textarea>

          {/* Важно: кнопка должна иметь type="submit" */}
          <Button type="submit" variant="active">
            Добавить задачу
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddTaskForm;
