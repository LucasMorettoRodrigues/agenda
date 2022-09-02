import { monthNames } from "../../utils/constants";
import styles from "./DayInfo.module.css";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

type Props = {
  day: Date;
  openModal: () => void;
  tasks: any;
  deleteTask: (id: string) => void;
  editTask: (task: any) => void;
};

function DayInfo({ day, openModal, tasks, deleteTask, editTask }: Props) {
  return (
    <div className={styles.dayInfoContainer}>
      <div className={styles.dayInfoHeader}>
        <span>
          {day.getDate()} de {monthNames[day.getMonth()]} de {day.getFullYear()}
        </span>
        <button onClick={openModal} className={styles.button}>
          adicionar tarefa
        </button>
      </div>
      <div>
        {tasks.map((task: any) => (
          <div key={task.id} className={styles.taskCard}>
            <div className={styles.container}>
              <p>
                <span className={styles.time}>
                  {task.date.toLocaleTimeString().slice(0, 5)} -{" "}
                </span>
                <span className={styles.title}>{task.title}</span>
              </p>
              <div style={{ display: "flex" }}>
                <button
                  className={styles.cardButton}
                  onClick={() => editTask(task)}
                >
                  <FaRegEdit />
                </button>
                <button
                  className={styles.cardButton}
                  onClick={() => deleteTask(task.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
            <p className={styles.description} style={{ margin: 0 }}>
              {task.description}
            </p>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className={styles.noTaskMessage}>Nenhuma tarefa.</p>
        )}
      </div>
    </div>
  );
}

export default DayInfo;
