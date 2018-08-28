import React, { Component } from 'react';
import { PickerItem, Button, InfoItem, List, Icon, MessageBox, AtdToast, CountDown, LoadingComponent } from '../../comps/index'
import { _HTTP, _setTitle, _stat } from '../../helper/helper'
import './binddata.scss'
import Qs from 'qs'

export default class BindData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            limitdays: [], //选择器期限值
            amount: [], //选择器金额值
            agreementstatue: false,
            data: {
                platform_info: {
                    platform_allow_loan: []
                    , protocal_name: '协议'
                },
                user_auth_info: {
                    bind_card: 0
                },
                user_card_info: {

                }
            }
            , detail: {} //试算dialog内数据
            , loan_money: 0
            , loan_period: 0
            , periodlist: [] //期限列表
            // , isbindcatd: 0  //是否绑定银行卡
            , repay_amonut: 0.00 //总还款金额
            , total_interest: 0.00 //综合费用
            // , fee_label: '' //综合费用一行字
            , startcountdow: false
            , btnstatus: true
            , order_id: ""
            , successtatus: false
            , confirmstatus: true
            , protocolist: []
            , http1finished: false
            , http2finished: false
            , http3finished: false
            , error: false
            , showloading: false
            , loan_month_info: []
            , periodlistindex: 0
        };
        this.platform_id = props.match.params.platform_id
        this.http = _HTTP.get('LoansDispatch/platformDetail?platform_id=' + this.platform_id)
    }

    componentDidMount() {
        _setTitle("贷款申请")
        //贷款页面公共信息
        this.http.then(response => {
            if (response.data.code == 0) {
                const data = response.data.data
                this.setState({
                    data: data
                    , amount: [
                        data.platform_info.platform_allow_loan[0].value
                    ]
                    , http1finished: true
                    // , isbindcatd: response.data.data.user_auth_info.bind_card
                }, () => {
                    this.geterm()
                })
            } else if (response.data.code == 1043) {
                this.nomoney.showMessageBox()
                this.setState({
                    error: true
                })
            } else {
                this.setState({
                    error: true
                })
            }
        })

        document.querySelectorAll(".ctrl-icon")[0].addEventListener("click", () => {
            document.querySelectorAll(".am-list-extra")[0].click()
        })
        document.querySelectorAll(".ctrl-icon")[1].addEventListener("click", () => {
            document.querySelectorAll(".am-list-extra")[1].click()
        })
    }

    geterm() {
        _HTTP.get("LoansDispatch/loanInfo?platform_id=" + this.platform_id + "&loan_money=" + this.state.amount)
            .then(response => {
                if (response.data.code == 0) {
                    const data = response.data.data
                    this.setState({
                        periodlist: data.selectable_loan_month,
                        limitdays: [
                            data.selectable_loan_month[0].value
                        ],
                        loan_month_info: data.loan_month_info,
                        repay_amonut: data.loan_month_info[this.state.periodlistindex].repay_amonut,
                        total_interest: data.loan_month_info[this.state.periodlistindex].total_interest
                        , http2finished: true
                    }, () => {
                        // console.log(this.state.amount, this.state.limitdays)
                        this.getdetail()
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }

            })
    }

    getdetail() {
        _HTTP.get("LoansDispatch/getProtocals?platform_id=" + this.platform_id + "&loan_money=" + this.state.amount + "&loan_period=" + this.state.limitdays)
            .then(response => {
                if (response.data.code == 0) {
                    this.setState({
                        protocolist: response.data.data
                    })
                }
            })
        _HTTP.get("LoansDispatch/repaymentSituation?platform_id=" + this.platform_id + "&loan_money=" + this.state.amount + "&loan_period=" + this.state.limitdays)
            .then(response => {
                if (response.data.code == 0) {
                    this.setState({
                        detail: response.data.data[0]
                        , http3finished: true
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
    }

    render() {
        let { periodDetails, repay_amonut, loan_amount, total_interest, service_fee } = this.state.detail
        let { user_name, id_card, bank_name, bank_card } = this.state.data.user_card_info
        let { fee_label, product_url } = this.state.data.platform_info
        periodDetails = periodDetails ? periodDetails : []
        // const platform_id = this.props.match.params.platform_id
        return (
            <div className="binddata">
                {this.state.error == true ? (null) : (this.state.http1finished == false || this.state.http2finished == false || this.state.http3finished == false) ? (<LoadingComponent istransparent={true} />) : (null)}
                {this.state.showloading == true ? (<LoadingComponent istransparent={true} />) : (null)}
                <header>
                    <div className="condition-pannel">
                        <div>
                            <div className="amount">
                                <div className="label">借款金额</div>
                                <div className="select heavy">
                                    {/* 100000元 <Icon type="tsz" /> */}
                                    <PickerItem
                                        data={this.state.data.platform_info.platform_allow_loan}
                                        title=""
                                        value={this.state.amount}
                                        onOk={v => {
                                            this.setState({ amount: v }, () => {
                                                this.geterm()
                                            })
                                        }}
                                        cols={1} /> <Icon type="tsz ctrl-icon" />
                                </div>
                            </div>
                            <div className="limit-days">
                                <div className="label">期限</div>
                                <div className="select heavy">
                                    <PickerItem
                                        data={this.state.periodlist}
                                        title=""
                                        value={this.state.limitdays}
                                        onOk={v => {
                                            let index = 0
                                            for (let i in this.state.periodlist) {
                                                if (this.state.periodlist[i].value == v[0]) {
                                                    this.setState({
                                                        periodlistindex: index,
                                                        repay_amonut: this.state.loan_month_info[index].repay_amonut,
                                                        total_interest: this.state.loan_month_info[index].total_interest
                                                    })
                                                    // console.log(index)
                                                }
                                                index++;
                                            }

                                            this.setState({ limitdays: v }, () => {
                                                this.getdetail()
                                            })

                                        }}
                                        cols={1} /> <Icon type="tsz ctrl-icon" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    还款金额
                            </div>
                                <div>
                                    {this.state.repay_amonut}元
                            </div>
                            </div>
                            <div>
                                <div>
                                    综合费用
                                <Icon type="xxts notice-icon" onClick={() => {
                                        _stat("显示综合费用被点击", "loan-binddatav1")
                                        this.notice.showMessageBox()
                                    }} />
                                </div>
                                <div>
                                    {this.state.total_interest}元
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="more-detail">
                        <div onClick={() => {
                            // this.props.history.push('./productdetail')
                            _stat("产品详情按钮被点击", "loan-binddatav1")
                            window.location.href = product_url
                        }}>
                            产品详情
                            <Icon type="lsjt" />
                        </div>
                        <div onClick={() => {
                            _stat("显示还款详情被点击", "loan-binddatav1")
                            this.ad.showMessageBox()
                        }}>
                            还款详情
                            <Icon type="lsjt" />
                        </div>
                    </div>
                </header>
                <div className="addinfo-wrap">
                    <List style={{ backgroundColor: 'white' }} className="picker-list">
                        {this.state.data.user_auth_info.bind_card == 0 ? (<InfoItem label="收款银行卡" path="" type={0} onClick={() => {
                            _stat("去绑定收款银行卡按钮被点击", "loan-binddatav1")
                            this.props.history.push('../bindcard/' + this.platform_id)
                        }} />) : (<InfoItem label="收款银行卡" path="" type={3} onClick={() => {
                            _stat("显示收款银行卡被点击", "loan-binddatav1")
                            this.msb.showMessageBox()
                        }} />)}
                        <InfoItem label="基本信息" path="" type={1} />
                        <InfoItem label="运营商" path="" type={1} />
                        <InfoItem label="其他信息" path="" type={1} />
                    </List>
                    <div className="wrap agreement">
                        <div className="check-wrap" onClick={() => {
                            this.setState({
                                agreementstatue: !this.state.agreementstatue
                            })
                        }}><Icon type={!this.state.agreementstatue ? "cheack" : "cheacked"} /></div>我已阅读并同意 <span className="txt-primary" onClick={() => {
                            _stat("协议按钮被点击", "loan-binddatav1")
                            this.ag.showMessageBox()
                        }}>《{this.state.data.platform_info.protocal_name}》</span>
                    </div>
                    <div className="wrap">
                        <Button txt="立即提现"
                            className={this.state.btnstatus == false ? "loading" : ""}
                            onClick={() => {
                                _stat("立即提现按钮被点击", "loan-binddatav1")
                                if (this.state.amount.length == 0) {
                                    AtdToast.fail("借款金额未选择或无额度")
                                    return false
                                }
                                if (this.state.limitdays.length == 0) {
                                    AtdToast.fail("期限未选择")
                                    return false
                                }

                                if (this.state.btnstatus == false) {
                                    return false
                                }

                                if (this.state.agreementstatue == false) {
                                    AtdToast.fail("协议未同意")
                                    return false
                                }
                                this.setState({
                                    btnstatus: false
                                })
                                _HTTP.post("LoansDispatch/applyMoney", Qs.stringify({
                                    platform_id: this.platform_id,
                                    loan_money: this.state.amount[0],
                                    loan_period: this.state.limitdays[0]
                                }))
                                    .then(response => {
                                        if (response.data.code == 0) {
                                            if (response.data.data.order_id == null) {
                                                AtdToast.fail("借款失败，请稍后再试")
                                            } else {
                                                this.cd.showMessageBox()
                                                this.setState({
                                                    startcountdow: true
                                                    , order_id: response.data.data.order_id
                                                })
                                            }
                                        } else {
                                            AtdToast.fail(response.data.message)
                                        }
                                        this.setState({
                                            btnstatus: true
                                        })
                                    })
                                    .catch(error => {
                                        AtdToast.fail("系统超时，请重新再试")
                                        this.setState({
                                            btnstatus: true
                                        })
                                    })
                            }} ><span style={this.state.btnstatus == false ? { "display": "flex" } : { "display": "none" }}><Icon type="loading" />请等待</span></Button>
                    </div>
                </div>
                <MessageBox ref={msb => this.msb = msb}>
                    <div className="confirm beneficiary-info">
                        <h4>收款人信息</h4>
                        <div className="beneficiary">
                            <div>
                                <div className="label">姓名</div>
                                <div className="value">{user_name}</div>
                            </div>
                            <div>
                                <div className="label">身份证号</div>
                                <div className="value">{id_card}</div>
                            </div>
                            <div>
                                <div className="label">银行名称</div>
                                <div className="value">{bank_name}</div>
                            </div>
                            <div>
                                <div className="label">银行卡号</div>
                                <div className="value">{bank_card}</div>
                            </div>
                        </div>
                        <Button txt="知道了" onClick={() => {
                            _stat("收款银行卡知道了按钮被点击", "loan-binddatav1")
                            this.msb.closeMessageBox()
                        }} />
                    </div>
                </MessageBox>
                <MessageBox ref={notice => this.notice = notice}>
                    <div className="confirm amount-detail">
                        {/* <div className="beneficiary">
                            <div>
                                <div className="label">利息</div>
                                <div className="value">600元</div>
                            </div>
                            <div>
                                <div className="label">到账后扣除手续费</div>
                                <div className="value">2000元</div>
                            </div>
                            <div>
                                <div className="label">总计</div>
                                <div className="value">2600元</div>
                            </div>
                        </div>
                        <div className="tip">
                            以上为大部分用户费率说明<br />
                            具体请查看还款详情
                        </div> */}
                        <div className="tip">{fee_label}</div>
                        <Button txt="知道了" onClick={() => {
                            _stat("综合费用知道了按钮被点击", "loan-binddatav1")
                            this.notice.closeMessageBox()
                        }} />
                    </div>
                </MessageBox>
                <MessageBox maskclick={false} ref={nomoney => this.nomoney = nomoney}>
                    <div className="confirm amount-detail">
                        <div className="tip">可提现额度已用完</div>
                        <Button txt="知道了" onClick={() => {
                            _stat("可提现额度已用完知道了按钮被点击", "loan-binddatav1")
                            // this.notice.closeMessageBox()
                            this.props.history.push('../application')
                        }} />
                    </div>
                </MessageBox>
                <MessageBox ref={ad => this.ad = ad}>
                    <div className="confirm repayback-detail">
                        <div className="header">
                            <div className="total">
                                应还总额 <span>{repay_amonut}</span> 元
                            </div>
                            <div className="beneficiary">
                                <div>
                                    <div className="label">借款金额</div>
                                    <div className="value">{loan_amount} 元</div>
                                </div>
                                <div>
                                    <div className="label">利息总额</div>
                                    <div className="value">{total_interest} 元</div>
                                </div>
                                <div>
                                    <div className="label">服务费（到账时间扣除）</div>
                                    <div className="value">{service_fee} 元</div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-wrap">
                            <div className="detail">
                                {periodDetails.map((item, index) => (
                                    <div key={index}>
                                        <div>{item.period}期</div>
                                        <div>
                                            {item.repay_date}
                                        </div>
                                        <div>
                                            应还<span>{item.repay_money} 元</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button txt="知道了" onClick={() => {
                                _stat("还款详情知道了按钮被点击", "loan-binddatav1")
                                this.ad.closeMessageBox()
                            }} />
                        </div>
                    </div>
                </MessageBox>
                <MessageBox ref={ag => this.ag = ag} className="bottomlist">
                    {this.state.protocolist.length > 0 ? this.state.protocolist.map((item, index) => (
                        <div key={index} onClick={
                            () => {
                                _stat(item.protocol_name + "协议被点击", "loan-binddatav1")
                                window.location.href = item.protocol_url
                            }
                        }>{
                                item.protocol_name
                            }</div>
                    )) : (<div>暂无协议</div>)}


                    <div onClick={() => {
                        _stat("协议取消按钮被点击", "loan-binddatav1")
                        this.ag.closeMessageBox()
                    }}>取消</div>

                </MessageBox>
                <MessageBox ref={cd => this.cd = cd}>
                    <div className="sendcode bindstatus">
                        <h4>请输入验证码</h4>
                        <div className="dialog-content ">
                            <input type="tel" ref="code" maxLength="6" />
                            <div className="countdown"><CountDown value="60" ref="countdown" type="sendcode" resend={
                                () => {
                                    _stat("重新发送按钮被点击", "loan-binddatav1")
                                    if (this.refs.countdown.getvalue() == 0) {
                                        this.setState({
                                            showloading: true
                                        })
                                        _HTTP.get("LoansDispatch/applyMoney?platform_id=" + this.platform_id + "&loan_money=" + this.state.amount + "&loan_period=" + this.state.limitdays)
                                            .then(response => {
                                                this.setState({
                                                    showloading: false
                                                })
                                                if (response.data.code == 0) {
                                                    this.refs.countdown.startimer()
                                                    this.setState({
                                                        order_id: response.data.data.order_id
                                                    })
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
                                _stat("确认验证码弹窗取消按钮被点击", "loan-binddatav1")
                                this.refs.code.value = ""
                                this.cd.closeMessageBox()
                            }} />
                            <Button txt="确认" onClick={() => {
                                _stat("确认验证码弹窗确认按钮被点击", "loan-binddatav1")
                                this.setState({
                                    confirmstatus: false
                                })
                                let postdata = {};
                                postdata.code = this.refs.code.value
                                postdata.order_id = this.state.order_id
                                postdata.platform_id = this.platform_id
                                postdata.loan_money = this.state.amount[0]
                                postdata.loan_period = this.state.limitdays[0]
                                if (postdata.code == "") {
                                    AtdToast.fail("验证码不能为空");
                                    return false
                                }
                                _HTTP.post('LoansDispatch/checkCode', Qs.stringify(postdata))
                                    .then(response => {
                                        if (response.data.code == 0) {
                                            this.cd.closeMessageBox()
                                            this.sd.showMessageBox()
                                            this.setState({
                                                successtatus: true
                                            })
                                        } else {
                                            this.cd.closeMessageBox()
                                            // this.fd.showMessageBox()
                                            AtdToast.fail(response.data.message)
                                        }
                                        this.refs.code.value = ""
                                        this.setState({
                                            confirmstatus: true
                                        })
                                    })
                            }} ><span style={this.state.confirmstatus == false ? { "display": "flex" } : { "display": "none" }}><Icon type="loading" /></span></Button>
                        </div>
                    </div>
                </MessageBox>
                <MessageBox ref={sd => this.sd = sd} className="tipdialog tipdialog-middle">
                    <div className="bindstatus">
                        <h4>申请成功 <CountDown unit="S" value="3" start={this.state.successtatus} handleCountDown={() => {
                            this.props.history.push('../application')
                        }} /></h4>
                        <div className="dialog-content ">
                            <Icon type="khcg" />
                            <div className="tip">等待放款</div>
                        </div>
                    </div>
                </MessageBox>
                <MessageBox ref={fd => this.fd = fd} className="tipdialog tipdialog-middle">
                    <div className="bindstatus">
                        <h4>申请失败</h4>
                        <div className="dialog-content ">
                            <Icon type="khsb" />
                            <div className="btn btn-block btn-primary" onClick={() => {
                                _stat("申请失败弹框重新申请按钮被点击", "loan-binddatav1")
                                this.props.history.push("./application")
                            }}>重新申请</div>
                            <div className="btn btn-block btn-primary btn-reverse" onClick={() => {
                                _stat("申请失败弹框返回按钮被点击", "loan-binddatav1")
                                this.fd.closeMessageBox()
                            }}>返回</div>
                        </div>
                    </div>
                </MessageBox>
            </div>
        )
    }
}