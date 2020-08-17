import {
    Button,
    Divider,
    Popconfirm,
    Menu,
    Upload,
    Row,
    Col,
    Select,
    Modal,
    Tooltip,
} from 'antd';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import * as React from 'react';
import UploadDialog from '@/components/uploadDialog';
import { isFunction } from 'lodash';
import Message from '@/components/message';

import {
    CaretRightOutlined,
    PlusCircleOutlined,
    SaveOutlined,
    DeleteOutlined,
    CloudDownloadOutlined,
    DownloadOutlined,
} from '@ant-design/icons';

@BindAll()
@observer
export default class PageAction extends React.Component<any, any> {
    componentDidMount() {}
    /**
     * 删除
     */
    onDelete() {
        let res = this.props.actionObj['remove'];
        if (res.length > 0) {
            Modal.confirm({
                title: `Are you  sure to delet ${res.length} records?`,
                onOk: async () => {
                    res.delete();
                },
                onCancel() {},
            });
        } else {
            Message.warning(`Please select data to delete !`);
        }
    }

    /**
     * 下拉列表
     */
    static DropdownAction = () => <DropdownAction />;

    render_select_op(datas) {
        return datas.map((x, index) => {
            return (
                <Select.Option key={index} value={x.value}>
                    {x.text}
                </Select.Option>
            );
        });
    }

    render() {
        let isEdit = true;

        if (this.props.disabled) {
            isEdit = false;
        }

        let isAdd = isEdit;

        let isRevise = this.props.isRevise;

        return this.props.actionObj ? (
            <div style={{ marginBottom: '3px' }} className="tableAction">
                {(() => {
                    if (this.props.actionObj['select']) {
                        let selectParam = this.props.actionObj['select']();
                        return !selectParam ? null : (
                            <div style={{ display: 'inline-block' }}>
                                <span>{selectParam.title}:</span>
                                <Select
                                    disabled={!isEdit}
                                    {...selectParam}
                                    style={{
                                        display: 'inline-block',
                                        width: '150px',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {this.render_select_op(
                                        selectParam.dataSource,
                                    )}
                                </Select>
                            </div>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['select'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['run']) {
                        return (
                            <Button
                                disabled={!isEdit}
                                icon={<CaretRightOutlined />}
                                type="link"
                                onClick={this.props.actionObj['run']}
                            >
                                Run Job
                            </Button>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['run'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['add']) {
                        return (
                            <Button
                                disabled={!isAdd}
                                icon={<PlusCircleOutlined />}
                                type="link"
                                onClick={this.props.actionObj['add']}
                            >
                                Add{' '}
                            </Button>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['add'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['save']) {
                        return (
                            <Button
                                disabled={!isEdit}
                                icon={<SaveOutlined />}
                                type="link"
                                onClick={this.props.actionObj['save']}
                            >
                                Save{' '}
                            </Button>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['save'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['remove']) {
                        return (
                            <Button
                                onClick={this.onDelete}
                                disabled={!isEdit}
                                icon={<DeleteOutlined />}
                                type="link"
                            >
                                Remove
                            </Button>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['remove'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['upload']) {
                        return (
                            <UploadDialog
                                disabled={!isEdit || isRevise}
                                Search={this.props.actionObj['upload'].search}
                                message={this.props.message}
                                onCreateImportProps={
                                    this.props.actionObj['upload'].upload
                                }
                            />
                        );
                    } else return null;
                })()}

                {this.props.actionObj['upload'] && <Divider type="vertical" />}

                {(() => {
                    if (this.props.actionObj['download']) {
                        return (
                            <Button
                                icon={<CloudDownloadOutlined />}
                                type="link"
                                onClick={this.props.actionObj['download']}
                            >
                                Download
                            </Button>
                        );
                    } else return null;
                })()}

                {this.props.actionObj['download'] && (
                    <Divider type="vertical" />
                )}

                {(() => {
                    if (this.props.actionObj['downloadTemplate']) {
                        return (
                            <Button
                                icon={<DownloadOutlined />}
                                type="link"
                                onClick={
                                    this.props.actionObj['downloadTemplate']
                                }
                            >
                                Download Template
                            </Button>
                        );
                    } else return null;
                })()}
            </div>
        ) : null;
    }
}
class DropdownAction extends React.Component<any, any> {
    public render() {
        return (
            <Menu>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );
    }
}
