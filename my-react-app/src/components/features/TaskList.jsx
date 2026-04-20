import React from "react";
import TaskCard from "./TaskItem";
import TaskItem from "./TaskItem";


const TaskList = ({ tasks }) => {
  // Хорошая практика: если задач нет, показать текст
  if (!tasks || tasks.length === 0) {
    return <p className="task-list__empty">Задач пока нет. Отдыхайте! 😊</p>;
  }

  return (
    <section className="task-list">
      <h2 className="task-list__title">Список задач({tasks.length})</h2>

      <div className="task-list__grid">
        {tasks.map((task) => (          
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
