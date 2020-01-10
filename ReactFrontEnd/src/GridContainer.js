import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { loadPOTUSData, loadVPData, loadWHData } from './appData';


var mounted = false;
export class GridContainer extends React.Component{


    
    constructor(props){
        super(props);
        console.log(props)
        this.state = {data:[],n:props.n};
        this.setState({data:[{"ProductID":1, "price":2}],});
        console.log(this.state.data);
    }
    render(){
        return (<div>
 
        <Grid style={{ height: '500px' }} data={this.state.data}>
          <Column field="name" title="Name" width="100px" />
          
          <Column field="price" title="Price" width="100px" />
          <Column field="spread" title="Market difference spread" width="200px" />
          <Column field="prediction" title="Predicted Price" width="200px" />
          <Column field="buy" title="Buy" width="180px" />
          
        </Grid>
        
        </div>);
    }
    async componentDidMount() {
        if(mounted == false){
        var data = []
        var dat = []
        const vpmarket = 6073;
        const potusmarket = vpmarket + 1;
        const whmarket = 6092;

        try {
            var nam = this.state.n
            console.log(nam)
            nam = nam.name
            if(nam === "whitehouse"){
                console.log("zuck");
                dat = await loadWHData(whmarket);}
            else if(nam ==="vp"){
                console.log("seller");
                dat = await loadVPData(vpmarket);}  
            else if(nam ==="potus"){
                console.log("grantarino");
                dat = await loadPOTUSData(potusmarket);}
            else{console.log("YYYYY")}
            console.log(dat);
            data = {data:dat[0]};
            await this.setState(data);
            console.log("WEEE")
        } catch(e) {
            console.error(e);
        }
        mounted = true;
        console.log(dat)
        this.props.cb(dat[1], dat[2], dat[3], dat[4], dat[5], dat[6])
    }
    else{
        console.log("FALSE BBY")
        mounted = false;
;    }
    }

    async componentWillReceiveProps(props){
        console.log(props)
        await this.setState({data:this.state.data, n:props.n})
        this.componentDidMount()
    }


};

export default GridContainer;