import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";

// Мокаем дочерний компонент, чтобы изолировать тест TaskList
jest.mock("./TaskItem", () => {
  return function MockTaskItem({ task }) {
    return <div data-testid="task-item">{task.title}</div>;
  };
});

/**
 * @description Тестирует компонент TaskList на корректность рендеринга списка и пустых состояний.
 * @case Отображение списка из нескольких задач (нормальный случай)
 * @case Отображение сообщения при пустом массиве (крайний случай)
 * @case Обработка отсутствующего пропса tasks (ошибки/исключения)
 */
describe("TaskList компонент", () => {
  const mockTasks = [
    { id: 1, title: "Задача 1", priority: "high", status: "new" },
    { id: 2, title: "Задача 2", priority: "low", status: "done" },
  ];

  test("должен корректно обрабатывать нормальный случай", () => {
    console.group("Тест TaskList: Нормальный случай");
    console.log("Входные данные (массив задач):");
    console.table(mockTasks);

    render(<TaskList tasks={mockTasks} />);

    // Проверяем заголовок с количеством
    const title = screen.getByText(`Список задач(${mockTasks.length})`);
    expect(title).toBeInTheDocument();

    // Проверяем, что отрендерилось нужное количество TaskItem
    const items = screen.getAllByTestId("task-item");
    expect(items).toHaveLength(mockTasks.length);

    console.log(`Результат: Отображено ${items.length} задач.`);
    console.groupEnd();
  });

  test("должен обрабатывать крайние случаи", () => {
    console.group("Тест TaskList: Крайние случаи (пустой список)");
    const emptyTasks = [];

    console.log("Тестирование с пустым массивом: []");

    render(<TaskList tasks={emptyTasks} />);

    // Проверяем наличие сообщения об отсутствии задач
    const emptyMsg = screen.getByText(/Задач пока нет/i);
    expect(emptyMsg).toBeInTheDocument();

    // Проверяем, что заголовок списка НЕ отображается
    const title = screen.queryByText(/Список задач/i);
    expect(title).not.toBeInTheDocument();

    console.log("Результат: Сообщение о пустом списке отображено корректно.");
    console.groupEnd();
  });

  test("должен обрабатывать ошибки", () => {
    console.group("Тест TaskList: Обработка ошибок (null/undefined)");

    console.log("Тестирование при tasks = undefined");

    // Проверка рендеринга без пропсов
    render(<TaskList tasks={undefined} />);

    const emptyMsg = screen.getByText(/Задач пока нет/i);
    expect(emptyMsg).toBeInTheDocument();

    console.log(
      "Результат: Компонент не упал и корректно обработал отсутствие данных.",
    );
    console.groupEnd();
  });
});
