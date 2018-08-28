import React, { Component } from 'react';
import {
    Button, Icon,
    // Carouselc, 
    Carousel
    , MessageBox,
    AtdToast
    // , PullToRefresh
} from '../../comps/index'
import { _HTTP, PARAMS, _setTitle, _stat } from '../../helper/helper'
import './application.scss'

let timer = null;
let refreshtimer = null;
export default class Application extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                banner: []
                , loanamount: 0
            }
            , countdown: "00:00"
            , countdownend: false
            , faildialog: {
                message_title: ''
                , message_content: ''
            }
        }
        this.http = _HTTP.get("LoansDispatch/showPlatformInfo")

        this.filldataurl = 'http://finance-test.chelun.com/LoansPlatform/goToUrl?' //填补资料跳转地址
        for (let key in PARAMS) { //跳转地址参数拼接
            this.filldataurl += key + "=" + encodeURI(PARAMS[key]) + "&"
        }
        this.filldataurl += 'target=jumpPlatform'
    }

    componentDidMount() {
        _setTitle("借款申请")
        this.http.then(response => {
            if (response.data.code == 0) {
                this.setState({
                    data: response.data.data
                    , countdown: response.data.data.loan_time
                }, () => {
                    // if (this.state.countdown == "") {
                    if (response.data.data.loan_time == "00:00") {
                        this.setState({
                            countdownend: true
                        })
                    } else {
                        timer = setInterval(() => {
                            let time = this.state.countdown.split(":")
                            let min = parseInt(time[0])
                            let second = parseInt(time[1])
                            if (min == 0 && second == 0) {
                                clearInterval(timer)
                                this.setState({
                                    countdownend: true
                                })
                            } else {
                                second--
                                if (second < 0) {
                                    min--
                                    second = 59
                                }
                                this.setState({
                                    countdown: (min < 10 ? ('0' + min) : min) + ":" + (second < 10 ? ('0' + second) : second)
                                })
                            }
                        }, 1000)
                    }
                })
            }
        })

        refreshtimer = setInterval(() => {
            this.props.history.replace('./application')
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(timer)
        clearInterval(refreshtimer)
    }

    btnstatus(status, platform_id, credit_err_type, isother, link) {
        switch (status) {
            case 0:
                return (
                    <Button className="btn-small" txt="授信中"
                        onClick={() => {
                            _stat("授信中按钮被点击", "loan-listv1")
                            if (isother == true) {
                                window.location.href = link
                            }
                        }} />
                )
            case 1:
                return (
                    <Button className="btn-small" txt="去提现" onClick={() => {
                        _stat("去提现被点击", "loan-listv1")
                        if (isother == true) {
                            window.location.href = link
                        } else {
                            this.props.history.push("./binddata/" + platform_id)
                        }
                    }} />
                )
            case 2:
                return (
                    <Button className="btn-small btn-fail" txt="授信失败"
                        onClick={() => {
                            _stat("授信失败按钮被点击", "loan-listv1")
                            if (isother == true) {
                                window.location.href = link
                            }
                        }}
                    //授信失败
                    />
                )
            case 5:
                return (
                    <Button className="btn-small" txt="放款中"
                        onClick={() => {
                            _stat("放款中按钮被点击", "loan-listv1")
                            if (isother == true) {
                                window.location.href = link
                            }
                        }} />
                )
            case 6:
                return (
                    <Button className="btn-small" txt="再借一笔" onClick={() => {
                        _stat("再借一笔按钮被点击", "loan-listv1")
                        if (isother == true) {
                            window.location.href = link
                        } else {
                            this.props.history.push("./binddata/" + platform_id)
                        }
                    }} />
                )
            case 7:
                return (
                    <Button className="btn-small btn-fail" txt="放款失败"
                        //放款失败
                        onClick={() => {
                            _stat("放款失败按钮被点击", "loan-listv1")
                            if (isother == true) {
                                window.location.href = link
                            } else {
                                clearInterval(refreshtimer)
                                _HTTP.get('LoansDispatch/platformFail?platform_id=' + platform_id)
                                    .then(response => {
                                        if (response.data.code == 0) {
                                            this.setState({
                                                faildialog: response.data.data
                                            })
                                            this.refs.fail.showMessageBox()
                                        } else {
                                            AtdToast.fail(response.data.message)
                                        }
                                    })
                            }
                        }} />
                )
            case 8:
                return (
                    <Button className="btn-small" txt="补填资料" onClick={() => {
                        // this.props.history.push("./fulldata")
                        _stat("补填资料按钮被点击", "loan-listv1")
                        if (isother == true) {
                            window.location.href = link
                        }
                        else {
                            switch (credit_err_type) {
                                case "J":
                                    this.props.history.push("./addata/" + platform_id)
                                    break;
                                default:
                                    window.location.href = this.filldataurl + "&platform_id=" + platform_id
                                    break;
                            }
                        }
                    }} />
                )
        }
    }

    render() {
        let { cash_loan_list, other_api_platform_list, loanamount, is_new_loan } = this.state.data
        cash_loan_list = cash_loan_list ? cash_loan_list : []
        other_api_platform_list = other_api_platform_list ? other_api_platform_list : []
        return (
            <div className="application">
                <header className="wrap">
                    {this.state.data.loanamount > 0 || this.state.data.type == 2 ? (<div>{loanamount}<span>元</span></div>) : this.state.countdownend == true ? (<div>车轮贷</div>) : (
                        <div>{this.state.countdown}</div>
                    )}
                    {/* <div>{loanamount}<span>元</span></div> */}
                    {/* <div>已获批额度</div> */}
                    {this.state.data.loanamount > 0 || this.state.data.type == 2 ? (<div>已获批额度</div>) : this.state.countdownend == true ? (<div>人工审核时间较长请耐心等待</div>) : (<div>车轮急速审核中</div>)}
                    {is_new_loan == 1 ? (<div className="notice">
                        <Icon type="qb" />
                        <div className="notice-content" onClick={() => {
                            _stat("您有新的借款已到账信息被点击", "loan-listv1")
                            this.props.history.push('./borrowing')
                        }}>您有新的借款已到账</div>
                    </div>) : (null)}
                </header>
                {/* (<header className="wrap">
                    <div>{this.state.countdownend == true ? "车轮贷" : this.state.countdown}</div>
                    <div>{this.state.countdownend == true ? "人工审核时间较长请耐心等待" : "车轮急速审核中"}</div>
                </header>)} */}

                {/* <Carouselc /> */}
                {this.state.data.banner.length > 0 ? (<div className="wrap operation-area"><Carousel
                    autoplay={true}
                    infinite
                    dots={false}
                >
                    {this.state.data.banner.map((item, index) => (
                        // <a
                        //     key={index}
                        //     href={item.link}
                        //     style={{ display: 'inline-block', width: '100%' }}
                        // >
                        <img
                            src={item.image}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: '1rem' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                            }}
                            key={index}
                            onClick={() => {
                                _stat("活动位banner被点击", "loan-listv1")
                                window.location.href = item.link
                            }}
                        />
                        // </a>
                    ))}
                </Carousel></div>) : (null)}

                <div className="wrap standard-list">
                    {cash_loan_list.map((item, index) => {
                        let tags = item.tags.split(",")

                        return (
                            <div className="wrap standard-item" key={index}>
                                {item.status_1 == 2 ? (<div className="disable-mask" onClick={() => {
                                    _stat("平台维护还款按钮被点击", "loan-listv1")
                                    window.location.href = item.repay_url
                                }}>
                                    <div>平台维护，请稍后...</div>
                                    <div>我要还款 ></div>
                                </div>) : (null)}
                                <div className="item-left">
                                    <div className="item-tit">
                                        <img src={item.logo} alt="" className="logo" />
                                        <div className="name">{item.name}</div>
                                        {item.tags != "" ? tags.map((item, index) => {
                                            if (index <= 2) {
                                                return (<div className="tags" key={index}>{item}</div>
                                                )
                                            }
                                        }) : (null)}
                                    </div>
                                    <div className="item-info">
                                        <div>
                                            <div className="amount">{item.loanamount}</div>
                                            <div className="label">额度范围（元）</div>
                                        </div>
                                        <div>
                                            <div className="rate">{item.loanrate.replace("%", '')}<span>%</span></div>
                                            <div className="label">综合费率 / 日</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    {this.btnstatus(item.platform_status, item.id, item.credit_err_type)}
                                    <div className="tip">{item.credit_err_title}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="more">
                        更多借款
                    </div>
                    {other_api_platform_list.map((item, index) => {
                        let tags = item.tags.split(",")
                        return (
                            <div className="wrap standard-item" key={index}>
                                {item.status_1 == 2 ? (<div className="disable-mask" onClick={() => {
                                    _stat("平台维护还款按钮被点击", "loan-listv1")
                                    window.location.href = item.repay_url
                                }}>
                                    <div>平台维护，请稍后...</div>
                                    <div>我要还款 ></div>
                                </div>) : (null)}
                                <div className="item-left">
                                    <div className="item-tit">
                                        <img src={item.logo} alt="" className="logo" />
                                        <div className="name">{item.name}</div>
                                        {item.tags != "" ? tags.map((item, index) => {
                                            if (index <= 2) {
                                                return (<div className="tags" key={index}>{item}</div>
                                                )
                                            }
                                        }
                                        ) : (null)}
                                    </div>
                                    <div className="item-info">
                                        <div>
                                            <div className="amount">{item.loanamount}</div>
                                            <div className="label">额度范围（元）</div>
                                        </div>
                                        <div>
                                            <div className="rate">{item.loanrate.replace("%", '')}<span>%</span></div>
                                            <div className="label">综合费率 / 日</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-right">
                                    {this.btnstatus(item.platform_status, item.id, item.credit_err_type, true, item.link)}
                                    <div className="tip">{item.credit_err_title}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <MessageBox ref="fail">
                    <div className="bindstatus notpasscheck">
                        <h4>
                            {/* 最终审核未通过 */}
                            {this.state.faildialog.message_title}
                        </h4>
                        <div className="dialog-content notpasscheck">
                            <Icon type="shwtg notpassccheck-icon" />
                            <div className="tip">
                                {/* 本条借款信息将在<br />
                                <span className="heavy">下次刷新</span> 时消失 */}
                                {this.state.faildialog.message_content}
                            </div>
                            <div className="btn btn-block btn-primary" onClick={() => {
                                _stat("放款失败弹框知道了按钮被点击", "loan-listv1")
                                this.props.history.push('./application')
                            }}>知道了</div>
                        </div>
                    </div>
                </MessageBox>
            </div>
        )
    }
}