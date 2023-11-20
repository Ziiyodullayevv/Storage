import Navbar from "../../components/Navbar/Navbar";
import "./controlTask.scss";

const ControlTask = () => {
  const task = "Task";
  return (
    <div className="taskControl">
      <Navbar props={task} />
    </div>
  );
};

export default ControlTask;
