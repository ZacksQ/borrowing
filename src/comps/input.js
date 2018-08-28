import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';
import { Icon } from './index'

export default class InputItems extends Component {
    constructor(props){
        super(props)
        this.state={
            value: ""
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value
        })
    }
    
    getvalue() {
        if (this.props.dou) {
            return (this.f.value + "-" + this.s.value);
        }
        return this.refs.input.state.value==undefined?"":this.refs.input.state.value;
    }
    render() {
        const { label, dou, first, second, icon, value, ...others } = this.props
        let tel = [];
        if (this.props.dou) {
            if (value != undefined) {
                tel = value.split('-');
            }
        }

        return dou ? (<div className="am-list-item am-input-item am-list-item-middle dou">
            <div className="am-list-line">
                <div className="am-input-label am-input-label-5">{label}</div>
                <div className="am-input-control">
                    <input style={{"flex":2}} {...first} defaultValue={tel.length > 0 ? tel[0] : ''} ref={f => this.f = f} /><span style={{"display":"flex","alignItems":'center'}}>-</span><input {...second} ref={s => this.s = s} defaultValue={tel.length > 1 ? tel[1] : ''}style={{"flex":2.5}} />
                    {icon ? (<Icon type={icon} onClick={this.props.iconClick} />) : (null)}
                </div>
            </div>
        </div>) : (
                <InputItem ref="input"
                    {...others} 
                    value={this.state.value}
                >{label}</InputItem>
            )
    }
}