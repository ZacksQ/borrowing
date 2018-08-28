import React, { Component } from 'react';
import { AtdToast, Button, InputItems, List, Step } from '../../comps/index'
import { _faceIdCard, tid, _HTTP, _setTitle, _stat } from '../../helper/helper'
import './workflow.scss'
import idcardf from '../../assets/front.png'
import idcardb from '../../assets/身份证反面@2x.png'
import Qs from 'qs'

export default class WorkFlowStep2 extends Component {
    constructor() {
        super()
        this.state = {
            bank: [],
            name: "",
            cardid: "",
            zmurl: idcardf,
            fmurl: idcardb,
            isupfront: false,
            isupback: false
        };
        this.httpdata = _HTTP.get("LoansDispatch/saveIdentity")
        this.getplatformid = _HTTP.get("LoansPlatform/moduleConfig")
            .then((response) => {
                if (response.data.code == 0) {
                    const data = response.data.data
                    localStorage.setItem("platform_id", data.platform_id)
                }
            })
    }

    componentDidMount() {
        _setTitle("身份信息认证")
        this.httpdata.then(response => {
            if (response.data.code == 0) {
                const data = response.data.data
                if (data.front_image != "" && data.front_image != undefined) {
                    this.setState({
                        zmurl: `data:image/png;base64,${data.front_image}`,
                        isupfront: true
                    })
                }
                if (data.back_image != "" && data.back_image != undefined) {
                    this.setState({
                        fmurl: `data:image/png;base64,${data.back_image}`,
                        isupback: true
                    })
                }
                this.setState({
                    name: data.name
                    , cardid: data.id_card_number
                    // , zmurl: `data:image/png;base64,${data.front_image}`
                    // , fmurl: `data:image/png;base64,${data.back_image}`
                })
                console.log(this.state)
            }
        })
    }

    faceplusfont() {
        if (localStorage.getItem("platform_id")) {
            _faceIdCard((res) => {
                // console.log(res)
                if (res.data.code == "1") {
                    console.log("获取身份证正面成功" + tid, res)
                    _HTTP.get("/LoansAccount/getTidInfo?tid=" + tid + "&platform_id=" + localStorage.getItem("platform_id")).then(res => {

                        if (res.data.code === 0) {
                            console.log(res)
                            this.setState({
                                name: res.data.data.front_info.name,
                                cardid: res.data.data.front_info.id_card_number,
                                zmurl: `data:image/png;base64,${res.data.data.front_img}`,
                                isupfront: true
                            })
                            this.refs.modifyname.style.display = 'block'
                            this.refs.modifycardid.style.display = 'block'
                        }
                    })
                } else {
                    console.log("获取身份证正面失败", res)
                }
            })
        } else {
            AtdToast.fail("您的操作太快啦，稍等试试")
        }
    }

    faceplusback() {
        if (localStorage.getItem("platform_id")) {
            _faceIdCard((res) => {
                if (res.data.code == "1") {
                    console.log("获取身份证反面成功" + tid, res)
                    _HTTP.get("/LoansAccount/getTidInfo?tid=" + tid + "&platform_id=" + localStorage.getItem("platform_id")).then(res => {

                        if (res.data.code === 0) {
                            console.log(res)
                            this.setState({
                                fmurl: `data:image/png;base64,${res.data.data.back_img}`,
                                isupback: true
                            })

                        }
                    })
                } else {
                    console.log("获取身份证反面失败", res)
                }
            }, null, "1")
        } else {
            AtdToast.fail("您的操作太快啦，稍等试试")
        }
    }

    render() {
        return (
            <div className="workflow step2">
                <Step step={2} />
                <div className="id-card-pannel">
                    <div className="card-positive" onClick={() => {
                        _stat("身份证正面OCR被点击", "loan-wf2v1")
                        this.faceplusfont()
                    }}>
                        {/* <Icon type="sfzzm" /> */}
                        <div className="card">
                            <img src={this.state.zmurl} alt="" />
                        </div>
                        <div className="label">身份证正面</div>
                    </div>
                    <div className="card-opposite" onClick={() => {
                        _stat("身份证反面OCR被点击", "loan-wf2v1")
                        this.faceplusback()
                    }}>
                        {/* <Icon type="sfzfm" /> */}
                        <div className="card">
                            <img src={this.state.fmurl} alt="" />
                        </div>
                        <div className="label">身份证反面</div>
                    </div>
                </div>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                    {/* <InputItems label="真实姓名" placeholder="点击扫描身份证" value={this.state.name} onClick={() => {
                        console.log(12)
                    }} /> */}
                    <div className="am-list-item am-input-item am-list-item-middle">
                        <div className="am-list-line">
                            <div className="am-input-label am-input-label-5">真实姓名</div>
                            <div className="am-input-control">
                                <input placeholder="点击扫描身份证" type="text" value={this.state.name} onChange={e => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }} onClick={(e) => {
                                    if (e.target.value == "") {
                                        this.faceplusfont()
                                    }
                                }} />
                            </div>
                            <div className="modify" ref="modifyname" onClick={() => {
                                this.faceplusfont()
                            }}>修改</div>
                        </div>
                    </div>
                    <div className="am-list-item am-input-item am-list-item-middle">
                        <div className="am-list-line">
                            <div className="am-input-label am-input-label-5">身份证号</div>
                            <div className="am-input-control" onClick={() => {
                                this.faceplusback()
                            }}>
                                <input placeholder="点击扫描身份证" maxLength="18" readyonly="true" type="text" value={this.state.cardid} onClick={() => {
                                    this.faceplusback()
                                }} />
                            </div>
                            <div className="modify" ref="modifycardid" onClick={() => {
                                this.faceplusback()
                            }}>修改</div>
                        </div>
                    </div>
                    {/* <InputItems label="身份证号" placeholder="点击扫描身份证" maxLength="18" readyonly="true" value={this.state.cardid} /> */}
                    {/* <PickerItem data={bank}
                        title="银行名称"
                        cascade={false}
                        value={this.state.bank}
                        onChange={v => this.setState({ bank: v })}
                        onOk={v => this.setState({ bank: v })}
                        cols={1} />
                    <InputItems type="bankCard" label="银行卡" placeholder="请输入银行卡" maxLength="19" /> */}
                </List>
                <div className="wrap">
                    <Button onClick={() => {
                        _stat("身份信息下一步被点击", "loan-wf2v1")
                        if (this.state.isupfront == true && this.state.isupback == true) {
                            _HTTP.post("LoansDispatch/saveIdentity", Qs.stringify({
                                name: this.state.name,
                                id_card: this.state.cardid
                            })).then(response => {
                                if (response.data.code == 0) {
                                    this.props.history.push('./workflowstep3')
                                } else {
                                    AtdToast.fail(response.data.message)
                                }
                            })
                        } else {
                            AtdToast.fail("身份证未上传")
                        }
                    }} />
                </div>
            </div>
        )
    }
}