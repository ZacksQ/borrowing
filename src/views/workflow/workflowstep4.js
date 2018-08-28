import React, { Component } from 'react';
import { PickerItem, Button, InputItems, List, Step, Icon, AtdToast, MessageBox, InfoItem, CountDown } from '../../comps/index'
import { _HTTP, adbook, _faceLive, _setTitle, _stat } from '../../helper/helper'
import Qs from 'qs'
import './workflow.scss'

const getdata = _HTTP.get('LoansDispatch/saveConnect')

let marriage =
    [{
        value: '21',
        label: "初婚",
    }, {
        value: '10',
        label: "未婚",
    }, {
        value: '22',
        label: "再婚",
    }, {
        value: '30',
        label: "丧偶",
    }, {
        value: '40',
        label: "离异",
    }, {
        value: '90',
        label: "其他（事实婚姻）",
    }]


let relationship1 =
    [{
        value: '01',
        label: "父母",
    }, {
        value: '02',
        label: "子女及兄弟姐妹",
    }, {
        value: '03',
        label: "亲属",
    }]


let relationship2 =
    [{
        value: '04',
        label: "同事",
    }, {
        value: '05',
        label: "朋友",
    }, {
        value: '06',
        label: "同学",
    }, {
        value: '99',
        label: "其他"
    }]

export default class WorkFlowStep4 extends Component {
    constructor() {
        super()
        this.state = {
            marriage: ['21'],
            matename: '',
            matetel: '',
            relationship1: ['01'],
            contactname1: '',
            contacttel1: '',
            relationship2: ['04'],
            contactname2: '',
            contacttel2: '',
            agreementstatue: false,
            agreementdialogstatue: false,
            iscert: false,
            iscountdown: false,
            operator_url: ''
            , protocolname: ""
            , protocolcontent: ""
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
        _setTitle("运营商认证")
        getdata.then((response) => {
            if (response.data.code == 0) {
                if (response.data.data.is_operator_verift == 1) {
                    if (localStorage.getItem("shown") == null) {
                        localStorage.setItem("shown", true)
                        this.refs.certstatus.showMessageBox()
                    }
                    this.setState({
                        iscert: true
                    })
                }
                this.setState({
                    operator_url: response.data.data.operator_url
                })

                // const data = response.data.data
                // this.setState({
                //     operator_url: response.data.data.operator_url,
                //     relationship1: data.connect.length > 0 ? [data.connect[0].relationship] : "",
                //     contactname1: data.connect.length > 0 ? data.connect[0].name : "",
                //     contacttel1: data.connect.length > 0 ? data.connect[0].telephone : "",
                //     relationship2: data.connect.length > 1 ? [data.connect[1].relationship] : "",
                //     contactname2: data.connect.length > 1 ? data.connect[1].name : "",
                //     contacttel2: data.connect.length > 1 ? data.connect[1].telephone : ""
                // })
            }
        })

        this.setState({
            marriage: localStorage.getItem("marriage") ? [localStorage.getItem("marriage")] : [],
            matename: localStorage.getItem("matename") ? localStorage.getItem("matename") : "",
            matetel: localStorage.getItem("matetel") ? localStorage.getItem("matetel") : "",
            relationship1: localStorage.getItem("relationship1") ? [localStorage.getItem("relationship1")] : [],
            contactname1: localStorage.getItem("contactname1") ? localStorage.getItem("contactname1") : "",
            contacttel1: localStorage.getItem("contacttel1") ? localStorage.getItem("contacttel1") : "",
            relationship2: localStorage.getItem("relationship2") ? [localStorage.getItem("relationship2")] : [],
            contactname2: localStorage.getItem("contactname2") ? localStorage.getItem("contactname2") : "",
            contacttel2: localStorage.getItem("contacttel2") ? localStorage.getItem("contacttel2") : ""
        })

        _HTTP.get("LoansDispatch/getPlatformProtocol/")
            .then(response => {
                if (response.data.code == 0) {
                    this.setState({
                        protocolname: response.data.data.p_name
                        , protocolcontent: response.data.data.p_content
                    })
                }
            })
    }

    saveStorge() {
        localStorage.setItem("marriage", this.state.marriage[0])
        localStorage.setItem("matename", this.state.matename)
        localStorage.setItem("matetel", this.state.matetel)
        localStorage.setItem("relationship1", this.state.relationship1[0])
        localStorage.setItem("contactname1", this.state.contactname1)
        localStorage.setItem("contacttel1", this.state.contacttel1)
        localStorage.setItem("relationship2", this.state.relationship2[0])
        localStorage.setItem("contactname2", this.state.contactname2)
        localStorage.setItem("contacttel2", this.state.contacttel2)

    }

    facelive() {
        _faceLive((res) => {
            if (res.data.code == 1) {
                this.refs.submitstatus.showMessageBox()
                this.setState({
                    iscountdown: true
                })
            }
        })
    }

    render() {
        return (
            <div className="workflow step3">
                <Step step={4} />

                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <PickerItem data={marriage}
                        title="婚姻状况"
                        cols={1}
                        value={this.state.marriage}
                        onOk={v => {
                            this.setState({ marriage: v })
                            // if (v[0] == '10' || v[0] == '30' || v[0] == '40') {
                            //     this.refs.mate.style.display = 'none'
                            // } else {
                            //     this.refs.mate.style.display = 'block'
                            // }
                        }}
                    />
                    {this.state.marriage[0] != '10' && this.state.marriage[0] != '30' && this.state.marriage[0] != '40' ? (<div ref="mate">
                        <InputItems ref="matevalue" label="配偶" onChange={(v) => { console.log(v) }} dou={true} first={{
                            placeholder: "姓名", type: "text", maxLength: "15", onChange: (e) => {
                                this.setState({
                                    matename: e.target.value
                                })
                            }
                        }} second={{
                            placeholder: "联系电话", type: "tel", maxLength: "11", onChange: (e) => {
                                this.setState({
                                    matetel: e.target.value
                                })
                            }
                        }} icon="txl" value={this.state.matename + '-' + this.state.matetel} iconClick={() => {
                            adbook((res) => {
                                _stat("配偶通讯录按钮被点击", "loan-wf4v1")
                                if (res.result == "1") {
                                    this.setState({
                                        matename: res.data.name,
                                        matetel: res.data.phone
                                    })
                                }
                            })
                        }} />
                    </div>) : (null)}
                </List>
                <br />
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <PickerItem data={relationship1}
                        title="联系人关系1"
                        value={this.state.relationship1}
                        onOk={v => this.setState({ relationship1: v })}
                        cols={1} />
                    <InputItems ref="con1" label="联系方式" onChange={(v) => { console.log(v) }} dou={true} first={{
                        placeholder: "姓名", type: "text", maxLength: "15", value: this.state.contactname1, onChange: (e) => {
                            this.setState({
                                contactname1: e.target.value
                            })
                        }
                    }} second={{
                        placeholder: "联系电话", type: "tel", maxLength: "11", value: this.state.contacttel1, onChange: (e) => {
                            this.setState({
                                contacttel1: e.target.value
                            })
                        }
                    }} icon="txl" value={this.state.contactname1 + '-' + this.state.contacttel1} iconClick={() => {
                        adbook((res) => {
                            _stat("联系人关系1通讯录按钮被点击", "loan-wf4v1")
                            if (res.result == "1") {
                                this.setState({
                                    contactname1: res.data.name,
                                    contacttel1: res.data.phone
                                })
                            }
                        })
                    }} />
                </List>
                <br />
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <PickerItem data={relationship2}
                        title="联系人关系2"
                        value={this.state.relationship2}
                        onOk={v => this.setState({ relationship2: v })}
                        cols={1} />
                    <InputItems ref="con2" label="联系方式" onChange={(v) => { console.log(v) }} dou={true} first={{
                        placeholder: "姓名", type: "text", maxLength: "15", value: this.state.contactname2, onChange: (e) => {
                            this.setState({
                                contactname2: e.target.value
                            })
                        }
                    }} second={{
                        placeholder: "联系电话", type: "tel", maxLength: "11", value: this.state.contacttel2, onChange: (e) => {
                            this.setState({
                                contacttel2: e.target.value
                            })
                        }
                    }} icon="txl" value={this.state.contactname2 + '-' + this.state.contacttel2} iconClick={() => {
                        adbook((res) => {
                            _stat("联系人关系2通讯录按钮被点击", "loan-wf4v1")
                            if (res.result == "1") {
                                this.setState({
                                    contactname2: res.data.name,
                                    contacttel2: res.data.phone
                                })
                            }
                        })
                    }} />
                </List><br />
                <InfoItem label="运营商" type={this.state.iscert == false ? 2 : 1} onClick={() => {
                    this.saveStorge()
                    window.location.href = this.state.operator_url
                    //"https://open.shujumohe.com/box/yys?box_token=D08ADA5BA6CA4EC38B1DA0F8544DC7C0&cb=" + window.location.origin + '/' + window.location.hash
                }} />
                <br /><br />
                <div className="agreement">
                    <div className="check-wrap" onClick={() => {
                        this.setState({
                            agreementstatue: !this.state.agreementstatue
                        })
                    }}><Icon type={!this.state.agreementstatue ? "cheack" : "cheacked"} /></div>我已阅读并同意 <span className="txt-primary" onClick={() => {
                        this.ag.showMessageBox()
                    }}>《{this.state.protocolname}》</span>
                </div>
                <br />
                <div className="wrap">
                    <Button txt="真人提交" onClick={() => {
                        // this.refs.submitstatus.showMessageBox()
                        // this.setState({
                        //     iscountdown: true
                        // })
                        _stat("真人提交按钮被点击", "loan-wf4v1")
                        if (this.state.agreementstatue == true) {
                            // const refs = this.refs;
                            // if (this.state.marriage[0] != '10' && this.state.marriage[0] != '30' && this.state.marriage[0] != '40') {
                            //     let mate = refs.matevalue.getvalue().split('-')
                            // }
                            // let con1 = refs.con1.getvalue().split('-')
                            // let con2 = refs.con2.getvalue().split('-')

                            let postdata = {
                                marital_status: this.state.marriage[0],
                                is_operator_verift: this.state.iscert,
                                first_relation: this.state.relationship1[0],
                                first_name: this.state.contactname1,
                                first_mobile: this.state.contacttel1,
                                second_relation: this.state.relationship2[0],
                                second_name: this.state.contactname2,
                                second_mobile: this.state.contacttel2
                                // marital_name: mate[0],
                                // marital_telephone: mate[1]
                            }
                            // console.log(postdata)
                            // return false
                            if (postdata.marital_status == undefined) {
                                AtdToast.fail("婚姻状况未选择");
                                return false
                            }
                            if (postdata.first_relation == undefined) {
                                AtdToast.fail("联系人关系1未选择");
                                return false
                            }
                            if (postdata.second_relation == undefined) {
                                AtdToast.fail("联系人关系2未选择");
                                return false
                            }

                            if (postdata.marital_status != '10' && postdata.marital_status != '30' && postdata.marital_status != '40') {
                                if (postdata.marital_name == "" || postdata.marital_telephone == "") {
                                    AtdToast.fail("配偶信息不能为空");
                                    return false
                                } else {
                                    postdata.marital_name = this.state.matename,
                                        postdata.marital_telephone = this.state.matetel
                                }
                            }

                            if (postdata.first_name == "" || postdata.first_mobile == "") {
                                AtdToast.fail("联系人关系1不能为空");
                                return false
                            }

                            if (postdata.second_name == "" || postdata.second_mobile == "") {
                                AtdToast.fail("联系人关系2不能为空");
                                return false
                            }
                            this.saveStorge()
                            if (this.state.iscert == false) {
                                AtdToast.fail("运营商未认证");
                                return false
                            }

                            _HTTP.post('LoansDispatch/saveConnect', Qs.stringify(postdata))
                                .then(response => {
                                    if (response.data.code == 0) {
                                        this.facelive()
                                    } else {
                                        AtdToast.fail(response.data.message)
                                    }
                                })
                        } else {
                            AtdToast.fail("协议未同意")
                        }
                    }} />
                </div>
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
                <MessageBox ref="certstatus" className="tipdialog">
                    <div className="bindstatus">
                        <div className="dialog-content ">
                            <Icon type="success" />
                        </div>
                        <div className="status">认证成功</div>
                    </div>
                </MessageBox>
                <MessageBox ref={ag => this.ag = ag}>
                    <div className="confirm agreement">
                        <h4>{this.state.protocolname}</h4>
                        <div className="content">
                            <pre>
                                {this.state.protocolcontent}
                            </pre>
                        </div>
                    </div>
                </MessageBox>
            </div>
        )
    }
}