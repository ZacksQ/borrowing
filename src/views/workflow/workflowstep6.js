import React, { Component } from 'react';
import { PickerItem, Step, Icon, AtdToast, MessageBox, InfoItem, CountDown, LoadingComponent } from '../../comps/index'
import { _HTTP, adbook, _faceLive, _setTitle } from '../../helper/helper'
import './workflow.scss'

let address = []
export default class WorkFlowStep6 extends Component {
    constructor() {
        super()
        this.state = {
            iscountdown: false,
            showloading: true
        };
        this.getplatformid = _HTTP.get("LoansPlatform/moduleConfig")
            .then((response) => {
                if (response.data.code == 0) {
                    const data = response.data.data
                    localStorage.setItem("platform_id", data.platform_id)
                }
            })
    }
    
    componentDidMount() {
        _setTitle("真人认证")
        _stat("真人认证开启", "loan-wf6v1")
        this.facelive()
    }

    facelive(){
        _faceLive((res) => {
            if (res.data.code == 1) {
                this.refs.submitstatus.showMessageBox()
                this.setState({
                    iscountdown: true,
                    showloading: false
                })
            }else{
                this.facelive()
            }
        })
    }

    render() {
        return (
            <div className="workflow step3">
                <Step step={4} />
                {this.state.showloading==true?(<LoadingComponent />):(null)}
                <MessageBox ref="submitstatus" className="tipdialog">
                    <div className="bindstatus">
                        <div className="dialog-content ">
                            <Icon type="success" />
                        </div>
                        <div className="status">恭喜您，申请已受理</div>
                        <div className="tip"><span><CountDown value={3} unit="秒" start={this.state.iscountdown} handleCountDown={() => {

                            this.props.history.push('./application')

                        }} /></span>秒后跳转受信页面</div>
                    </div>
                </MessageBox>
                
            </div>
        )
    }
}