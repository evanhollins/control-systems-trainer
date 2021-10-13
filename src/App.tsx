import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

import Editor from './Editor/Editor';
import Graph from './Graph/Graph';
import Preview from './Preview/Preview';

import Sim from './Sim/Sim';
import Time from './Sim/Physics/Units/Time';
import { Exercise, ExerciseData } from './Exercises/Exercise'
import GetExercise from './Exercises/ExerciseFactory';

function getParams() {
    return new URLSearchParams(window.location.search);
}

class App extends React.Component<{}, {graphData: Array<ExerciseData>, displayTime: number}> {
    private sim: Sim;
    private exercise: Exercise;
    private displayTimerHandle: number | undefined;

    constructor(props: object) {
        super(props);

        this.state = {
            graphData: [],
            displayTime: 0
        }

        let params = getParams();
        this.exercise = GetExercise(params.get("exercise"));

        this.sim = new Sim(newGraphData => this.setState({ graphData: newGraphData }));

        this.startDisplay = this.startDisplay.bind(this);
        this.displayCallback = this.displayCallback.bind(this);
    }

    run(code: string) {
        if (this.displayTimerHandle !== undefined) {
            window.clearInterval(this.displayTimerHandle);
            this.displayTimerHandle = undefined;
        }

        // eslint-disable-next-line
        eval(code);

        // @ts-ignore
        this.exercise.controlSystem = window.runControlSystem;
        this.exercise.reset();
        this.sim.setup(this.exercise);
        this.sim.run();

        window.setTimeout(this.startDisplay, 1500);
    }

    startDisplay() {
        this.exercise.drawStep = 0;
        this.setState({displayTime: 0})
        this.displayTimerHandle = window.setInterval(this.displayCallback, this.exercise.timeStep.ms());
    }

    displayCallback() {
        this.exercise.drawStep++;
        let newTime = this.state.displayTime + this.exercise.timeStep.ms();

        if (newTime === this.exercise.totalTime.ms()) {
            clearInterval(this.displayTimerHandle)
            this.displayTimerHandle = undefined;
            this.setState({displayTime: 0});
        } else {
            this.setState({displayTime: newTime});
        }
    }

    render() {
        return (
            <Container fluid>
                <Row className="app">
                    <Col xs={6} className="section editor">
                        <Editor 
                            initialValue={this.exercise.starterCode} 
                            initialTarget={this.exercise.target}
                            initialTime={this.exercise.totalTime.s()}
                            onRun={this.run.bind(this)} 
                            onTimeChange={s => {this.exercise.totalTime = Time.s(s)}}
                            onTargetChange={t => {this.exercise.target = t}}
                        />
                    </Col>
                    <Col xs={6} className="section">
                        <Row className="preview">
                            <Preview draw={this.exercise.draw}/>
                        </Row>
                        <Row className="graph">
                            <Graph data={this.state.graphData} config={this.exercise.graphConfig} cursor={this.state.displayTime}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
