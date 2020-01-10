import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({

  media: {
    height: (853)/2,
    width: (1280)/2,
    
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const urlpath = props.image

  
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={require(`${urlpath}`)}
          title="Contemplative Reptile"
          
        />
        
      </CardActionArea>
     
    </Card>
  );
}