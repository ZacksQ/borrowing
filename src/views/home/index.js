import React, { Component } from 'react';
import './index.scss'
import { Icon } from '../../comps/index'
import { _HTTP, _Applogin, _isLogin, _setTitle, _stat } from '../../helper/helper'


let notice = null
const nwtheight = 0.32;
export default class Page extends Component {
  constructor() {
    super();
    this.state = {
      noticelist: [],
      linesNav: [
      ],
      step: 1
      , total_amounts: 0
      , type: 0
    }
    this.mc = _HTTP.get('LoansPlatform/moduleConfig');
  }

  componentDidMount() {
    _setTitle("借款")
    this.mc.then((response) => {
      if (response.data.code == 0) {
        const data = response.data.data
        this.setState({
          noticelist: data.msglist,
          linesNav: data.list,
          type: data.type,
          step: data.step
          , total_amounts: data.total_amounts
        })
        localStorage.setItem("platform_id", data.platform_id)
      }
    })

    notice = setInterval(() => {
      let nwt = this.nw.style.top ? parseFloat(this.nw.style.top) : 0
      if (-nwt == nwtheight * (this.state.noticelist.length - 1)) {
        this.nw.style.transitionDuration = "0ms"
        this.nw.style.top = 0
      } else {
        this.nw.style.top = nwt - nwtheight + 'rem'
        this.nw.style.transitionDuration = "1000ms"
      }
    }, 4000)
  }
  componentWillUnmount() {
    clearInterval(notice)
  }
  render() {
    return (
      <div className="index">
        <header className="wrap">
          <div className="header-tit">
            车轮预授信额度</div>
          <div className="lines">
            <span>{this.state.total_amounts}</span>元
              </div>
          {this.state.type == 0 ? (<div className="btn btn-header" onClick={() => {
            if (!_isLogin()) {
              _Applogin();
              return false
            }
            if (this.state.step == 5) {
              this.props.history.push('./application')
            } else {

              if (this.state.step == 6) {
                this.state.step = 4
              }
              _stat("立即申请被点击","loan-indexv1")
              this.props.history.push('./workflowstep' + (parseInt(this.state.step)))
            }
          }}>
            立即申请</div>) : (<div className="amount-opera">
              <div onClick={() => {
                if (!_isLogin()) {
                  _Applogin();
                  return false
                }
                _stat("去还款被点击","loan-indexv1")
                this.props.history.push('./borrowing')
              }}>去还款</div>
              <div onClick={() => {
                if (!_isLogin()) {
                  _Applogin();
                  return false
                }
                _stat("去提现被点击","loan-indexv1")
                this.props.history.push('./application')
              }}>去提现</div>
            </div>)}
        </header>
        <div className="container">
          <div className="notices wrap">
            <Icon type="lb" />
            <div className="notices-list-wrap">
              <div className="nb" ref={nw => this.nw = nw}>
                {this.state.noticelist.map((item, index) => (
                  <div className="notices-list" key={index}>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="lines-nav wrap">
            {this.state.linesNav.map((item, index) => (<div className="item" key={index} onClick={() => {
              _stat("大额/热门信用卡被点击","loan-indexv1")
              this.props.history.push(item.link)
            }}>
              <div className="icon-wrap">
                <img src={item.img} alt="" />
              </div>
              <div className="lines-info">
                <div className="lines-range">
                  {item.title}
                </div>
                <div className="info">
                  {item.desc}</div>
              </div>
            </div>))}
          </div>
          <div className="recommend-area wrap">

          </div>
        </div>
      </div>
    )
  }
};
