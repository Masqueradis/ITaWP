// Файл: components/ui/PriorityBadge.jsx
import React from "react";

const PriorityBadge = ({ priority }) => {
  // Определяем дополнительный класс в зависимости от текста приоритета
  let badgeColorClass = "";
  
  switch (priority) {
    case "Высокий":
      badgeColorClass = "badge--high";
      break;
    case "Средний":
      badgeColorClass = "badge--medium";
      break;
    case "Низкий":
      badgeColorClass = "badge--low";
      break;
    default:
      badgeColorClass = "badge--default";
  }

  return (
    <span className={`badge ${badgeColorClass}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;