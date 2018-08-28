import React, { PureComponent } from 'react';
import classnames from 'classnames'


export default class Icon extends PureComponent {
  render() {
    const {type,...others} =this.props
    return (
      <div className="xl-icon" {...others}>
            <i className={type}></i>      
      </div>
    )
  }
};
