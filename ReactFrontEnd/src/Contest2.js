import React, { Component } from 'react';
import { GridContainer } from './GridContainer';
import { Graph } from './Graph';
import 'bootstrap-4-grid/css/grid.min.css';
import SimpleCard from './Card';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "blue",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export class Contest extends Component{
  
    constructor(props){
        super(props);
        this.callbacker = this.callbacker.bind(this);
        this.graph = React.createRef();
        this.style = makeStyles().root;
        var dt = {data:{
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
              data: [75, 59, 80, 31, 71, 55, 80]
            }
          ] 
        },
        stuff:{mean:-2, std:-3, count:-1, percent:-4},
        n:{name:props.Name}
      };
        this.state = dt;
      };

    render() {
        return (
           
          <div className={this.style}> <Grid container spacing={3} style={{outlinecolor: "white", background: 'rgb(230, 230, 230)'}}>
              <Grid item xs={12}><GridContainer n={this.state.n} cb={this.callbacker}/></Grid>
              <Grid item xs={3}><SimpleCard drops = {{number:this.state.stuff.count, name:"Current Count"}}/></Grid>
              <Grid item xs={3}><SimpleCard drops = {{number:this.state.stuff.mean, name:"Mean"}}/></Grid>
              <Grid item xs={3}><SimpleCard drops = {{number:this.state.stuff.std, name:"Standard Deviation"}}/></Grid>
              <Grid item xs={3}><SimpleCard drops = {{number:this.state.stuff.percent, name:"Percent left"}}/></Grid>
              <Grid item xs={12}><Graph ref={this.graph} d={this.state.data} backgroundColor={"rgba(100,100,0,0.5)"}/></Grid>
              </Grid></div>
         
          
            );}

            
    async callbacker(grapharray1, grapharray2, me, st, co, perc){
        console.log("HERE CHIEF");
        console.log(me, st, co)
        var ll = []
        for(var i = -50; i < 400; i++){
            ll.push(i)
        }
        
        const dt = { data:{labels: ll,
        datasets: [
            {
            label: 'Normal',
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
            pointHoverBackgroundColor: 'rgba(238, 140, 41,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: grapharray1
            },
            {
            label: 'Model',
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
            data: grapharray2
            }
        ] 
        }};
        console.log(this.state)
        this.graph.current.updateGraph(dt);
        const men = Math.round(me * 100) / 100;
        const sd = Math.round(st * 100) / 100;
        const cnt = Math.round(co * 100) / 100;
        await this.setState({data:this.state.data, stuff:{mean:men, std:sd, count:cnt, percent:perc},n:this.state.n})
    }


    
    }
export default Contest;