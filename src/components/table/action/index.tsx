import { Button, Col, Divider, Dropdown, Row } from 'antd';
import * as React from 'react';
import { Fullscreen } from '../../button';
declare type OverlayFunc = () => React.ReactNode;
export interface IActionProps {
    /**
     * 隐藏 actions
     */
    actionsHide?: boolean;
    /**
     * 下拉列表
     */
    dropdown?: React.ReactNode | OverlayFunc;
    /**
     * 左侧页面动作
     */
    actions?: React.ReactNode | OverlayFunc;
    /**
     * 左侧页面动作
     */
    actionsRight?: React.ReactNode | OverlayFunc;
    /**
     * 全屏容器
     */
    fullscreenBody?: () => React.RefObject<HTMLElement>;
}
export class Action extends React.Component<IActionProps, any> {
    public render() {
        let { actions, actionsRight, dropdown, actionsHide } = this.props;
        // 函数
        if (typeof actions === 'function') {
            actions = actions();
        }
        if (actionsHide) {
            return null;
        }
        actionsRight = actionsRight || (
            <>
                {/* {dropdown && <Dropdown overlay={dropdown}>
                <Button icon="filter" type="link"></Button>
            </Dropdown>} */}
                <Divider type="vertical" />
                <Fullscreen FullscreenBody={this.props.fullscreenBody} />
            </>
        );
        // 函数
        if (typeof actionsRight === 'function') {
            actionsRight = actionsRight();
        }
        return (
            <Row className="lenovo-table-action">
                <Col className="lenovo-table-action-left">{actions}</Col>
                <Col className="lenovo-table-action-right">{actionsRight}</Col>
            </Row>
        );
    }
}

export default Action;
