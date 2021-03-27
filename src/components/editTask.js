import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { UPDATE_TASK, UPDATE_TASK_ERROR } from './actions/updateTask/types';
import { updateTaskData } from './actions/updateTask/actions';

function EditTask(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
      if(props.taskDate.length !== 0 ) {
          setMessage(props.taskMsg)
          setSelectedDate(new Date(props.taskTime))
      }
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const textChange = (event) => {
    setMessage(event.target.value)
  }
  const handleClick =() => {
    props.editTask({taskId: props.taskId,id: props.id, token: props.token, taskMsg: message, taskDate: selectedDate.toISOString().substring(0,10), taskTime: selectedDate.getTime()})
  }
  const backClick = () => {
        props.updateEditTask("")
        props.updateEditTaskError("")
      props.history.push("/")
  }
  return (
      <div className="postTaskForm">
          {
              props.updateTask.length === 0 && props.updateTaskError.length === 0 ?
          <>
          <div className="title">
              ADD TASK
          </div>
          <label>Task Description </label>
          <input type="text" value = {message} onChange={textChange}/>
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
    <button className="button" onClick={handleClick}>
        Update
    </button>
    </>:
    props.updateTask.length > 0 ? 
    <div>
        <p className="text">Succesfully updated Task. Task ID : {props.updateTask} </p>
        <button className="button" onClick={backClick}>
        Go Back
    </button>
        </div> :
        <div>
            <p className="error">Task updation failed: {props.updateTaskError}</p>
            <button className="button" onClick={backClick}>
        Go Back
    </button>
            </div>
}
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        token : state.token,
        id: state.id,
        updateTask: state.updateTask,
        updateTaskError: state.updateTaskError,
        taskDate: state.taskDate,
        taskTime: state.taskTime,
        taskMsg: state.taskMsg,
        taskId: state.taskId
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateEditTask: (data) => dispatch({type: UPDATE_TASK, payload: data}),
        updateEditTaskError: (data) => dispatch({type: UPDATE_TASK_ERROR, payload: data}),
      editTask: (data) => dispatch(updateTaskData(data)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (EditTask);