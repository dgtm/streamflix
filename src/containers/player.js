import React, { Component}  from 'react';
import ReactPlayer from 'react-player'

class Player extends Component {
  render () {
    if (this.props.showPlayer) {
      return (
        <div className="enclose-player">
          <Back onClick={this.props.hidePlayer} />
          <ReactPlayer url={this.props.url} width="1280" height="470" controls="true" playing />
        </div>
      )
    }
    else {
      return <span></span>
    }
  }
}

class Back extends Component {

  render () {
    return (
    <div onClick={this.props.onClick} className="Back">Back</div>
    )
  }
}
export default Player;
