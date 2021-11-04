import React from 'react';

import AceEditor from 'react-ace';
import { Ace } from 'ace-builds';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/theme-github';

import Cookies from 'js-cookie';

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
    initialTimeStep: number;
    exerciseName: string;
    showTimeStep: boolean;
    onRun(code: string):  void;
    onTimeChange(time: number): void;
    onTargetChange(target: number): void;
    onTimeStepChange(timeStep: number): void;
};

type EditorState = {
    timeValue: number,
    targetValue: number
    timeStepValue: number;
}

class Editor extends React.Component<EditorProps, EditorState> {
    editor: Ace.Editor | null;

    constructor(props: EditorProps) {
        super(props)

        this.state = {
            timeValue: props.initialTime,
            targetValue: props.initialTarget,
            timeStepValue: props.initialTimeStep
        };

        this.editor = null;
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onTargetChange = this.onTargetChange.bind(this);
        this.onTimeStepChange = this.onTimeStepChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.setup = this.setup.bind(this);
        this.reset = this.reset.bind(this);
        this.run = this.run.bind(this);
    }

    setup(editor: Ace.Editor) {
        this.editor = editor;
        let code = Cookies.get(this.props.exerciseName) || this.props.initialValue;
        this.editor.setValue(code, -1)
    }

    reset() {
        if (this.editor) {
            let code = this.props.initialValue;
            this.editor.setValue(code, -1)
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

    onTimeStepChange(t: number) {
        this.setState({timeStepValue: t});
        this.props.onTimeStepChange(t);
    }

    onCodeChange(value: string) {
        Cookies.set(this.props.exerciseName, value);
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
                                onChange={(e) => this.onTimeChange(parseFloat(e.target.value))}
                                value={this.state.timeValue}
                                type="number"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Target</InputGroup.Text>
                            <FormControl 
                                onChange={(e) => this.onTargetChange(parseFloat(e.target.value))}
                                value={this.state.targetValue}
                                type="number"
                            />
                        </InputGroup>
                    </Col>
                    {
                        this.props.showTimeStep ?
                        <Col>
                            <InputGroup>
                                <InputGroup.Text>Time Step</InputGroup.Text>
                                <FormControl 
                                    onChange={(e) => this.onTimeStepChange(parseFloat(e.target.value))}
                                    value={this.state.timeStepValue}
                                    type="number"
                                />
                            </InputGroup>
                        </Col> :
                        null
                    }
                    <Col xs="auto">
                        <Button variant="success" onClick={this.run}>Run</Button>
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
                        onLoad={this.setup}
                        onChange={this.onCodeChange}
                    />
                </Row>
            </Container>
        )
    }
}

export default Editor