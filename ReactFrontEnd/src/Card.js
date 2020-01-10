import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  Typography: {
    display: 'inline-block'
  }
});

export default function SimpleCard(slops) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const name = slops.drops.name
  const num = slops.drops.number
  console.log(slops)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {name}
        </Typography>
        <Typography variant="h5" component="h2" paragraph display="inline">
        <pre style={{ fontFamily: 'inherit' }}>
        {num}
    </pre>
        </Typography>
        
      </CardContent>
      
    </Card>
  );
}
// export default SimpleCard;