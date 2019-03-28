import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  }
});
class TagArray extends Component {
  constructor() {
    super();

    this.state = {
      tags: []
    };
  }

  handleAddChip = chip => {
    const newChip = { text: chip, category: "red" };
    this.setState({ tags: [...this.state.tags, newChip] });
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
        dataSourceConfig={{ text: "text", category: "category" }}
        onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
      />
    );
  }
}

export default withStyles(styles)(TagArray);
