import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import DetailsDialog from "./DetailsDialog";
import Lightbox from 'react-images';

const styles = {
  card: {
    minWidth: 250,
    maxWidth: 250,
    backgroundColor: "#eff0f2"
    // margin: 15,
  },
  title: {
    fontSize: 14
  },
  grow: {
    flexGrow: 1
  }
};

class SimpleCard extends Component {
  state = {
    dialogOpen: false,
    lightBoxOpen: false,
    currentImage: 0,
  };
  openLightBox = (currentImage)=>{
    this.setState({lightBoxOpen: true, currentImage: currentImage});

  }

  onClickPrev = ()=>{
    let index = this.state.currentImage
    if (this.state.currentImage != 0){
      this.setState({currentImage: index-1})
    }
  }

  onClickNext = ()=>{
    let index = this.state.currentImage
    if (this.state.currentImage != this.props.data.imageList.length-1){
      this.setState({currentImage: index+1})
    }
  }

  render() {
    const { classes, data } = this.props;
    const images = data.imageList.map( function (image){ return {src: image}});

    return (
      <Card className={classes.card}>
        <Lightbox 
        images = {images} 
        isOpen = {this.state.lightBoxOpen}
        currentImage = {this.state.currentImage}
        onClickPrev = {this.onClickPrev}
        onClickNext = {this.onClickNext}
        onClose={()=>this.setState({lightBoxOpen: false})} />

        <DetailsDialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
          data={data}
          openLightBox ={this.state.openLightBox}
          onClick = {this.openLightBox}
        />

        <CardContent>
          <Typography variant="h6" component="h2">
            { moment(data.submit_time.toDate()).format("l") }
          </Typography>

          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {data.goal}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.setState({ dialogOpen: true })}
          >
            Details
          </Button>
          <div className={classes.grow} />
          {/* <Button size="small" color='secondary'>Delete</Button> */}
          {/* Delete Button should only be accessible for teachers */}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);
