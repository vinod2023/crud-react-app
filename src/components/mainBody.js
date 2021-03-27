import React, {useEffect} from 'react'
import { getTokenData } from './actions/getToken/actions';

import { connect } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { deleteTaskData } from './actions/deleteTask/actions';
import { updateTaskData } from './actions/updateTask/actions';
import { getAllTasksData } from './actions/getAllTasks/actions';
import { UPDATE_TASK_ID } from './actions/updateTask/types';
import { TASK_DATE, TASK_MSG, TASK_TIME } from './actions/postTask/types';

function MainBody(props) {

    useEffect(() => {
        props.userToken();
    }, [])

    const handleDelete = async(id) => {
      await props.deleteTask(props.token, id)
      window.alert("Deleted Item")
      let headers = {
        headers : {
            "Accept": "application/json",
            "Content-Type": "application/json", 
            "Authorization": "Bearer "+props.token       
          }
    }
      await props.getAllTasks(headers)
      props.history.push("/")
    }

    const handleEdit = async(id, msg, date, time) => {
      await props.updateTaskId(id)
      await props.updateTaskMsg(msg)
      await props.updateTaskDate(date)
      await props.updateTaskTime(time)
      props.history.push("/edittask")
    }

    return (
        <div>
            <Table className="tableData">
              <TableHead className="thead">
                <TableRow>
                  <TableCell>
                    UserName
                  </TableCell>
                  <TableCell>
                    TaskMessage
                  </TableCell>
                  <TableCell>
                    TaskDate
                  </TableCell>
                  <TableCell>
                    TaskTime
                  </TableCell>
                  <TableCell>
                    TaskId
                  </TableCell>
                  <TableCell>
                    Delete
                  </TableCell>
                  <TableCell>
                    Update
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {props.tasks.map(task => {
                    return(
                      <TableRow key={task.id} className="tableRow">
                      <TableCell>
                        {task.user_name}
                      </TableCell>
                      <TableCell>
                      {task.task_msg}
                    </TableCell>
                    <TableCell>
                    {task.task_date}
                  </TableCell>
                  <TableCell>
                  {new Date(task.task_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {task.id}
                </TableCell>
                <TableCell>
                 <button onClick={() => handleDelete(task.id)}>Delete</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => {handleEdit(task.id, task.task_msg, task.task_date, task.task_time)}}>Edit</button>
                </TableCell>
                </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token : state.token,
        id: state.id,
        tasks: state.tasks
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      userToken: () => dispatch(getTokenData()),
      deleteTask: (token, id) => dispatch(deleteTaskData(token, id)),
      editTask: (data) => dispatch(updateTaskData(data)),
      updateTaskId: (data) => dispatch({type: UPDATE_TASK_ID, payload: data}),
        updateTaskMsg: (data) => dispatch({type: TASK_MSG, payload: data}),
        updateTaskTime: (data) => dispatch({type: TASK_TIME, payload: data}),
        updateTaskDate: (data) => dispatch({type: TASK_DATE, payload: data}),
      getAllTasks: (headers) => dispatch(getAllTasksData(headers))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
