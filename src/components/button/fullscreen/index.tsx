import * as React from 'react';
import lodash from 'lodash';

import { Button, message } from 'antd';

export interface IFullscreenProps {
    /**
     * 需要全屏的容器
     */
    FullscreenBody: () => React.RefObject<HTMLElement>;
}
const development = process.env.NODE_ENV === 'development';
export class Fullscreen extends React.Component<IFullscreenProps, any> {
    /**
     * 当前页面是否全屏
     */
    isFullscreen = false;
    fullscreenchange = (event = { type: '' }) => {
        if (document.fullscreenElement && event.type === 'fullscreenchange') {
            return;
        }
        let { current: FullscreenBody } = this.props.FullscreenBody();
        this.isFullscreen = !this.isFullscreen;
        // 兼容问题待处理
        if (this.isFullscreen) {
            FullscreenBody.classList.add('lenovo-refFullscreen');
            development &&
                message.warn(
                    '浏览器全屏暂时禁用~ 浏览器兼容不好！dev 模式提示',
                );
            // this.onAddEventListener();
        } else {
            // this.onRemoveEventListener();
            FullscreenBody.classList.remove('lenovo-refFullscreen');
        }
        lodash.delay(() => {
            dispatchEvent(
                new CustomEvent('resize', {
                    detail: this.isFullscreen && 'refFullscreen',
                }),
            );
        }, 100);
    };
    onRemoveEventListener() {
        try {
            const FullscreenBody = document.body;
            if (!document.fullscreenElement) {
                return;
            }
            if (document.exitFullscreen) {
                document.exitFullscreen();
                FullscreenBody.removeEventListener(
                    'fullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            } else if (document['mozCancelFullScreen']) {
                document['mozCancelFullScreen']();
                FullscreenBody.removeEventListener(
                    'mozfullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            } else if (document['webkitCancelFullScreen']) {
                document['webkitCancelFullScreen']();
                FullscreenBody.removeEventListener(
                    'webkitfullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            } else if (document['msExitFullscreen']) {
                document['msExitFullscreen']();
                FullscreenBody.removeEventListener(
                    'MSFullscreenChange',
                    this.fullscreenchange,
                    false,
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
    onAddEventListener() {
        try {
            const FullscreenBody = document.body;
            //W3C
            if (FullscreenBody.requestFullscreen) {
                FullscreenBody.requestFullscreen();
                FullscreenBody.addEventListener(
                    'fullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            }
            //FireFox
            else if (FullscreenBody['mozRequestFullScreen']) {
                FullscreenBody['mozRequestFullScreen']();
                FullscreenBody.addEventListener(
                    'mozfullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            }
            //Chrome等
            else if (FullscreenBody['webkitRequestFullScreen']) {
                FullscreenBody['webkitRequestFullScreen']();
                FullscreenBody.addEventListener(
                    'webkitfullscreenchange',
                    this.fullscreenchange,
                    false,
                );
            }
            //IE11
            else if (FullscreenBody['msRequestFullscreen']) {
                FullscreenBody['msRequestFullscreen']();
                FullscreenBody.addEventListener(
                    'MSFullscreenChange',
                    this.fullscreenchange,
                    false,
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * 全屏事件
     */
    onFullscreen() {
        this.fullscreenchange();
    }
    public render() {
        return (
            <Button
                icon="fullscreen"
                type="link"
                onClick={this.onFullscreen.bind(this)}
            ></Button>
        );
    }
}
export default Fullscreen;
