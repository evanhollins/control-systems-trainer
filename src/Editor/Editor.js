import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/theme-github';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './Editor.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.editor = null;
  }

  setup(editor) {
    this.editor = editor;
    this.reset();
  }

  reset() {
    this.editor.setValue(this.props.initialValue)
  }

  render() {
    return (
      <Container className="editorContainer">
        <Row className="justify-content-between">
          <Col xs="auto">
            <Button variant="primary" onClick={this.reset.bind(this)}>Reset</Button>
          </Col>
          <Col xs="auto">
              <Button variant="success" onClick={() => this.props.onRun(this.editor.getValue())}>Run</Button>
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