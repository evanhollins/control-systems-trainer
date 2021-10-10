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
import { FormControl, InputGroup } from 'react-bootstrap';

type EditorProps = {
    initialValue: string;
    initialTime: number;
    initialTarget: number;
    onRun(code: string):  void;
    onTimeChange(time: number): void;
    onTargetChange(target: number): void;
};

class Editor extends React.Component<EditorProps, {}> {
    editor: Ace.Editor | null;
    state: {
        timeValue: number,
        targetValue: number
    }

    constructor(props: EditorProps) {
        super(props)

        this.state = {
            timeValue: props.initialTime,
            targetValue: props.initialTarget
        };

        this.editor = null;
        this.onTimeChange.bind(this);
        this.onTargetChange.bind(this);
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

    onTimeChange(t: number) {
        this.setState({timeValue: t});
        this.props.onTimeChange(t);
    }

    onTargetChange(t: number) {
        this.setState({targetValue: t});
        this.props.onTargetChange(t);
    }

    render() {
        return (
            <Container className="editorContainer">
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <Button variant="primary" onClick={this.reset.bind(this)}>Reset</Button>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Time (s)</InputGroup.Text>
                            <FormControl 
                                onChange={(e) => this.onTimeChange(parseInt(e.target.value))}
                                value={this.state.timeValue}
                                type="number"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Target</InputGroup.Text>
                            <FormControl 
                                onChange={(e) => this.onTargetChange(parseInt(e.target.value))}
                                value={this.state.targetValue}
                                type="number"
                            />
                        </InputGroup>
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