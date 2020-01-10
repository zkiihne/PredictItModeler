import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    
    alignItems: "right",
    alignSelf: "right",
    alignContent: "right",
    justifyContent: "right",
    minWidth: 200,
    fontSize: "50px",
    background: "white",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 44,
  },
  pos: {
    marginBottom: 12,
  },
  Typography: {
    display: 'inline-block'
  }
});

export default function TitleCard(slops) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const name = slops.drops.name
  const num = slops.drops.number
  console.log(slops)
  return (
    <Card className={classes.card}>
      <CardContent>
        
        <Typography style={{ fontSize: '40px', color:"rgb(127, 127, 127)", fontFamily: '"Comic Sans"', textAlign:"center" }} >
        {num}
        </Typography>
        
      </CardContent>
      
    </Card>
  );
}
