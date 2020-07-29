import React from 'react';
import Editor from './components/editor';
import store from './store';
import { observer } from 'mobx-react';

const editor: React.FC<any> = observer(props => {
    return (
        <div>
            <Editor {...props}></Editor>
        </div>
    );
});

export default editor;
