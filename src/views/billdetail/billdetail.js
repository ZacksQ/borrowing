import React, { Component } from 'react';
import 'normalize.css'
import './billdetail.scss'
import { Check, Button } from '../../comps';

export default class BillDetail extends Component {
    state = {
        data: [
            { id: 1, a: 10000.00, b: 2000.00, c: 20.00, d: 30.00, checked: false },
            { id: 2, a: 20000.00, b: 1000.00, c: 10.00, d: 20.00, checked: true },
            { id: 3, a: 30000.00, b: 3000.00, c: 30.00, d: 10.00, checked: false },
        ]
    }
    render() {
        return (<div className="billdetail">
            <div className="wrap order-tit">
                <div>
                    订单号：1234567890
                </div>
                <div>2018/11/11</div>
            </div>
            <div className="billdtail">
                <div>
                    <div className="label">应还总金额</div>
                    <div className="amount">10000.00</div>
                </div>
                <div>
                    <div className="label">已还金额</div>
                    <div className="amount">2000.00</div>
                </div>
                <div>
                    <div className="label">待还金额</div>
                    <div className="amount">8000.00</div>
                </div>
            </div>

            <div className="wrap allbill-wrap">
                <div className="tit">
                    <div>各期账单</div>
                    <div className="txt-primary" onClick={() => {
                        let selectall = this.state.data.map((item) => ({ ...item, checked: true }))
                        this.setState({
                            data: selectall
                        })
                    }}>全选</div>
                </div>
            </div>
            <div className="bill-list">
                {this.state.data.map((item, index) => (
                    <div className="bill-item" key={index}>
                        <div onClick={() => {
                            this.state.data[index].checked = !this.state.data[index].checked
                            this.setState({
                                data: this.state.data
                            })
                        }} >
                            <Check checked={item.checked} />
                        </div>
                        <div className="current-period">
                            <div className="amount">{item.a}</div>
                            <div className="label">本期还款</div>
                        </div>
                        <div>
                            <div className="amount">{item.b}</div>
                            <div className="label">本金</div>
                        </div>
                        <div>
                            <div className="amount">{item.c}</div>
                            <div className="label">服务费</div>
                        </div>
                        <div>
                            <div className="amount">{item.d}</div>
                            <div className="label">滞纳金</div>
                        </div>
                        <div className="status">
                            <div>03月03日</div>
                            <div>待还款</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="wrap">
                <Button txt="立即还款" onClick={() => {
                    let checkedid = []
                    this.state.data.forEach((item) => {
                        if( item.checked == true){
                            checkedid.push(item.id)
                        }
                    })
                    console.log(checkedid)
                }} />
            </div>
        </div>)
    }
}