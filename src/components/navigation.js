import React from 'react';
import {Link} from 'react-router-dom';


function Navigation() {
    return (
        <div className="topnav">
          <Link to="/" >Home</Link>
          <Link to="/posttask" >Add Post</Link>
          <Link to="/gettask" >GET POST</Link>
      </div>
    )
}

export default Navigation
