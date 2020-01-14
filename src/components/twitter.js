import React, { Component } from "react"
import { Helmet } from "react-helmet"

export default class Twitter extends Component {
  render(props) {
    return (
      <React.Fragment>
        <Helmet>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </Helmet>
        <a className="twitter-timeline" href="https://twitter.com/LoFiSkeptic?ref_src=twsrc%5Etfw">Tweets by LoFiSkeptic</a>
      </React.Fragment>
    )
  }
}
