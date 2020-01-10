import React, { Component } from 'react';
import './App.css';
import 'bootstrap-4-grid/css/grid.min.css';

import { Contest } from './Contest2';
import { HomePanel} from './HomePanel'
import '@progress/kendo-theme-material/dist/all.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class App extends Component {



  render() {
    return (
      <div className="bootstrap-wrapper">
        <div className="app-container container">
          
          <Tabs>
          <TabList style={{background: "none"}}>
            <Tab>Home Panel</Tab>
            <Tab>whitehouse</Tab>
            <Tab>vp</Tab>
            <Tab>potus</Tab>
          </TabList>
          <TabPanel>
          <div className="row">
             
          <HomePanel />
          </div>
          <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          </TabPanel>
          <TabPanel>
          <div className="row">
            
          <Contest Name={"whitehouse"}/>
          </div>
          <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          </TabPanel>
          <TabPanel>
          <div className="row">
            <Contest Name={"vp"}/>
            
          </div>
          <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          </TabPanel>
          <TabPanel>
          <div className="row">
            <Contest Name={"potus"}/>
            
          </div>
          <h4 style={{ display: 'none' }}>Dialog Shown/Hidden with Logic</h4>
          </TabPanel>
          </Tabs>
        </div>
      </div>
    );

    
  }

}

export default App;