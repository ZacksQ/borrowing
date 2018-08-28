import React, { Component } from 'react';
import 'normalize.css'
import './fulldata.scss'
import { InfoItem, Button, List, Icon } from '../../comps/index'

export default class CompleteData extends Component {
    state = {
        agreementstatue: false
    }
    render() {
        return (<div className="fulldata">
            <div className="wrap tit">补充信息</div>
            <List style={{ backgroundColor: 'white' }} className="picker-list">
                <InfoItem label="收款银行卡" path="" type={0} onClick={() => {
                    this.props.history.push('./bindcard')
                }} />
                <InfoItem label="个人信息" path="" type={1} />
                <InfoItem label="工作信息" path="" type={1} />
                <InfoItem label="其他信息" path="" type={1} />
            </List>
            <div className="wrap agreement">
                <div className="check-wrap" onClick={() => {
                    this.setState({
                        agreementstatue: !this.state.agreementstatue
                    })
                }}><Icon type={!this.state.agreementstatue ? "cheack" : "cheacked"} /></div>我已阅读并同意 <span className="txt-primary">《XXX征信授权协议》</span>
            </div>
            <div className="wrap">
                <Button txt="立即申请" />
            </div>
        </div>)
    }
}