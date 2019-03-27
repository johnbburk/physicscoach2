import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: theme.spacing.unit / 2
    },

});

class TagArray extends Component {
    constructor() {
        super();

        this.state = {
            tags: []
        };
    }

    handleAddChip = chip => {
        this.setState({ tags: [...this.state.tags, chip] });
    };

    handleDeleteChip = (chip, index) => {
        const newTags = [...this.state.tags];
        newTags.splice(index, 1);
        this.setState({ tags: newTags });
    };

    render() {

        return (
                <ChipInput
                    value={this.state.tags}
                    onAdd={chip => this.handleAddChip(chip)}
                    onDelete={(chip, index) =>
                        this.handleDeleteChip(chip, index)}
                />
        );
    }
}

export default withStyles(styles)(TagArray);
