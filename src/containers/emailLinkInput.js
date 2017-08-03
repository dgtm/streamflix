import PouchDB from 'pouchdb';
import React, { Component}  from 'react';
import { connect } from 'react-redux';
import { submitEmail } from '../actions/index';

function mapStateToProps(state){
  return {
    visible: state.mailState.visible,
    sentEmail: state.mailState.sentEmail,
    alreadySubscribed: state.mailState.alreadySubscribed
  }
}

function mapDispatchToProps(dispatch){
  return {
    hitSubmit: (email) => dispatch(submitEmail(email))
  }
}

// const EmailLinkInput = (props) => {}
class EmailLinkInput extends Component {
  saveEmail(value) {
    // var db = new PouchDB('https://dipesh.gautam:W7GOG6m4Yt@couchdb.cloudno.de/streamflix');
    var db = new PouchDB('http://localhost:5984/subscriptions');

    db.get(value).then((data) => {
      this.props.hitSubmit(data);
      // this.setState({sentEmail: true});
      }).catch((err) => {
        if (err.status === 404){
          db.put({_id: value, email: value}).then((response) => {
            // this.onEmailSubmission(value);
            this.props.hitSubmit(value);
            // this.setState({sentEmail: true});
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.saveEmail(e.target.value);
    }
  }
  render() {
    if (this.props.visible) {
      return (
        <div className="email-input">
          <input autoFocus type="text" placeholder="Your Email" onKeyPress={this.handleKeyPress.bind(this)}>
          </input>
        </div>);
    } else {
      if (this.props.sentEmail) {
        return <div>We will be sending you an email an hour before the actual event</div>;
      } else {
        return(<div></div>);
      }

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailLinkInput);
