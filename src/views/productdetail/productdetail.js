import React, { Component } from 'react';
import 'normalize.css'
import './productdetail.scss'

export default class ProductDetail extends Component {
    render() {
        return (<div className="productdetail">
            <div className="detail-info">
                <div className="tit">提交申请后多久到账</div>
                <div className="content">
                    <p>风控审核时间平均15分钟</p>
                    <p>财务打款时间平均10分钟</p>
                </div>
            </div>
            <div className="detail-info">
                <div className="tit">还款说明</div>
                <div className="content">
                <p>还款方式：</p>
                <p>1、还款当日08:00或18:00从绑定的银行卡中自动扣除。</p>
                <p>2、主动还款</p>
                <p>提前还款：</p>
                <p>不支持or支持（利息不减免）</p>
                </div>
            </div>
            <div className="detail-info">
                <div className="tit">放款之后可以再借吗</div>
                <div className="content">
                    <p>额度范围内可发起多笔借款</p>
                </div>
            </div>
        </div>)
    }
}