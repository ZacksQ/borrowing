import React, { PureComponent } from 'react';

import {Icon,Button,Toast,Dialog} from 'comps/index'

import './index.scss'

export default class Demo extends PureComponent {
  


  render() {

    return (
      <div className="demo">
        <h1>Icon</h1>
        <div className="icon bd">
            <lable>Loding<Icon type="loading"/></lable>  
            <lable>success<Icon type="success"/></lable>  
            <lable>fail<Icon type="fail"/></lable>  
            <lable>info<Icon type="info"/></lable>  
            <lable>info2<Icon type="info2"/></lable>  
            <lable>name<Icon type="name"/></lable>  
            <lable>cheack<Icon type="cheack"/></lable>  
            <lable>cheacked<Icon type="cheacked"/></lable>  
            <lable>qes<Icon type="qes"/></lable>
            <lable>sfzzm<Icon type="sfzzm"/></lable>
            <lable>sfzfm<Icon type="sfzfm"/></lable>
            <lable>jxz<Icon type="jxz"/></lable>
            <lable>wjx<Icon type="wjx"/></lable>
            <lable>ywc<Icon type="ywc"/></lable>            
            <lable>tsz<Icon type="tsz"/></lable>
            <lable>tsz1<Icon type="tsz1"/></lable>
            <lable>xxts<Icon type="xxts"/></lable>
            <lable>jgts<Icon type="jgts"/></lable>
            <lable>txl<Icon type="txl"/></lable>
            <lable>bkcg<Icon type="bkcg"/></lable>
            <lable>bksb<Icon type="bksb"/></lable>
            <lable>khcg<Icon type="khcg"/></lable>
            <lable>khsb<Icon type="khsb"/></lable>
            <lable>xz<Icon type="xz"/></lable>
            <lable>wxz<Icon type="wxz"/></lable>
            <lable>shwtg<Icon type="shwtg"/></lable>
            <lable>lb<Icon type="lb"/></lable>
            <lable>dexx<Icon type="dexx"/></lable>
            <lable>xyk<Icon type="xyk"/></lable>
            <lable>hsjt<Icon type="hsjt"/></lable>
            <lable>lsjt<Icon type="lsjt"/></lable>
            <lable>qb<Icon type="qb"/></lable>
        </div>
        <h1>Button</h1>
        <div className="button bd">
            <lable>默认样式 <Button /></lable>
            <lable>禁用样式 <Button className="off"/></lable>
            <lable>自定义文本 <Button txt="我是自定义文本"/></lable>
            <lable>自定义图标+文本 <Button className="loading"><Icon type="loading" />请等待</Button></lable>
        </div>
        <h1>Toast</h1>
        <div className="toast bd">
            <lable>默认样式 <Button onClick={e=>{this.toast.hello()}}/></lable>
            <lable> <Toast txt="快速展示信息" ref={ele=>this.toast=ele}/></lable> ref
        </div>
        <h1>Dialog</h1>
        <div className="dialog bd">
            <lable> 
              {/* <Dialog/>  */}
              </lable>
        </div>
      </div>
    )
  }
};
