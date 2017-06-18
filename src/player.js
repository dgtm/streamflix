import React, { Component}  from 'react';
import ReactPlayer from 'react-player'

class Player extends Component {
  render () {
    if (this.props.showPlayer) {
      return <ReactPlayer url={this.props.url} width="1280" height="470" controls="true" playing />
    }
    else {
      return <span></span>
    }
  }
}

export default Player;
