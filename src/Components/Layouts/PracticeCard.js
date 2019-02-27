import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";


const styles = {
    card: {
      minWidth: 275,
 
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

function SimpleCard(props) {
  const { classes, data } = props;
  const bull = <span className={classes.bullet}>•</span>;

  console.log('in here')
  console.log(data)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
        { moment(data.start_time.toDate()).format('l') }
        </Typography>
        <Typography variant="h5" component="h2">
          {data.goal}
        </Typography>
       
        
      </CardContent>
      <CardActions>
        <Button size="small">Expand</Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SimpleCard);