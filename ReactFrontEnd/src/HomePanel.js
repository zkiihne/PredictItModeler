import React, { Component } from 'react';
import { GridContainer } from './GridContainer';
import { Graph } from './Graph';
import 'bootstrap-4-grid/css/grid.min.css';
import SimpleCard from './Card';
import TitleCard from './TitleCard'
import HomeCard from './HomeCard';
import LinkCard from './LinkCard';
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
  
  
  export class HomePanel extends Component{

    constructor(){
        super();
        this.intro = "This website is intended to be used as an aid for the website Predicit.org. In particular three \ncontests, for the @whitehouse, @vp and @potus twitter accounts\n\nAs you can see in the above tabs each of these has a ta, in the tab you will find information \nabout that particular contest. This information is based off of past twitter which is ingested and \nthen process on the back end of this application. The resulting models are then displayed and \ncompared to current market price. \n\nEach contest happens every week resetting at noon on a weekday(varies by contest). Each \ncontest is divided into 9 brackets with the first and last being open ended. At the end of the \nweek if the number of tweets for that particular account is in that bracket then the yes holders \nof that bracket are paid out $1. The no holders of every other bracket are paid out $1. \nEveryone else gets nothing. This site aims to properly value these brackets by modelling the \ntwitter behavior of various accounts then pricing brackets based off of that.  \n\n";
        this.modelused = "The model used here is conceptually loosely based of the famed Black Scholes model for \npricing options. The contest is equivalent to a binary option so it makes sense to apply it this \nway. Of course there are many differences between this situation and the options markets of \nChicago. \n\nOne of Black-Scholes implicit assumptions is that behavior follows a normal distribution. We do \nnot have the luxury of making this assumption since we are dealing with the behavior of \npeople. If this were the case I could simply take the past number of tweets in the given \ntimeframe of the week and then get the standard deviation and mean of this and use it to \ncome up with likelihoods for each bracket. Indeed this is actually what I did initially and it \nturned out to be wildly inaccurate. \n\nGiven the nature there is much more variance than can be prescribed to a normal distribution. \nAs a result I chose to use a Kernel Distribution Estimate(KDE) in order to create a custom \ndistribution for the data. More information on this method can be found LINK. This distribution \nis then used to generate the likelihood of each bracket and then the price from that likelihood. ";
        this.techstack = "This page is built in react, deployed to AWS. It gets the model data from a Python GraphQL \nbackend, also deployed on AWS. I chose to do it this way in order to be able to make use of \nthe extensive mathematics libraries available in python as well as the twitter API interface. ";
        this.background = "I am a software developer at a large US bank, currently I do full stack engineering. I am looking \nto get more into the data science side of things with this project and moving forward. Check out\n my github for the source code for both the backend and frontend:\n\nhttps://github.com/zkiihne/PredictItModeler\n\n If you have any questions or complements about this project please email me here:\n\nflashbackmodel@gmail.com\n\n";
        this.links = "Below are some useful links. picount.com is a tool for keeping track of the number of tweets \neach account has made. Lucahammer is another tool for analyzing an accounts past patterns. \nThe presidential schedule can be used to anticipate tweet causeing events.\n Similarly the vice presidential schedule can be used but that is harder to \nfind and will not be linked below."
      }

    render() {
        return (
           
          <div className={this.style}> <Grid container spacing={3} style={{ background: "none"}} justify="center">
              <Grid item xs={12}><TitleCard drops = {{number:"Flashback Models"}}/></Grid>
              <Grid item xs={3} ></Grid> <Grid item xs={6} ><HomeCard image={'./images/intro.jpg'}/></Grid><Grid item xs={3} ></Grid>
              <Grid item xs={12}><SimpleCard drops = {{number:this.intro, name:"Introduction"}}/></Grid>
              <Grid item xs={4} ><LinkCard text={' VP'} site={'https://www.predictit.org/markets/search?query=%40vp'} image={'./images/vp.jpg'}/></Grid>
              <Grid item xs={4} ><LinkCard text={' POTUS'} site={'https://www.predictit.org/markets/search?query=%40potus'} image={'./images/potus.jpg'}/></Grid>
              <Grid item xs={4} ><LinkCard text={' Whitehouse'} site={'https://www.predictit.org/markets/search?query=%40whitehouse'} image={'./images/whitehouse.jpg'}/></Grid>
              <Grid item xs={12}><SimpleCard drops = {{number:this.modelused, name:"Model Used"}}/></Grid>
              <Grid item xs={3} ></Grid> <Grid item xs={6} ><HomeCard image={'./images/stack1.png'}/></Grid><Grid item xs={3} ></Grid>
              <Grid item xs={12}><SimpleCard drops = {{number:this.techstack, name:"Tech Stack"}}/></Grid>
              <Grid item xs={12}><SimpleCard drops = {{number:this.links, name:"Useful links"}}/></Grid>
              <Grid item xs={4} ><LinkCard text={'Picount'} site={'http://www.picount.com/'} image={'./images/pi1.png'}/></Grid>
              <Grid item xs={4} ><LinkCard text={'Lucahammer'} site={'https://accountanalysis.app/'} image={'./images/luca.jpg'}/></Grid>
              <Grid item xs={4} ><LinkCard text={'Presidential Schedule'} site={'https://factba.se/topic/calendar'} image={'./images/schedule.png'}/></Grid>
              
              <Grid item xs={12}><SimpleCard drops = {{number:this.background, name:"Personal Background"}}/></Grid>
              
              </Grid></div>
         
          
            );}

        }

        export default HomePanel;