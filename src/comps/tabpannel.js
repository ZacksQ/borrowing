import React, { Component } from 'react';
import './index.scss'


export default class TabPannel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabSlideActivedIndex: 0
        }
    }    

    changeTab(e, index) {
        if (index != this.state.tabSlideActivedIndex) {
            this.setState({
                tabSlideActivedIndex: index
            })
        }
    }

    render() {
        const tabtit = this.props.tabtit
        return (
            <div className="pannel tab-wrapper">
                <div className="tab-bar">
                    {
                        tabtit.map((t, index) => (
                            <div className={"tab-slide" + (index == this.state.tabSlideActivedIndex ? " actived" : "")} key={index} onClick={(e) => {
                                this.changeTab(e, index)
                            }}>
                                <span className="tab-slide-tit">{t}</span>

                            </div>
                        ))
                    }
                </div>
                <div>
                    {
                        this.props.children.map((item, index)=>(
<div className={"box tab-body" + (this.state.tabSlideActivedIndex == index ? " actived-body" : "")} key={index}>
                    {item}
                    </div>
                        ))
                    }
                
                </div>
            </div>
        )
    }
}