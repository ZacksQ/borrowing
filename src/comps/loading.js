import React, { Component } from 'react'
import './index.scss'

export const LoadingComponent = (props) => {
    // const {istransparent} = props
    return (
        <div className="loadingComponent"
        // style={istransparent==true?{}:{"backgroundColor":"#3fb1fc"}}
        >
            <div className="loading-icon"></div>
        </div>
    )
};