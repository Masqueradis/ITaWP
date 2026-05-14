import React from "react";
import Button from "./Button";

const FilterGroup = ({ label, options, activeValue, onSelect }) => {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}:</span>
      <div className="filter-buttons-list">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            isActive={option === activeValue}
            // При клике вызываем функцию, переданную сверху
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;