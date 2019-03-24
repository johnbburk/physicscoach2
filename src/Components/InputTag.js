import React, { Component } from "react";

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
                        <li key={tag}>
                            {tag}
                            <button type="button" onClick ={()=> this.removeTag(i)}>Remove</button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                </ul>
            </div>
        );
    }
}

export default InputTag;