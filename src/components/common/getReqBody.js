export const getReqBody = (data) => {
    return ({
        assigned_user: data.id, 
        task_date: data.taskDate,
        task_time: data.taskTime,
        task_msg: data.taskMsg,
        is_completed: 0
    })
}