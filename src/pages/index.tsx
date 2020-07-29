import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <div
                style={{
                    padding: 24,
                    height: '100%',
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
