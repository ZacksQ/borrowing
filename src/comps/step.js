import React, { Component } from 'react';
import { Icon } from './index'
import './index.scss'

let steps = [//0未完成 1进行中 2已完成
    { step: '借款信息', status: 0 },
    { step: '身份信息', status: 0 },
    { step: '工作信息', status: 0 },
    { step: '运营商', status: 0 },
]
export const Step = (props) => {
    const { step } = props;
    return (<div>
        <div className="wrap flow-step-wrap">
            {steps.map((item, index) => (<div className={(item.status == 1 || step == index + 1) ? "jxz" : (step>index?"ywc":"")} key={index}>
                <Icon type={(item.status == 1 || step == index + 1) ? "jxz" : (step>index?"ywc":"wjx")} />
                <div>{(item.status == 1 || step == index + 1) ? "进行中" : (step>index?"已完成":item.step)}</div>
            </div>))}
        </div>
    </div>)
}