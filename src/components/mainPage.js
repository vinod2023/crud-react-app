import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PostTaskForm from './postTaskForm';
import { getTokenData } from './actions/getToken/actions';
import { connect } from 'react-redux';
import MainBody from './mainBody';
import { getAllTasksData } from './actions/getAllTasks/actions';

function MainPage(props) {

    const [isAddPostClicked, setIsAddPostClicked] = useState(false);
    const fetchPosts = React.useRef(() => { })

    fetchPosts.current = () => {
        if (props.tasks.length === 0)
            props.userToken();
    }

    React.useEffect(() => {
        fetchPosts.current();
    }, [])

    const getAllPostsOnReRender = async () => {
        let headers = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            }
        }
        await props.getAllTasks(headers)
    }

    const updateIsAddPostTrue = () => {
        setIsAddPostClicked(true)
    }

    const updateIsAddPostFalse = () => {
        setIsAddPostClicked(false)
    }

    return (
        <div className="postTaskForm">
            <div className="postTop">
                <div className="postHeader">
                    Tasks {props.tasks.length}
                </div>
                <button className="postIcon" title="add task" onClick={() => setIsAddPostClicked(true)}>
                    <AddIcon ></AddIcon>
                </button>
            </div>
            <div className="postBody">
                {
                    isAddPostClicked ?
                        <PostTaskForm updateIsAddPostFalse={() => updateIsAddPostFalse()} getAllPostsOnReRender={() => getAllPostsOnReRender()} /> :
                        <MainBody updateIsAddPostTrue={() => updateIsAddPostTrue()} getAllPostsOnReRender={() => getAllPostsOnReRender()} />
                }

            </div>
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
        getAllTasks: (headers) => dispatch(getAllTasksData(headers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
