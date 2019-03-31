import React,{Component} from 'react'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'

class  PushProtocolButton extends Component {
constructor(props){
  super(props);
}  


render(){
  let elapsedTime = this.props.initialTimeInMinutes - this.props.secondsRemaining/60;
  console.log("elapsed time: " ,elapsedTime)
return(
<Button
style ={{display:"block" , margin:"0 auto 20px" }}
variant = "contained"
color = "secondary"
size="large"
disabled = {!(this.elaspedTime > 1)}
>
  I'm stuck
</Button>
)}

}


const mapStateToProps = (state) => {
  return {
    initialTimeInMinutes: state.currentSession.timeInMinutes,
  }
}

export default connect(mapStateToProps)(PushProtocolButton);