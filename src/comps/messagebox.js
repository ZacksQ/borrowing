import React, { Component } from 'react';
import { Mask } from './index'

export default class MessageBox extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    showMessageBox() {
        this.setState({
            show: true
        })
    }
    closeMessageBox() {
        const { maskclick } = this.props
        if (maskclick !== false) {
            this.setState({
                show: false
            })
        }
    }
    render() {
        // return this.state.show ? (<div>
        //     <div className="message-item">
        //         {this.props.children}
        //     </div>
        //     <Mask closeMessageBox={this.closeMessageBox.bind(this)} />
        // </div>) : (null)
        const cls = this.props.className
        return (<div className={cls} style={this.state.show ? { display: "block" } : { display: "none" }}>
            <div className="message-item">
                {this.props.children}
            </div>
            <Mask closeMessageBox={this.closeMessageBox.bind(this)} />
        </div>)
    }
}