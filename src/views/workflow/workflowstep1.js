import React, { Component } from 'react';
import { Icon, PickerItem, Button, Step, AtdToast } from '../../comps/index'
import { _HTTP, _setTitle, _stat } from '../../helper/helper'
import Qs from 'qs'
import './workflow.scss'

const httpdata = _HTTP.get("LoansDispatch/saveBaseInfo")
let linesway =
    [{
        value: 'DEC',
        label: "装修",
    }, {
        value: 'EDU',
        label: "教育",
    }, {
        value: 'JYDQ',
        label: "家用电器",
    }, {
        value: 'MAR',
        label: "婚庆",
    }, {
        value: 'SJSM',
        label: "手机数码",
    }, {
        value: 'TRA',
        label: "旅游",
    }, {
        value: 'JJJJ',
        label: "家具家居",
    }, {
        value: 'RENT',
        label: "租房",
    }, {
        value: 'JKYL',
        label: "健康医疗",
    }, {
        value: 'OTH',
        label: "其他",
    }]


let limitdays = [
    [{
        value: 3,
        label: '3个月',
    }, {
        value: 4,
        label: '4个月',
    }, {
        value: 5,
        label: '5个月',
    }, {
        value: 6,
        label: '6个月',
    }, {
        value: 7,
        label: '7个月',
    }, {
        value: 8,
        label: '8个月',
    }, {
        value: 9,
        label: '9个月',
    }, {
        value: 10,
        label: '10个月',
    }, {
        value: 11,
        label: '11个月',
    }, {
        value: 12,
        label: '12个月',
    }]
];

let amount = [[]];
for (let dis = 1000; dis <= 50000; dis += 100) {
    amount[0].push({ value: dis, label: dis + "元" });
}
export default class WorkFlowStep1 extends Component {
    state = {
        linesway: [],
        limitdays: [3],
        amount: [10000]
    };

    componentDidMount() {
        _setTitle("借款信息选择")
        document.querySelectorAll(".ctrl-icon")[0].addEventListener("click",()=>{
            document.querySelectorAll(".am-list-extra")[0].click()
        })
        document.querySelectorAll(".ctrl-icon")[1].addEventListener("click",()=>{
            document.querySelectorAll(".am-list-extra")[1].click()
        })
        httpdata.then(response => {
            if (response.data.code == 0) {
                const data = response.data.data
                if (data.loan_user) {
                    this.setState({
                        linesway: [data.loan_user]
                    })
                }
            }
        })
    }

    render() {
        return (
            <div className="workflow">
                <Step step={1} />
                <div className="condition-pannel">
                    <div className="amount">
                        <div className="label">借款金额</div>
                        <div className="label">1000~50000元</div>
                        <div className="select heavy">
                            {/* 100000元 <Icon type="tsz" /> */}
                            <PickerItem
                                data={amount}
                                title=""
                                cascade={false}
                                value={this.state.amount}
                                ref="pi"
                                onOk={v => this.setState({ amount: v })}
                                cols={1} /> <Icon type="tsz ctrl-icon" ref="tsz" />
                        </div>
                    </div>
                    <div className="limit-days">
                        <div className="label">期限</div>
                        <div className="label">3~12月</div>
                        <div className="select heavy">
                            <PickerItem
                                data={limitdays}
                                title=""
                                cascade={false}
                                value={this.state.limitdays}
                                onOk={v => this.setState({ limitdays: v })}
                                cols={1} /> <Icon type="tsz ctrl-icon" />
                        </div>
                    </div>
                </div>
                <div className="tip">
                    实际金额、期限、费率等以审批结果为准</div>
                <PickerItem
                    data={linesway}
                    title="借款用途"
                    value={this.state.linesway}
                    cols={1}
                    onOk={v => {
                        console.log(v)
                        this.setState({ linesway: v })
                    }}
                />
                <div className="wrap">
                    <Button onClick={() => {
                        _stat("借款信息下一步被点击","loan-wf1v1")
                        if (!this.state.linesway[0]) {
                            AtdToast.fail("未选择借款用途")
                            return false
                        }
                        const data = { expect_money: this.state.amount[0], expect_month_number: this.state.limitdays[0], loan_use: this.state.linesway[0] }
                        _HTTP.post("LoansDispatch/saveBaseInfo", Qs.stringify(data)).then((response) => {
                            if (response.data.code == 0) {
                                this.props.history.push("./workflowstep2")
                            } else {
                                alert(response.data.message)
                            }
                        })
                    }} />
                </div>
            </div>
        )
    }
}