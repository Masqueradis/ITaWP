import React from "react";
import Card from "../ui/Card"; // Импортируем нашу обычную карту
import Button from "../ui/Button";

const TaskItem = ({ task }) => {
  return (
    <Card title={task.title} description={task.description}>
      {/* Всё, что внутри — это children для компонента Card */}
      <div className="task-info">
        <span className="task-priority">
          Приоритет: <strong>{task.priority}</strong>
        </span>
        <div className="task-status">Статус: {task.status}</div>
      </div>
      <Button
        variant="primary"
        onClick={() => console.log(`Задача ${task.id} завершена!`)}
      >
        Завершить
      </Button>
    </Card>
  );
};

export default TaskItem;
