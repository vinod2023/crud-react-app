import React from 'react';
import {Box} from '@material-ui/core';
import {Route, Switch} from 'react-router-dom';
import MainBody from './mainBody';
import PostTask from './postTaskForm';
import EditTask from './editTask';
import GetTask from './getTask';

function MainPage() {
    return (
        <Box>
            <Switch>
                 <Route path="/" component={MainBody} exact />
                 <Route path="/posttask" component={PostTask} />
                 <Route path="/edittask" component={EditTask} />
                 <Route path="/gettask" component={GetTask} />
            </Switch>
        </Box>
    )
}

export default MainPage
