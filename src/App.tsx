import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

import Editor from './Editor/Editor';
import Graph from './Graph/Graph';
import Preview from './Preview/Preview';
import Console, { LogMessage } from './Console/Console';

import Sim from './Sim/Sim';
import Time from './Sim/Physics/Units/Time';
import { Exercise, ExerciseData } from './Exercises/Exercise';
import GetExercise from './Exercises/ExerciseFactory';

function getParams() {
    return new URLSearchParams(window.location.search);
}

interface AppState {
    graphData: Array<ExerciseData>;
    logMessages: Array<LogMessage>;
    displayTime: number;
}

class App extends React.Component<{}, AppState> {
    private sim: Sim;
    private exercise: Exercise;
    private displayTimerHandle: number | undefined;
    private static DisplayStep = Time.ms(15);
    private logBuffer: Array<LogMessage> = [];

    constructor(props: object) {
        super(props);

        this.startDisplay = this.startDisplay.bind(this);
        this.displayCallback = this.displayCallback.bind(this);
        this.run = this.run.bind(this);
        this.print = this.print.bind(this);

        this.state = {
            graphData: [],
            logMessages: [],
            displayTime: 0
        }

        let params = getParams();
        this.exercise = GetExercise(params.get("exercise"));
        this.exercise.log = this.print;

        this.sim = new Sim(graphData => this.setState({ graphData }));

        // @ts-ignore
        window.print = this.print;
    }

    run(code: string) {
        if (this.displayTimerHandle !== undefined) {
            window.clearInterval(this.displayTimerHandle);
            this.displayTimerHandle = undefined;
        }

        let func = undefined;

        try {
            // eslint-disable-next-line
            func = eval(code);
        } catch (e) {
            this.setState({
                logMessages: [{
                    level: 'error',
                    message: (e as Error).message
                }]
            })
            return;
        }

        if (func instanceof Function) {
            // @ts-ignore
            this.exercise.controlSystem = func;
            this.logBuffer = [];
            this.exercise.reset();
            this.sim.setup(this.exercise);
            this.sim.run();
            window.setTimeout(this.startDisplay, 1500);
        } else {
            this.setState({
                logMessages: [{
                    level: 'error',
                    message: "Function not found. Make sure you haven't changed the original control system function."
                }]
            })
        }
    }

    startDisplay() {
        this.setState({logMessages: this.logBuffer});

        this.exercise.drawStep = 0;
        this.setState({displayTime: 0})
        this.displayTimerHandle = window.setInterval(this.displayCallback, App.DisplayStep.ms());
    }

    displayCallback() {
        this.exercise.drawStep += App.DisplayStep.ms() / this.exercise.timeStep.ms();
        let newTime = this.state.displayTime + App.DisplayStep.ms();

        if (newTime >= this.exercise.totalTime.ms()) {
            clearInterval(this.displayTimerHandle)
            this.displayTimerHandle = undefined;
            this.setState({displayTime: 0});
        } else {
            this.setState({displayTime: newTime});
        }
    }

    print(arg: any) {
        let message: string | undefined;

        switch (typeof arg) {
            case "string":
                message = arg;
                break;
            case "boolean":
                message = arg ? "true" : "false";
                break;
            case "number":
                message = arg.toString();
                break;
            case "object":
                message = JSON.stringify(arg);
                break;
            default:
                message = undefined;
        }

        if (message) {
            this.logBuffer.push({level: "log", message});
        }
    }

    render() {
        return (
            <Container fluid>
                <Row className="app">
                    <Col xs={6} className="section">
                        <Row className="editor">
                            <Editor 
                                exerciseName={this.exercise.name}
                                initialValue={this.exercise.starterCode} 
                                initialTarget={this.exercise.target}
                                initialTime={this.exercise.totalTime.s()}
                                initialTimeStep={this.exercise.timeStep.ms()}
                                showTimeStep={this.exercise.showTimeStep}
                                onRun={this.run} 
                                onTimeChange={s => {this.exercise.totalTime = Time.s(s)}}
                                onTargetChange={t => {this.exercise.target = t}}
                                onTimeStepChange={t => {this.exercise.controlSystemTimeStep = Time.ms(t)}}
                            />
                        </Row>
                        <Row className="console">
                            <Console logMessages={this.state.logMessages}/>
                        </Row>
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
