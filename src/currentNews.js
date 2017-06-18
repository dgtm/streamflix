import React, { Component}  from 'react';
import ReactPlayer from 'react-player'
import PouchDB from 'pouchdb';
import uuid from 'uuid';
class CurrentNews extends Component {
  constructor (){
    super();
    this.state = { showEmailInput: false };
  }
  render () {
    return (
      <div>
        <div className="content">
          <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwSCOqVBbGncXNlieE3wdigQVtc2Afj5KG8b5MbF6CNemEix4fPg" alt="today" />
          <p>
          <br />
          <h2>July 14 from 2 PM EDT</h2>
          </p>

          <p>
A musical project founded in Austin Texas and based in Berlin Germany since 2014. Intent on creating and sharing a musical experience that is truly unique, Medulla writes, records, and performs music of emotional depth and intellectual sophistication.
          </p>

          <div className="button-wrapper">
            <HeroButton primary={true} text="Get Free Tickets" onClick={this.props.playVideo}/>
            <HeroButton primary={false} text="+ Interested" onClick={() => this.setState({showEmailInput: true})}/>
          </div>
          <EmailLinkInput displayIf={this.state.showEmailInput} />
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}
class EmailLinkInput extends Component {
  constructor (){
    super();
    this.state = { sentEmail: false, alreadySubscribed: false };
  }

  saveEmail(value) {
    var db = new PouchDB('http://localhost:5984/subscriptions');
    db.get(value).then((data) => {
      this.setState({sentEmail: true});
      }).catch((err) => {
        if (err.status === 404){
          db.put({_id: value, email: value}).then((response) => {
            this.setState({sentEmail: true});
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
    if (this.props.displayIf) {
      return (
        <div className="email-input">
          <input type="text" placeholder="Your Email" onKeyPress={this.handleKeyPress.bind(this)}>
          </input>
        </div>);
    } else {
      if (this.state.sentEmail) {
        return <div>Sent Email</div>;
      } else {
        return(<div></div>);
      }

    }
  }
}

var HeroButton = React.createClass({
  playShit: function() {
    this.props.onClick()
  },
  render: function() {
    return (
        <a href="#" className="Button" data-primary={this.props.primary} onClick={this.playShit}>{this.props.text}</a>
    );
  }
})
export default CurrentNews;
