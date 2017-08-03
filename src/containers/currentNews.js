import React, { Component}  from 'react';
import ReactPlayer from 'react-player'
import uuid from 'uuid';
import EmailLinkInput from './emailLinkInput.js';
import HeroButton from './heroButton.js';
import { connect } from 'react-redux';
import { showEmailInput } from '../actions/index';

function mapStateToProps(state){
  return {
    visible: state.mailState.visible,
    sentEmail: state.mailState.sentEmail
  }
}

function mapDispatchToProps(dispatch){
  return {
    showEmail: () => dispatch(showEmailInput())
  }
}
class CurrentNews extends Component {
  showEmailBox () {
    if (!this.props.sentEmail) {
      this.props.showEmail()
    }
  }

  render () {
    return (
      <div>
        <div className="content">
          <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwSCOqVBbGncXNlieE3wdigQVtc2Afj5KG8b5MbF6CNemEix4fPg" alt="today" />
          <p>
          <br />
          <h2>// July 14 // 17:00 EDT // </h2>
          </p>

          <p>
A musical project founded in Austin Texas and based in Berlin Germany since 2014. Intent on creating and sharing a musical experience that is truly unique, Medulla writes, records, and performs music of emotional depth and intellectual sophistication.
          </p>

          <div className="button-wrapper">
            <HeroButton primary={true} text="Watch Now" onClick={this.props.playVideo}/>
            <HeroButton primary={false} text="+ Interested" onClick={() => this.showEmailBox()} done={this.props.sentEmail} />
          </div>
          <EmailLinkInput />

        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentNews);
