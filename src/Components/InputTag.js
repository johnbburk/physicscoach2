import React, { Component } from "react";
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class InputTag extends Component {
    constructor() {
        super();

        this.state = {
            tags: []
        };
    }
    inputKeyDown = e => {
        const val = e.target.value;
        if (e.key === "Enter" && val) {

            if(this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())){
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.tagInput.value = null;
        }
        else if(e.key === "Backspace" && !val){
            this.removeTag(this.state.tags.length -1)
        }
    };

    removeTag = (i) =>{
        const newTags = [...this.state.tags];
        newTags.splice(i,1);
        this.setState({tags: newTags});
    }

   


    render() {
        return (
            <div className="input-tag">
                <ul className="input-tag__tags">
                    {this.state.tags.map((tag, i) => (
                        <Chip key={tag}
                            label = {tag}
                            onDelete ={()=> this.removeTag(i)}
                        />
                    ))}
                    <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(InputTag);