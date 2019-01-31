import React from "react"
import {Paper, Tabs} from "@material-ui/core"
import {Tab} from "@material-ui/core/"

export default props =>
<Paper>
<Tabs 
value={0}
  indicatorColor="primary"
  textColor="primary"
  centered
>
<Tab label="New Session" />
  <Tab label="Previous Sessions" />
</Tabs>
</Paper>