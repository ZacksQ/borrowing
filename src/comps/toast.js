import React, { PureComponent } from 'react';
import classNames from 'classnames'
export default class Toast extends PureComponent {
  state = {
    show: false
  }

  hello(){
      this.setState({
        show: true
      },()=>{
        setTimeout(()=>{
          this.toast.className+=" toast-fadein"
        },10)
        setTimeout(()=>{
          this.setState({
            show: false
          })
        }, 1110)
      })
  }
  
  render() {
    return this.state.show?(
      <div className="xl-toast" ref={toast=>this.toast=toast}>
            {/* <div className="mask">
                    <div className="modal">
                        弹出框
                    </div>
            </div> */}
            {this.props.txt}
      </div>
    ):(null)
  }
};
