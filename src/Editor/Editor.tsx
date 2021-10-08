import React from 'react';

import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/theme-github';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './Editor.css'

type EditorProps = {
    initialValue: string;
    onRun(code: string):  void;
};

class Editor extends React.Component<EditorProps, {}> {
    editor: Ace.Editor | null;

    constructor(props: EditorProps) {
        super(props)

        this.editor = null;
    }

    setup(editor: Ace.Editor) {
        this.editor = editor;
        this.reset();
    }

    reset() {
        if (this.editor) {
            this.editor.setValue(this.props.initialValue, -1)
        }
    }

    private run() {
        this.props.onRun(this.editor ? this.editor.getValue() : "");
    }

    render() {
        return (
            <Container className="editorContainer">
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <Button variant="primary" onClick={this.reset.bind(this)}>Reset</Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={this.run.bind(this)}>Run</Button>
                    </Col>
                </Row>
                <Row className="editorRow">
                    <AceEditor
                        mode='javascript'
                        theme='github'
                        name='editor'
                        editorProps={{ $blockScrolling: true }}
                        height="100%"
                        width="100%"
                        onLoad={this.setup.bind(this)}
                    />
                </Row>
            </Container>
        )
    }
}

export default Editor