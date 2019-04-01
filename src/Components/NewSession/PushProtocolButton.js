//Todo: add a tooltip to the button to explain its purpose
import React,{Component} from 'react'
import {Button} from '@material-ui/core'


const PUSH_ACTIVE_TIME = 0.1;
class  PushProtocolButton extends Component {
constructor(props){
  super(props);
}  

render(){
  console.log("elapsed time: " ,this.props.elapsedTime)
return(
<Button
style ={{display:"block" , margin:"0 auto 20px" }}
variant = "contained"
color = "secondary"
size="large"
disabled = {!(this.props.elapsedTime/60 > PUSH_ACTIVE_TIME)}
>
  I'm stuck
</Button>
)}
}




export default PushProtocolButton;