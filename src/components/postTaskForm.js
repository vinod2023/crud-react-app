import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { addTaskData } from './actions/postTask/actions';
import { connect } from 'react-redux';
import { ADD_TASK, ADD_TASK_ERROR, TASK_DATE, TASK_MSG, TASK_TIME } from './actions/postTask/types';
import { Delete } from '@material-ui/icons';
import { deleteTaskData } from './actions/deleteTask/actions';
import { updateTaskData } from './actions/updateTask/actions';
import { UPDATE_TASK_ID } from './actions/updateTask/types';
import { DELETE_TASK, DELETE_TASK_ERROR } from './actions/deleteTask/types';

function PostTask(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [message, setMessage] = React.useState("");
  const fetchData = React.useRef(() => { })


  fetchData.current = () => {
    if (props.taskId.length !== 0) {
      setMessage(props.taskMsg)
      setSelectedDate(new Date(props.taskTime))
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    fetchData.current()
  }, [])

  const textChange = (event) => {
    setMessage(event.target.value)
  }

  const handleClick = async () => {
    if (props.taskId === "")
      await props.postData({ id: props.id, token: props.token, taskMsg: message, taskDate: selectedDate.toISOString().substring(0, 10), taskTime: selectedDate.getTime() })
    else
      await props.editTask({ taskId: props.taskId, id: props.id, token: props.token, taskMsg: message, taskDate: selectedDate.toISOString().substring(0, 10), taskTime: selectedDate.getTime() })
    if (props.addTaskError === "" && props.updateTaskErrorField === "") {
      await props.updateTaskDate("")
      await props.updateTaskId("")
      await props.updateTaskMsg("")
      await props.updateTaskTime("")
      await props.updateAddTask("")
      await props.getAllPostsOnReRender()
      props.updateIsAddPostFalse()
    }
    else {
      window.alert("Failed operation")
      await props.updateTaskDate("")
      await props.updateTaskId("")
      await props.updateTaskMsg("")
      await props.updateTaskTime("")
      await props.updateTaskError("")
      await props.getAllPostsOnReRender()
      props.updateIsAddPostFalse()
    }
  }

  const handleDeleteClick = async () => {
    await props.deleteTask(props.token, props.taskId)
    if (props.deleteTaskError === "") {
      await props.updateTaskDate("")
      await props.updateTaskId("")
      await props.updateTaskMsg("")
      await props.updateTaskTime("")
      await props.deleteTaskUpdate("")
      await props.getAllPostsOnReRender()
      props.updateIsAddPostFalse()
    }
    else {
      await props.updateTaskDate("")
      await props.updateTaskId("")
      await props.updateTaskMsg("")
      await props.updateTaskTime("")
      await props.deleteTaskUpdateError("")
      window.alert("Failed operation")
      await props.getAllPostsOnReRender()
      props.updateIsAddPostFalse()
    }
  }

  const handleCancelClick = async () => {
    await props.updateTaskDate("")
    await props.updateTaskId("")
    await props.updateTaskMsg("")
    await props.updateTaskTime("")
    props.updateIsAddPostFalse()
  }

  return (
    <div className="formBody">
      <label className="label">Task Description </label><br />
      <input type="text" className="textBox" value={message} onChange={textChange} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Select Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div className="buttonsDisplay">
        {props.taskId !== "" &&
          <Delete color="secondary" cursor="pointer" titleAccess="Delete Task" onClick={handleDeleteClick}></Delete>
        }
        <button style={{ height: "30px", width: "70px", cursor: "pointer", marginLeft: "80px" }} onClick={handleCancelClick}>
          Cancel
    </button>

        <button style={{ height: "30px", width: "70px", marginLeft: "10px", paddingLeft: "10px", cursor: "pointer", backgroundColor: "green", color: "white" }}
          onClick={handleClick}>
          Save
    </button>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    id: state.id,
    addTask: state.addTask,
    addTaskError: state.addTaskError,
    taskDate: state.taskDate,
    taskTime: state.taskTime,
    taskMsg: state.taskMsg,
    taskId: state.taskId,
    updateTaskErrorField: state.updateTaskError,
    deleteTaskError: state.deleteTaskError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAddTask: (data) => dispatch({ type: ADD_TASK, payload: data }),
    updateTaskError: (data) => dispatch({ type: ADD_TASK_ERROR, payload: data }),
    postData: (data) => dispatch(addTaskData(data)),
    deleteTask: (token, id) => dispatch(deleteTaskData(token, id)),
    editTask: (data) => dispatch(updateTaskData(data)),
    updateTaskId: (data) => dispatch({ type: UPDATE_TASK_ID, payload: data }),
    updateTaskMsg: (data) => dispatch({ type: TASK_MSG, payload: data }),
    updateTaskTime: (data) => dispatch({ type: TASK_TIME, payload: data }),
    updateTaskDate: (data) => dispatch({ type: TASK_DATE, payload: data }),
    deleteTaskUpdate: (data) => dispatch({ type: DELETE_TASK, payload: data }),
    deleteTaskUpdateError: (data) => dispatch({ type: DELETE_TASK_ERROR, payload: data }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTask);