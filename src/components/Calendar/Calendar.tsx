import { monthNames } from "../../utils/constants";
import { getAllDaysInMonth, getWeeks } from "../../utils/helpers";
import styles from "./Calendar.module.css";
import { AiFillStar } from "react-icons/ai";
import { Task } from "../../Types/Task";

type Props = {
  date: Date;
  day: Date;
  changeSelectedDate: (control: string) => void;
  selectDay: (date: Date) => void;
  tasks: Task[]
};

function Calendar({ date, day, changeSelectedDate, selectDay, tasks }: Props) {
  const dates = getAllDaysInMonth(date.getFullYear(), date.getMonth());

  const weeks = getWeeks(dates);

  const emptyDayDivs = () => {
    const dayOfWeekFirstDate = dates[0].getDay();
    let divList = [];

    for (var i = 0; i < dayOfWeekFirstDate; i++) {
      divList.push(
        <div
          key={i}
          className={`${styles.dayContainer} ${styles.inactive}`}
        ></div>
      );
    }

    return divList;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <div>
          {monthNames[date.getMonth()]} de {date.getFullYear()}
        </div>
        <div style={{ display: "flex" }}>
          <button
            className={styles.monthButton}
            onClick={() => changeSelectedDate("previous")}
          >
            <span>{"<"}</span>
          </button>
          <button
            className={styles.monthButton}
            onClick={() => changeSelectedDate("next")}
          >
            <span>{">"}</span>
          </button>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className={styles.weekDay}>Domingo</div>
        <div className={styles.weekDay}>Segunda</div>
        <div className={styles.weekDay}>Terça</div>
        <div className={styles.weekDay}>Quarta</div>
        <div className={styles.weekDay}>Quinta</div>
        <div className={styles.weekDay}>Sexta</div>
        <div className={styles.weekDay}>Sabado</div>
      </div>

      {weeks.map((weekNumber) => (
        <div key={weekNumber} style={{ display: "flex" }}>
          {weekNumber === 1 && emptyDayDivs()}
          {dates
            .filter(
              (date) =>
                weekNumber ===
                Math.ceil((date.getDate() + 6 - date.getDay()) / 7)
            )
            .map((date) => (
              <div
                className={`${styles.dayContainer} ${date.getTime() === new Date().setHours(0, 0, 0, 0) &&
                  styles.today
                  } ${date.getTime() === day.getTime() && styles.selected}`}
                key={date.getTime()}
                id={date.getDate().toString()}
                onClick={() => selectDay(date)}
              >
                {
                  tasks.filter(task => (
                    new Date(task.date).setHours(0, 0, 0, 0) === date.getTime()
                  )).length > 0
                  && <div className={styles.star}><AiFillStar size={16} color="#ffd900" /></div>
                }
                {date.getDate()}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
