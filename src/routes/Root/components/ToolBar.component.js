import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Button,
  Icon,
} from 'antd';
import { navigate } from '../../../constants/navigate';

export default class extends PureComponent {
  static displayName = 'ToolBar'

  static propTypes = {
    label: PropTypes.node.isRequired,
    onNavigate: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  navigate = action => this.props.onNavigate(action)

  render() {
    const { label } = this.props;

    return (<div className="toolbar">
      <span>
        <Button.Group size="default">
          <Button
            ghost
            type="primary"
            onClick={() => this.navigate(navigate.PREVIOUS)}
          >
            <Icon type="left" />{navigate.PREVIOUS}
          </Button>
          <Button
            ghost
            type="primary"
            onClick={() => this.navigate(navigate.TODAY)}
          >
            {navigate.TODAY}
          </Button>
          <Button
            ghost
            type="primary"
            onClick={() => this.navigate(navigate.NEXT)}
          >
            {navigate.NEXT}<Icon type="right" />
          </Button>
        </Button.Group>
      </span>
      <span className="toolbar-label">
        {label}
      </span>
    </div>);
  }
}
