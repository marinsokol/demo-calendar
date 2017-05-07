import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Card,
  Input,
  Button,
  Row,
  notification,
  Spin,
} from 'antd';
import { messages } from '../../../constants/messages';
import { login } from '../../../utils/setFirebase';

export default class extends PureComponent {
  static displayName = 'Login'

  static propTypes = {
    router: PropTypes.shape(),
  }

  state = {
    email: '',
    password: '',
    submit: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleInput = e => this.setState({
    [e.target.name]: e.target.value,
  })

  login = () => {
    const { router } = this.props;
    this.setState({ submit: true });

    login(this.state)
      .then(() => router.replace('/'))
      .catch(() => {
        this.setState({ submit: false });
        notification.error({
          message: messages.loginErrTitle,
          description: messages.loginErrDesc,
        });
      });
  }

  render() {
    const { email, password, submit } = this.state;
    let button = null;
    if (submit) {
      button = (<Spin>
        <Button
          type="primary"
          onClick={this.login}
        >
          {messages.login}
        </Button>
      </Spin>);
    } else {
      button = (<Button
        type="primary"
        onClick={this.login}
      >
        {messages.login}
      </Button>);
    }

    return (<div className="main-wrap login">
      <Card title={messages.login} style={{ width: 400 }}>
        <Row>
          <p>{messages.email}</p>
          <Input
            name="email"
            value={email}
            onChange={this.handleInput}
          />
        </Row>
        <Row>
          <p>{messages.password}</p>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInput}
          />
        </Row>
        <Row>
          {button}
        </Row>
      </Card>
    </div>);
  }
}
