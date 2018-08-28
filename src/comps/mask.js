import React, { Component } from 'react'
import './index.scss'

export const Mask =(props) => (
    <div className="mask" onClick={props.closeMessageBox}></div>
);