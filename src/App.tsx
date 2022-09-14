import { useEffect, useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import DayInfo from "./components/DayInfo/DayInfo";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import styles from "./App.module.css"
import { Task } from "./Types/Task";
import { tasks_data } from "./data/tasks_data";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [tasks, setTasks] = useState<Task[]>(tasks_data);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(
        (task) =>
          task.date.toString().slice(0, 15) ===
          selectedDay.toString().slice(0, 15)
      )
    );
  }, [selectedDay, tasks]);

  const changeSelectedDate = (control: string) => {
    control === "next"
      ? setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
      )
      : setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
      );
  };

  const handleOnHojeClick = () => {
    setSelectedDate(new Date());
    setSelectedDay(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day);
  };

  const createTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id.toString() !== id.toString()));
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const editTask = (task: Task) => {
    setTasks(tasks.map((item) => (item.id === task.id ? task : item)));
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    selectedTask && setSelectedTask(null);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        onConfirm={selectedTask ? editTask : createTask}
        day={selectedDay}
        task={selectedTask}
      />

      <Header onHojeClick={handleOnHojeClick} />

      <main className={styles.main}>
        <Calendar
          date={selectedDate}
          day={selectedDay}
          changeSelectedDate={changeSelectedDate}
          selectDay={handleSelectDay}
          tasks={tasks}
        />

        <DayInfo
          day={selectedDay}
          openModal={() => setModalIsOpen(true)}
          tasks={filteredTasks}
          deleteTask={handleDeleteTask}
          editTask={handleEditTask}
        />
      </main>
    </>
  );
}

export default App;
