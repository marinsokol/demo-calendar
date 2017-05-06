import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import Calendar from '../containers/Calendar';
import Header from '../containers/Header';

export default class extends PureComponent {
  static displayName = 'Root'

  static propTypes = {
    children: PropTypes.element,
    router: PropTypes.shape(),
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { router } = this.props;

    return (<div className="main-wrap">
      <Header router={router} />
      <Calendar router={router} />
      {this.props.children}
    </div>);
  }
}
