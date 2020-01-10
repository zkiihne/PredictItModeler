import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

const dat = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Normal',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Model',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(238, 140, 41,0.4)',
      borderColor: 'rgba(238, 140, 41,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(238, 140, 41,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [75, 56, 82, 31, 71, 25, 80]
    }
  ] 
};

export class Graph extends React.Component {
    constructor(){
        super();
        this.updateGraph = this.updateGraph.bind(this);
        this.state= {"data":dat};
    }

    render() {
        return (
          <div style={{backgroundColor: "white"}} > 
            <h2 style={{ fontSize: '30px', color:"rgb(127, 127, 127)"}}>Normal vs Model</h2>
            <Line data={this.state.data} />
          </div>
        );
      }

      componentDidMount(){
        
        console.log(this.state.data)
        console.log(defaults)
      }
    async updateGraph(graphdata){
      await this.setState(graphdata)
      
      console.log(this.state.data)

    }

    async componentWillReceiveProps(props){
      await this.setState(props)
    }


};

export default Graph;