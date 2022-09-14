import { ChangeEvent, useEffect, useState } from "react";
import "./Modal.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Task } from "../../Types/Task";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: (task: Task) => void;
  day: Date;
  task: Task | null;
};

let DEFAULT_INPUTS = {
  hours: { value: "00", isValid: true },
  minutes: { value: "00", isValid: true },
  title: { value: "", isValid: true },
  description: { value: "", isValid: true },
};

function Modal({ isOpen, onClose, onConfirm, day, task }: Props) {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [title, setTitle] = useState("criar nova tarefa");

  useEffect(() => {
    let inputs;

    if (task) {
      inputs = {
        hours: {
          value: task.date.getHours().toString().length === 1 ? `0${task.date.getHours().toString()}` : task.date.getHours().toString(),
          isValid: true
        },
        minutes: {
          value: task.date.getMinutes().toString().length === 1 ? `0${task.date.getMinutes().toString()}` : task.date.getMinutes().toString(),
          isValid: true
        },
        title: { value: task.title, isValid: true },
        description: { value: task.description, isValid: true },
      };
    } else {
      inputs = DEFAULT_INPUTS;
    }

    if (isOpen) {
      setInputs(inputs);
      task ? setTitle("editar tarefa") : setTitle("criar nova tarefa");
    }
  }, [isOpen, task]);

  const handleOnClose = () => {
    onClose();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const handleOnClick = () => {
    let isValid = true;
    let myInput = { ...inputs };

    if (
      !inputs.hours.value ||
      parseInt(inputs.hours.value) < 0 ||
      parseInt(inputs.hours.value) > 24
    ) {
      myInput = { ...myInput, hours: { ...myInput.hours, isValid: false } };
      isValid = false;
    }

    if (!inputs.title.value) {
      myInput = { ...myInput, title: { ...myInput.title, isValid: false } };
      isValid = false;
    }

    if (
      !inputs.minutes.value ||
      parseInt(inputs.minutes.value) < 0 ||
      parseInt(inputs.minutes.value) > 60
    ) {
      myInput = { ...myInput, minutes: { ...myInput.minutes, isValid: false } };
      isValid = false;
    }

    setInputs(myInput);

    if (!isValid) {
      return;
    }

    let taskDate = new Date(day);

    const newTask = {
      id: task ? task.id : `${Math.random()}`,
      date: new Date(taskDate.setHours(parseInt(inputs.hours.value), parseInt(inputs.minutes.value))),
      title: inputs.title.value,
      description: inputs.description.value,
    };

    onConfirm(newTask);
    onClose();
  };

  const handleTimeInput = (
    unity: "hours" | "minutes",
    direction: "next" | "previous"
  ) => {
    if (direction === "next") {
      if (unity === "hours" && inputs.hours.value === "24") {
        setInputs({ ...inputs, hours: { value: "00", isValid: true } });
        return;
      }
      if (unity === "minutes" && inputs.minutes.value === "59") {
        setInputs({ ...inputs, minutes: { value: "00", isValid: true } });
        return;
      }
      setInputs({
        ...inputs,
        [unity]: {
          value:
            (parseInt(inputs[unity].value) < 9 ? "0" : "") +
            (parseInt(inputs[unity].value) + 1).toString(),
          isValid: true,
        },
      });

      return;
    } else {
      if (unity === "hours" && inputs.hours.value === "00") {
        setInputs({ ...inputs, hours: { value: "24", isValid: true } });
        return;
      }
      if (unity === "minutes" && inputs.minutes.value === "00") {
        setInputs({ ...inputs, minutes: { value: "59", isValid: true } });
        return;
      }
      setInputs({
        ...inputs,
        [unity]: {
          value:
            (parseInt(inputs[unity].value) < 11 ? "0" : "") +
            (parseInt(inputs[unity].value) - 1).toString(),
          isValid: true,
        },
      });
    }
  };

  return (
    <div className={`modal ${isOpen && "visible"}`}>
      <div className="background" onClick={handleOnClose}></div>
      <div className="window">
        <h3>{title}</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <button
              className="timeButton"
              onClick={() => handleTimeInput("hours", "next")}
            >
              <IoIosArrowUp />
            </button>
            <p className="time">{inputs.hours.value}</p>
            <button
              className="timeButton"
              onClick={() => handleTimeInput("hours", "previous")}
            >
              <IoIosArrowDown />
            </button>
          </div>
          <p className="time middle">:</p>
          <div style={{ textAlign: "center" }}>
            <button
              className="timeButton"
              onClick={() => handleTimeInput("minutes", "next")}
            >
              <IoIosArrowUp />
            </button>
            <p className="time">{inputs.minutes.value}</p>
            <button
              className="timeButton"
              onClick={() => handleTimeInput("minutes", "previous")}
            >
              <IoIosArrowDown />
            </button>
          </div>
        </div>
        <input
          className={`input ${!inputs.title.isValid && "invalid"}`}
          name="title"
          type="text"
          placeholder="Adicionar título"
          onChange={handleOnChange}
          value={inputs.title.value}
          maxLength={35}
        />
        <input
          className="input"
          name="description"
          type="text"
          placeholder="Adicionar uma descrição"
          onChange={handleOnChange}
          value={inputs.description.value}
        />
        <div>
          <button onClick={handleOnClick} className="button">
            concluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
