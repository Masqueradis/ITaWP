import React from "react";
import FilterGroup from "../ui/FilterGroup";
import { SORT_OPTIONS } from "../../utils/sortTasks";

const SortTask = ({ currentSort, onSortChange }) => (
  <FilterGroup
    label="Сортировка"
    options={SORT_OPTIONS}
    activeValue={currentSort}
    onSelect={onSortChange}
  />
);

export default SortTask;
