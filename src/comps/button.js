import React, { PureComponent } from 'react';
import classNames from 'classnames'

export default class Button extends PureComponent {
  render() {
    const {className,txt,children,...others}=this.props
    const cls = classNames("but",className)
    return (
            <div className="xl-button" {...others}>
              <div className={cls}>
                  {className !== "loading" && (txt || "下一步")}
                  {className === "loading" && <div className="loading">{children}</div>}
              </div>
            </div>
    )

    }
};
