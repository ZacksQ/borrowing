import React, { Component } from 'react';

export default class InfoItem extends Component {
    render() {
        //type 1: 已认证 0 去绑定 2去认证 3 查看收款人信息   
        const { label, type, ...others } = this.props
        let tiptxt = "";
        switch (type) {
            case 0:
                tiptxt = '去绑定';
                break;
            case 1:
                tiptxt = "已认证";
                break;
            case 2:
                tiptxt = "去认证";
                break;
            case 3:
                tiptxt = "查看收款人信息";
                break;
        }
        return (<div {...others}><div className="am-list-item am-list-item-middle">
            <div className="am-list-line">
                <div className="am-list-content">{label}</div>
                <div className={"am-list-extra" + (type == 0 || type == 3 ? " bind" : "")}>{tiptxt}</div>
                <div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true">
                </div>
            </div>
        </div>
        </div>)
    }
}