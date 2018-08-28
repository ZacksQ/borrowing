import React, { Component } from 'react';
import 'normalize.css'
import './bindcard.scss'
import { PickerItem, Button, List, MessageBox, AtdToast, CountDown, InputItems, Icon, LoadingComponent } from '../../comps/index'
import { _HTTP, _setTitle, _stat } from '../../helper/helper'
import Qs from 'qs'

export default class BindCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banklist: [],
            startcountdow: false
            , cardata: {
                user_name: "",
                card_no: "",
                card_type: "",
                user_phone: "",
                user_idcard: ""
                , card_name: ""
            }
            , sucesscountdown: false
            , btnstatus: true
            , showloading: false
        }
        this.platform_id = props.match.params.platform_id
        this.http = _HTTP.get('LoansDispatch/getBankCardInfo?platform_id=' + this.platform_id)
    }


    componentDidMount() {
        _setTitle("绑定银行卡")
        this.http.then(response => {
            if (response.data.code == 0) {
                const data = response.data.data
                data.user_card_info.user_idcard = data.user_card_info.id_card
                this.setState({
                    banklist: data.bank_list
                    , cardata: data.user_card_info
                })
            }
        })
    }

    render() {
        const { user_name, card_no, card_type, user_phone, user_idcard } = this.state.cardata
        return (<div className="fullcard">
            <List style={{ backgroundColor: 'white' }} className="picker-list">
                <InputItems label="真实姓名" value={user_name} onChange={(value) => {
                    this.setState({
                        cardata: {
                            ...this.state.cardata, user_name: value
                        }
                    })
                }} />
                <InputItems label="身份证号" maxLength="18" value={user_idcard} onChange={(value) => {
                    this.setState({
                        cardata: {
                            ...this.state.cardata, user_idcard: value
                        }
                    })
                }} />
                <InputItems label="手机号" maxLength="11" value={user_phone} onChange={(value) => {
                    this.setState({
                        cardata: {
                            ...this.state.cardata, user_phone: value
                        }
                    })
                }} />
                <PickerItem data={this.state.banklist}
                    title="银行名称"
                    value={this.state.cardata.card_type != "" ? [this.state.cardata.card_type] : [card_type]}
                    onOk={v => {
                        this.setState({
                            cardata: {
                                ...this.state.cardata, card_type: v[0]
                            }
                        })
                    }}
                    cols={1} />
                <InputItems
                    // type="bankCard" 
                    label="银行卡" placeholder="请输入银行卡" maxLength="19" value={card_no} onChange={(value) => {
                        this.setState({
                            cardata: {
                                ...this.state.cardata, card_no: value
                            }
                        })
                    }} />
            </List>
            <div className="tip">
                请核对相关信息，否则将导致贷款失败。
            </div>
            <div className="wrap">
                <Button txt="确认无误"
                    className={this.state.btnstatus == false ? "loading" : ""}
                    onClick={() => {
                        _stat("绑定银行卡确认无误按钮被点击", "loan-bindcardv1")
                        let postdata = this.state.cardata;
                        if (postdata.user_name == "") {
                            AtdToast.fail("真实姓名不能为空")
                            return false
                        }
                        if (postdata.user_idcard == "") {
                            AtdToast.fail("身份证号不能为空")
                            return false
                        }
                        if (postdata.card_no == "") {
                            AtdToast.fail("银行卡不能为空")
                            return false
                        }
                        if (postdata.user_phone == "") {
                            AtdToast.fail("手机号不能为空")
                            return false
                        }
                        if (postdata.card_type == "") {
                            AtdToast.fail("银行未选择")
                            return false
                        }
                        postdata.platform_id = this.platform_id
                        this.state.banklist.forEach(item => {
                            if (item.value == postdata.card_type) {
                                postdata.card_name = item.label
                            }
                        })
                        // console.log(postdata)
                        // return false
                        this.setState({
                            btnstatus: false
                        })
                        _HTTP.post('LoansDispatch/sendVerifyCode', Qs.stringify(postdata))
                            .then(response => {
                                if (response.data.code == 0) {
                                    this.cd.showMessageBox();
                                    this.setState({
                                        startcountdow: true
                                    })
                                } else {
                                    AtdToast.fail(response.data.message)
                                    // this.cd.showMessageBox();
                                }
                                this.setState({
                                    btnstatus: true
                                })
                            })


                    }} ><span style={this.state.btnstatus == false ? { "display": "flex" } : { "display": "none" }}><Icon type="loading" /></span></Button>
            </div>
            {this.state.showloading == true ? (<LoadingComponent istransparent={true} />) : (null)}
            <MessageBox ref={cd => this.cd = cd}>
                <div className="sendcode bindstatus">
                    <h4>请输入验证码</h4>
                    <div className="dialog-content ">
                        <input type="tel" ref="code" maxLength="6" />
                        <div className="countdown"><CountDown value="60" ref="countdown" type="sendcode" resend={
                            () => {
                                _stat("确认验证码弹框重新发送按钮被点击", "loan-bindcardv1")
                                console.log(this.refs.countdown.getvalue())
                                if (this.refs.countdown.getvalue() == 0) {
                                    this.setState({
                                        showloading: true
                                    })
                                    let postdata = this.state.cardata;
                                    postdata.platform_id = this.platform_id
                                    this.state.banklist.forEach(item => {
                                        if (item.value == postdata.card_type) {
                                            postdata.card_name = item.label
                                        }
                                    })
                                    _HTTP.post('LoansDispatch/sendVerifyCode', Qs.stringify(postdata))
                                        .then(response => {
                                            this.setState({
                                                showloading: false
                                            })
                                            if (response.data.code == 0) {
                                                this.refs.countdown.startimer()
                                            } else {
                                                AtdToast.fail(response.data.message)
                                            }
                                        })
                                }
                            }
                        } start={this.state.startcountdow} unit="s" /></div>
                    </div>
                    <div>
                        <Button className="btn-reserve" txt="取消" onClick={() => {
                            _stat("确认验证码弹框取消按钮被点击", "loan-bindcardv1")
                            this.refs.code.value = ""
                            this.cd.closeMessageBox()
                        }} />
                        <Button txt="确认" onClick={() => {
                            _stat("确认验证码弹框确认按钮被点击", "loan-bindcardv1")
                            let postdata = this.state.cardata;
                            postdata.code = this.refs.code.value
                            postdata.platform_id = this.platform_id
                            if (postdata.code == "") {
                                AtdToast.fail("验证码不能为空");
                                return false
                            }
                            _HTTP.post('LoansDispatch/verifyCode', Qs.stringify(postdata))
                                .then(response => {
                                    if (response.data.code == 0) {
                                        this.cd.closeMessageBox()
                                        this.sd.showMessageBox()
                                        this.setState({
                                            sucesscountdown: true
                                        })
                                    } else {
                                        this.cd.closeMessageBox()
                                        this.fd.showMessageBox()
                                        // AtdToast.fail(response.data.message)
                                    }
                                    this.refs.code.value = ""
                                })
                        }} />
                    </div>
                </div>
            </MessageBox>
            <MessageBox ref={sd => this.sd = sd}>
                <div className="bindstatus">
                    <h4>绑卡成功</h4>
                    <div className="dialog-content ">
                        <Icon type="bkcg success-icon" />
                        <div className="tip">绑卡成功（ <CountDown value="3" start={this.state.sucesscountdown} unit="s" handleCountDown={() => {
                            // this.cd.closeMessageBox()
                            this.props.history.push('../binddata/' + this.platform_id)
                        }} /> ）</div>
                    </div>
                </div>
            </MessageBox>
            <MessageBox ref={fd => this.fd = fd}>
                <div className="bindstatus">

                    <div className="dialog-content ">
                        <Icon type="fail success-icon" />
                        <div className="status">
                            认证失败
                        </div>
                    </div>
                </div>
            </MessageBox>
        </div>)
    }
}