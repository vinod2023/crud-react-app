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
import { ADD_TASK, ADD_TASK_ERROR } from './actions/postTask/types';

function PostTask(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [message, setMessage] = React.useState("");


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const textChange = (event) => {
    setMessage(event.target.value)
  }
  const handleClick =() => {
    props.postData({id: props.id, token: props.token, taskMsg: message, taskDate: selectedDate.toISOString().substring(0,10), taskTime: selectedDate.getTime()})
  }
  const backClick = () => {
        props.updateAddTask("")
        props.updateTaskError("")
      props.history.push("/")
  }
  return (
      <div className="postTaskForm">
          {
              props.addTask.length === 0 && props.addTaskError.length === 0 ?
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
        Add Task
    </button>
    </>:
    props.addTask.length > 0 ? 
    <div>
        <p className="text"> added Task. Task ID : {props.addTask} </p>
        <button className="button" onClick={backClick}>
        Go Back
    </button>
        </div> :
        <div>
            <p className="error">Task add failed: {props.addTaskError}</p>
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
        addTask: state.addTask,
        addTaskError: state.addTaskError,
        taskDate: state.taskDate,
        taskTime: state.taskTime,
        taskMsg: state.taskMsg
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateAddTask: (data) => dispatch({type: ADD_TASK, payload: data}),
        updateTaskError: (data) => dispatch({type: ADD_TASK_ERROR, payload: data}),
      postData: (data) => dispatch(addTaskData(data))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (PostTask);