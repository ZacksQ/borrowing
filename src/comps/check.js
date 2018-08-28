import React, { Component } from 'react';
import { Icon } from './';
export default class Check extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: this.props.checked
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            checked: nextProps.checked
        })
    }
    
    render() {
        // console.log(this.props.checked)
        return (
            <div className="check-icon">
                <Icon type={this.state.checked?"jxz":"wxz"} />
            </div>
        )
    }
};
