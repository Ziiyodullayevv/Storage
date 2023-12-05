import Navbar from "../Navbar/Navbar";
import "./controlTask.scss";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { SingleTaskContext } from "../../context/SingleTask";
import { useContext } from "react";

const ControlTask = () => {
  const [singleTask] = useContext(SingleTaskContext);
  return (
    <div className="controlTask">
      <Navbar props={"Task"} />
      <div className="controlTaskPage">
        <Typography variant="h5" color="initial">
          Task Information
        </Typography>
        <Stack sx={{ marginTop: "20px" }} spacing={2}>
          <Typography>
            <div className="bold">Title: </div>
            {singleTask.title || "No Data"}
          </Typography>
          <hr />
          <Typography>
            <div className="bold">Manager: </div>
            {singleTask.manager || "No Data"}
          </Typography>
          <hr />
          <Typography>
            <div className="bold">Employee: </div>
            {singleTask.employee || "No Data"}
          </Typography>

          <hr />
          <Typography>
            <div className="bold">Device: </div>
            {singleTask.device || "No Data"}
          </Typography>

          <hr />
          <Typography>
            <div className="bold">Create Data: </div>
            {singleTask.created_date?.slice(0, 10).replaceAll("-", "/") ||
              "No Data"}
          </Typography>

          <hr />
          <Typography>
            <div className="bold">Description: </div>
            {singleTask.description || "No Data"}
          </Typography>

          <hr />
        </Stack>
      </div>
    </div>
  );
};

export default ControlTask;
