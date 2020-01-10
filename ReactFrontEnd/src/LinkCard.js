import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({

  media: {
    height: (853)/2,
    width: (1280)/2,
    
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const urlpath = props.image
  const site = props.site
  const text = props.text

    

  return (
    
    <Card className={classes.card}>
      
      <CardActionArea  onClick={()=>{window.open(site);}}>
      <Typography gutterBottom variant="h5" component="h2" style={{ textAlign:"center" }}>
            {text}
          </Typography>
        <CardMedia
          className={classes.media}
          image={require(`${urlpath}`)}
          title={site}
          
        />
        
      </CardActionArea>
     
    </Card>
    
  );
}