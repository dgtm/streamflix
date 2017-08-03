import React, { Component}  from 'react';
// import { connect } from 'react-redux';
import classNames from 'classnames';

class HeroButton extends Component {

  render() {
    var btnClass = classNames({
      'Button': true,
      'btn-action-done': this.props.done
    });

    return (
        <a href="#" className={btnClass} data-primary={this.props.primary} onClick={this.props.onClick}>{this.props.text}</a>
    );
  }
}

export default HeroButton;
