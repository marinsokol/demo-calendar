import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Icon,
  Button,
  notification,
} from 'antd';
import { messages } from '../../../constants/messages';
import { logout } from '../../../utils/setFirebase';

export default class extends PureComponent {
  static displayName = 'Header'

  static propTypes = {
    user: PropTypes.shape(),
    router: PropTypes.shape(),
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleLogout = () => {
    const { router } = this.props;

    logout()
      .then(() => {
        router.replace('/login');
      }).catch(() =>
        notification.error({
          message: 'Neuspiješna odjava',
        })
      );
  }

  render() {
    const { user } = this.props;

    return (<div className="header">
      <div>
        {(user) ? user.email : ''}
        &nbsp;&nbsp;
        <Button
          type="dashed"
          onClick={this.handleLogout}
        >
          <Icon type="logout" />&nbsp;{messages.logout}
        </Button>
      </div>
    </div>);
  }
}
