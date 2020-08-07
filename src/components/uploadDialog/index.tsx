import {
    Divider,
    Upload,
    message,
    Button,
    Modal,
    notification,
    Spin,
} from 'antd';
import { BindAll } from 'lodash-decorators';
import * as React from 'react';
import request from '@/service/req';
import { CloudUploadOutlined, InboxOutlined } from '@ant-design/icons';

@BindAll()
export default class UploadDialog extends React.Component<
    {
        Search: (any) => void;
        disabled?: boolean;
        onCreateImportProps: () => { action: string; data: {} };
        type?: 'link' | 'default' | 'ghost' | 'primary' | 'dashed' | 'danger';
        message?: any;
        noTitle?: any;
    },
    any
> {
    state = {
        visible: false,
        DraggerProps: {},
        loading: false,
    };

    onCancle() {
        this.setState({ visible: false });
    }
    async onUpload() {
        let settings = {
            action: '',
            data: {},
        };
        settings = await this.props.onCreateImportProps();
        if (!settings) {
            return;
        }
        // 配置 请求 参数
        const DraggerProps = {
            name: 'file',
            showUploadList: false,
            accept: '.xlsx,.xls',
            headers: { token: document['getQueryString']('token') || '' },
            ...settings,
            customRequest: async option => {
                //重新antd请求
                this.setState({ loading: true });
                try {
                    let res = await request.fileUpload(option);
                    this.props.Search && this.props.Search(res);
                } catch (error) {
                    console.log('upload custom request error: ', error);
                }
                // return RequestFiles.customRequest(option, "blob")
                this.setState({ loading: false });
                this.onCancle();
            },
            onChange: info => {},
            onRemove: file => {},
        };
        this.setState({
            visible: true,
            DraggerProps: DraggerProps,
        });
    }

    public render() {
        const { visible, DraggerProps } = this.state;
        return (
            <>
                <Button
                    style={{ verticalAlign: 'top' }}
                    icon={<CloudUploadOutlined />}
                    disabled={this.props.disabled}
                    type={'link'}
                    onClick={this.onUpload}
                >
                    {this.props.noTitle ? '' : 'Upload'}
                </Button>
                <Modal
                    title="Upload"
                    visible={visible}
                    destroyOnClose
                    footer={null}
                    closable={true}
                    onCancel={this.onCancle}
                >
                    <div>
                        <Spin
                            className="mySpinning"
                            spinning={this.state.loading}
                        >
                            <Upload.Dragger {...DraggerProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag the file to the area to upload
                                </p>
                            </Upload.Dragger>
                            {this.props.message && <p>{this.props.message}</p>}
                        </Spin>
                    </div>
                </Modal>
            </>
        );
    }
}
