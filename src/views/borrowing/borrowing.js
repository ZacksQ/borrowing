import React, { Component } from 'react';
import { TabPannel, Button, LoadingComponent } from '../../comps/index'
import 'normalize.css'
import './borrowing.scss'
import { _HTTP, _setTitle, _stat } from '../../helper/helper'

let tabTit = [
    '待还款',
    '还款历史'
]

export default class Borrowing extends Component {
    constructor() {
        super()
        this.state = {
            repayhistory: []
            , repayinglist: []
            , tab1finished: false
            , tab2finished: false
            , tiptxt: ""
        }
        this.repaying = _HTTP.get("LoansRepayment/alllist?type=0")
        this.gethistory = _HTTP.get("LoansRepayment/alllist?type=1")
    }

    componentDidMount() {
        _setTitle("去还款")
        this.repaying.then(response => {
            if (response.data.code == 0) {
                this.setState({
                    repayinglist: response.data.data.list,
                    tiptxt: response.data.data.notice_msg
                })
            }
            this.setState({
                tab1finished: true
            })
        })

        this.gethistory.then(response => {
            if (response.data.code == 0) {
                this.setState({
                    repayhistory: response.data.data.list
                })
            }
            this.setState({
                tab2finished: true
            })
        })
    }
    render() {
        return (<div className="borrowing">
            {this.state.tab1finished == false || this.state.tab2finished == false ? (<LoadingComponent istransparent={true} />) : (null)}
            <TabPannel tabtit={tabTit}>
                <div>
                    <div className="tip">
                        {this.state.tiptxt}
                    </div>
                    {
                        this.state.repayinglist
                            .map((item, index) => (
                                <div className="waitingrepayment-item" key={index}>
                                    <img src={item.logo} className="logo" alt="" />
                                    <div className="name">{item.name}</div>
                                    <div className="status-txt">您有未还清的账单</div>
                                    <Button className={"btn-small " + (item.url != "" ? "" : "disable")} txt="去还款" onClick={() => {
                                        // this.props.history.push('./billdetail')
                                        _stat("去还款按钮被点击", "loan-borrowingv1")
                                        if (item.url != "") {
                                            window.location.href = item.url
                                        }
                                    }} />
                                </div>
                            ))}
                </div>
                <div className="repayment-history">
                    {this.state.repayhistory.length == 0 ? <div className="tip">暂无还款历史数据</div> : this.state.repayhistory.map((item, index) => (
                        <div className="item" key={index}>
                            <div></div>
                            <div>
                                <div className="detail">{item.name}
                                    已还款
                                {/* 还款 888.00 元 */}
                                </div>
                                <div className="date">
                                    {item.repaydate}</div>
                            </div>
                        </div>
                    ))}

                </div>
            </TabPannel>
        </div>)
    }
}