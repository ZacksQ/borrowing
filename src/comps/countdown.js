import React, { PureComponent } from 'react';
import classNames from 'classnames'

export default class CountDown extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
        this.timer = null;
        this.initvallue = props.value
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.start == true && (this.state.value == this.initvallue || this.state.value == 0)) {
            this.startimer()
        }
    }

    startimer() {
        clearInterval(this.timer)
        this.setState({
            value: this.initvallue
        })
        this.timer = setInterval(() => {
            if (this.state.value > 0) {
                this.setState({
                    value: this.state.value - 1
                })
            } else {
                clearInterval(this.timer)
                if ("handleCountDown" in this.props) {
                    this.props.handleCountDown()
                    this.setState({
                        value: this.props.value
                    })
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getvalue() {
        return this.state.value
    }

    render() {
        const { className, unit, resend, type } = this.props;
        const cls = classNames("countdown", className)
        return (
            <span className={cls}>
                {this.state.value == 0 && type == "sendcode" ? (<span style={{ "fontSize": "0.24rem", "color": "#6A94EC" }} onClick={() => {
                    resend()
                }}>重新发送</span>) : (<span>{this.state.value}{unit}</span>)}
            </span>
        )
    }
};
