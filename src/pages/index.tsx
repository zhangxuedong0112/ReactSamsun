import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import Layouts from "@/layouts/index"

export default class extends React.Component {
  
  render(){
    return <Layouts {...this.props}/> 
  }
}