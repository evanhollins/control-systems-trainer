import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

import Editor from './Editor/Editor';
import Graph from './Graph/Graph';
import Sim from './Sim/Sim';

import Exercise1 from './Exercises/Exercise1';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: []
    }

    this.sim = new Sim(newGraphData => this.setState({graphData: newGraphData}));
  }

  run(code) {
    // eslint-disable-next-line
    eval(code);

    let exercise = new window.CurrentExercise();
    this.sim.setup(exercise, 5, 0.1);
    this.sim.run();
  }

  render() {
    return (
      <Container fluid>
        <Row className="app">
          <Col xs={6} className="section editor">
            <Editor initialValue={Exercise1} onRun={this.run.bind(this)} />
          </Col>
          <Col xs={6} className="section">
            <Row className="preview">

            </Row>
            <Row className="graph">
              <Graph data={this.state.graphData} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
