import React from 'react'
import { connect } from 'react-redux';
import { getSingleTaskData } from './actions/getSingleTask/actions';
import { SINGLE_TASK, SINGLE_TASK_ERROR } from './actions/getSingleTask/types';

function GetTask(props) {
    const [taskId, setTaskId] = React.useState("");
    const IdChange = (event) => {
        setTaskId(event.target.value)
      }
      const handleClick = () => {
        props.getTask(props.token, taskId)
      }
      const backClick = () => {
        props.updateSingleTask("")
        props.updateSingleTaskError("")
      props.history.push("/gettask")
  }
    return (
        <div className="postTaskForm">
            {
                props.singleTask === "" && props.singleTaskError.length === 0 ?
            <>
            <div className="title">
                GET TASK
            </div><br/>
            <label>Task ID </label>
            <input type="text" value = {taskId} onChange={IdChange}/>
      <br></br>
      <button className="button" onClick={handleClick}>
          Get Task
      </button>
      </>:
      props.singleTask !== "" ? 
      <div>
          Task Description: <p className="text"> {props.singleTask.task_msg} </p>
          Task Date: <p className="text"> {props.singleTask.task_date} </p>
          Task Time: <p className="text"> {props.singleTask.task_time} </p>
          Task User: <p className="text"> {props.singleTask.user_name} </p>
          <button className="button" onClick={backClick}>
          Go Back
      </button>
          </div> :
          <div>
              <p className="error">Task details retreiving failed: {props.singleTask}</p>
              <button className="button" onClick={backClick}>
          Go Back
      </button>
              </div>
  }
      </div>
    
    )
}

const mapStateToProps = (state) => {
    return {
        token : state.token,
        id: state.id,
        singleTask: state.singleTask,
        singleTaskError: state.singleTaskError
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateSingleTask: (data) => dispatch({type: SINGLE_TASK, payload: data}),
        updateSingleTaskError: (data) => dispatch({type: SINGLE_TASK_ERROR, payload: data}),
      getTask: (token,taskId) => dispatch(getSingleTaskData(token, taskId))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(GetTask);
