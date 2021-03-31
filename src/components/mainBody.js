import React from 'react'
import { getTokenData } from './actions/getToken/actions';

import { connect } from 'react-redux';
import { deleteTaskData } from './actions/deleteTask/actions';
import { updateTaskData } from './actions/updateTask/actions';
import { getAllTasksData } from './actions/getAllTasks/actions';
import { UPDATE_TASK_ID } from './actions/updateTask/types';
import { TASK_DATE, TASK_MSG, TASK_TIME } from './actions/postTask/types';
import { Edit } from '@material-ui/icons';

function MainBody(props) {

  const handleEdit = async (task) => {
    await props.updateTaskDate(task.task_date)
    await props.updateTaskId(task.id)
    await props.updateTaskMsg(task.task_msg)
    await props.updateTaskTime(task.task_time)
    await props.updateIsAddPostTrue()
  }

  return (
    <div className="formBody">
      {
        props.tasks.map((task, index) => (
          <div key={index}>

            <div style={{ height: "30%", width: "95%", marginBottom: "10px", marginTop: "10px", marginLeft: "10px", backgroundColor: "white" }}>
              <div style={{ float: "left" }}>
                <img src={task.user_icon} alt="user" width="40px" height="40px" />
              </div >
              <div style={{ textAlign: "center" }}>
                {task.task_msg}<br />
                <span style={{ color: "red", fontSize: "medium" }}>{task.task_date}   <span style={{ color: "indianred", fontSize: "small" }}>{new Date(task.task_time).toLocaleTimeString()}</span></span>
                <div style={{ float: "right" }}>
                  <Edit cursor="pointer" titleAccess="Edit Task" onClick={() => handleEdit(task)} />
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    id: state.id,
    tasks: state.tasks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userToken: () => dispatch(getTokenData()),
    deleteTask: (token, id) => dispatch(deleteTaskData(token, id)),
    editTask: (data) => dispatch(updateTaskData(data)),
    updateTaskId: (data) => dispatch({ type: UPDATE_TASK_ID, payload: data }),
    updateTaskMsg: (data) => dispatch({ type: TASK_MSG, payload: data }),
    updateTaskTime: (data) => dispatch({ type: TASK_TIME, payload: data }),
    updateTaskDate: (data) => dispatch({ type: TASK_DATE, payload: data }),
    getAllTasks: (headers) => dispatch(getAllTasksData(headers))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
