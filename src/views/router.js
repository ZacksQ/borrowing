import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import initReactFastclick from 'react-fastclick';
import Loadable from 'react-loadable';
import { LoadingComponent } from '../comps/index'

const rem = (event) => {
  let deviceWidth = window.innerWidth
  let devicePixelRatio = window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio
  let calc = 7.5
  if (deviceWidth > 768) deviceWidth = 768
  if (deviceWidth < 320) deviceWidth = 320
  if (deviceWidth < 320 && devicePixelRatio >= 2) calc = calc - (devicePixelRatio - 1)
  let fontSize = Math.ceil(deviceWidth / calc)
  if (fontSize % 2 === 1) {
    fontSize--
  }
  document.documentElement.style.fontSize = fontSize + 'px'// 计算设计稿和实际像素的缩放比。向上取整1px = 0.01rem
}

// import 'normalize.css'

class App extends Component {
  componentWillMount() {
    initReactFastclick();
    rem()
    window.addEventListener('resize', rem)
  }
  render() {
    return (
      <Switch>
        <Route exact path="/demo" component={Loadable({ loader: () => import("./demo/index"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/" component={Loadable({ loader: () => import("./home/index"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/index" component={Loadable({ loader: () => import("./home/index"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/workflowstep1" component={Loadable({ loader: () => import("./workflow/workflowstep1"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/workflowstep2" component={Loadable({ loader: () => import("./workflow/workflowstep2"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/workflowstep3" component={Loadable({ loader: () => import("./workflow/workflowstep3"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/workflowstep4" component={Loadable({ loader: () => import("./workflow/workflowstep4"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/workflowstep6" component={Loadable({ loader: () => import("./workflow/workflowstep6"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/application" component={Loadable({ loader: () => import("./application/application"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/binddata/:platform_id" component={Loadable({ loader: () => import("./binddata/binddata"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/productdetail" component={Loadable({ loader: () => import("./productdetail/productdetail"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/borrowing" component={Loadable({ loader: () => import("./borrowing/borrowing"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/billdetail" component={Loadable({ loader: () => import("./billdetail/billdetail"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/fulldata" component={Loadable({ loader: () => import("./fulldata/fulldata"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/addata/:platform_id" component={Loadable({ loader: () => import("./fulldata/addata"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/bindcard/:platform_id" component={Loadable({ loader: () => import("./bindcard/bindcard"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/completedata" component={Loadable({ loader: () => import("./fulldata/completedata"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/serviceprotocol" component={Loadable({ loader: () => import("./protocol/serviceprotocol"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
        <Route exact path="/privateprotocol" component={Loadable({ loader: () => import("./protocol/privateprotocol"), loading() { return <LoadingComponent /> }, timeout: 10000 })} />
      </Switch>
    )
  }
}

export default withRouter(App);
