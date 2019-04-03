import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import SideBar from '../../components/Sidebar/Sidebar';

import './Home.css'
class Home extends Component {
    constructor(props, context){
      super(props, context)
    }
    render() {
      return (

      <div id="App">
        <SideBar />
        <div id="page-wrap">
          <Menu/>
        </div>
      </div>
      );
    }
}  
  export default Home;