import React, { Component } from 'react';
import LEdit from 'wangeditor';
import { bindAll } from 'lodash-decorators';

@bindAll()
export default class extends Component<any, any> {
  editor = null;
  isEdit = false;

  componentDidMount() {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    const editor = new LEdit(elemMenu, elemBody);
    this.editor = editor;
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.props.onBlur && this.props.onBlur(html);
      this.props.onChange && this.props.onChange(html);
    };

    editor.customConfig.onblur = html => {
      this.props.onBlur && this.props.onBlur(html);
      // this.props.onChange && this.props.onChange(html);
    };

    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video',  // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];

    editor.customConfig.zIndex = 10;
    editor.customConfig.fontNames = [
      // '宋体',
      // '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana',
      'Helvetica',
      'Lucida Grande',
      'Times New Roman',
      'Georgia',
    ];
    if (this.props.language == 'en') {
      editor.customConfig.lang = {
        设置标题: 'Title',
        正文: 'P',
        链接文字: 'Link Text',
        链接: 'Link',
        上传图片: 'Upload Image',
        网络图片: 'Image Link',
        图片Link: 'Image Link',
        上传: 'Upload',
        创建: '',
        字号: 'Font Size',
        文字颜色: 'Font Color',
        背景色: 'Background Color',
        设置列表: 'List',
        有序列表: 'Ordered&nbsp&nbsp&nbsp&nbsp',
        无序列表: 'Unordered',

        对齐方式: 'Aligning',
        靠左: 'Left&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        居中: 'Content',
        靠右: 'Right&nbsp&nbsp&nbsp&nbsp&nbsp',

        插入表格: 'Table',
        行: 'x',
        列的表格: '',
        插入: 'Insert',
        编辑表格: 'Edit ',
        增加x: 'Add Row',
        删除x: 'Delete Row',
        增加列: 'Add Column',
        删除列: 'Delete Column',
        删除表格: 'Delete Table',

        默认: 'default',
        新浪: 'Sina',
        代码: 'Code',
        删除Link: 'Delete',
        字体: 'Font',

        // 还可自定添加更多
      };
    }

    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();

    if (this.props.value) {
      editor.txt.html(this.props.value);
    }

    if (this.props.disabled != undefined) {
      editor.$textElem.attr('contenteditable', !this.props.disabled);
    }
  }
  textAreaValue() {
    console.log('编辑器data：', this.editor.txt.html());
  }

  render() {
    if (this.editor) {
      if (this.props.disabled != undefined) {
        this.editor.$textElem.attr('contenteditable', !this.props.disabled);
      }

      if (this.props.value && !this.isEdit) {
        this.editor.txt.html(this.props.value);
        this.isEdit = true;
      }
    }

    let editorElemMenu: any = {
      backgroundColor: '#f1f1f1',
      border: '1px solid #ccc',
    };

    if (this.props.noMenu) {
      editorElemMenu.display = 'none';
    }

    if (this.props.disabled) {
      editorElemMenu.pointerEvents = 'none';
      editorElemMenu.backgroundColor = 'rgb(241, 241, 241)';
    } else {
      editorElemMenu.backgroundColor = '';
    }

    return (
      <div>
        <div
          ref="editorElemMenu"
          style={editorElemMenu}
          className="editorElem-menu"
        ></div>
        <div
          style={{
            width: '100%',
            padding: '5px 10px',
            overflowY: 'auto',
            minHeight: 250,
            // border:"1px solid #ccc",
            border: '1px solid #ccc',
            borderTop: 'none',
          }}
          ref="editorElemBody"
          className="editorElem-body"
        ></div>
      </div>
    );
  }
}
