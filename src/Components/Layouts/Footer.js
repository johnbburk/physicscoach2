import React, { Component } from "react"
import { Paper, Tabs } from "@material-ui/core"
import { Tab } from "@material-ui/core/"
import PracticeList from "./PracticeList"
export default class FooterTabs extends Component {

  state = {
    currentTab: 0,
  };

  render() {
    const currentTab = this.state.currentTab;

    return (
      <Paper className="Paper-container">
        <Tabs
          value={currentTab}
          onChange={(event, value) => this.setState({currentTab: value})}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="New Session" />
          <Tab label="Previous Sessions" />
        </Tabs>
        {currentTab === 0 && "Item One"}
        {currentTab === 1 && <PracticeList/>}
      </Paper>
    )
  }
}