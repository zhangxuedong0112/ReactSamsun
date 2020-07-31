import React from 'react';
import { BackTop } from 'antd';

export default class extends React.Component {
    render() {
        return (
            <div className={'mainPreSam'}>
                {this.props.children}

                {/* 回到顶端 */}
                <BackTop>
                    <div
                        style={{
                            height: 40,
                            width: 40,
                            lineHeight: '40px',
                            borderRadius: 4,
                            backgroundColor: '#1088e9',
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 14,
                        }}
                    >
                        UP
                    </div>
                </BackTop>
            </div>
        );
    }
}
