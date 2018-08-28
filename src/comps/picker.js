import React, { Component } from 'react';
import { Picker, List } from 'antd-mobile';

export default class PickerItem extends Component {

    render() {
        const { title, ...other } = this.props;
        return (
            <div onClick={() => {
                let inputs = document.querySelectorAll("input")
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].blur()
                }
            }}>
                <Picker
                    title={title}
                    {...other}
                >
                    <List.Item arrow="horizontal">{title}</List.Item>
                </Picker>
            </div>
        )
    }
}