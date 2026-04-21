import React from "react";
import FilterGroup from "../ui/FilterGroup";

const FilterButtons = ({
  currentPriority,
  currentStatus,
  onPriorityChange,
  onStatusChange,
}) => {
  const priorityOptions = ["Все", "Высокий", "Средний", "Низкий"];
  const statusOptions = ["Все", "Нужно сделать", "В процессе", "Готово"];

  return (
    <>
      <FilterGroup
        label="Приоритет"
        options={priorityOptions}
        activeValue={currentPriority}
        onSelect={onPriorityChange}
      />
      <FilterGroup
        label="Статус"
        options={statusOptions}
        activeValue={currentStatus}
        onSelect={onStatusChange}
      />
    </>
  );
};

export default FilterButtons;
