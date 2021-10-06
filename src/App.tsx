import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

import Editor from './Editor/Editor';
import Graph from './Graph/Graph';
import Sim from './Sim/Sim';
import { Exercise, ExerciseData } from './Exercises/Exercise'

import Exercise1 from './Exercises/Exercise1';

class App extends React.Component<{}, {graphData: Array<ExerciseData>}> {
    private sim: Sim;
    private exercise: Exercise;

    constructor(props: object) {
        super(props);

        this.state = {
            graphData: []
        }

        this.sim = new Sim(newGraphData => this.setState({ graphData: newGraphData }));
        this.exercise = new Exercise1();
    }

    run(code: string) {
        // eslint-disable-next-line
        eval(code);

        this.exercise.controlSystem = window.runControlSystem;
        this.exercise.reset();
        this.sim.setup(this.exercise);
        this.sim.run();
    }

    render() {
        return (
            <Container fluid>
                <Row className="app">
                    <Col xs={6} className="section editor">
                        <Editor initialValue={this.exercise.starterCode} onRun={this.run.bind(this)} />
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