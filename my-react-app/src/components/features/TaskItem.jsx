import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PriorityBadge from "../ui/PriorityBadge"; // <-- Импортируем бейдж

const TaskItem = ({ task }) => { 

  return (
    <Card title={task.title} description={task.description}>
      <div className="task-info">
        {/* Заменили старый <span> на красивую обертку с бейджем */}
        <div className="task-priority">
          <span>Приоритет:</span>
          <PriorityBadge priority={task.priority} />
        </div>

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
