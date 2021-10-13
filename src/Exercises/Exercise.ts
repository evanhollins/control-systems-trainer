import Time from "../Sim/Physics/Units/Time";
import p5Type from "p5";

export type ExerciseData = {
    time: number;
    target: number;
    current: number;
    setPoint: number;
}

export type GraphConfig = {
    yLabel?: string,
    xLabel?: string,
    tickFormater?(value: any, index: number): string,
    riseTimeValue?: number;
    overshootValue?: number;
    steadyStateError?: number;
    graphKeys?: Array<string>;
}

export type ControlSystem = (target: number, current: number) => number;

export interface Resetable {
    reset(): void;
}

export abstract class Exercise implements Resetable {
    data: Array<ExerciseData>;
    totalTime: Time;
    timeStep: Time;
    starterCode: string;
    target: number;
    controlSystem: ControlSystem;
    abstract graphConfig: GraphConfig;

    abstract draw(p5: p5Type): void;
    protected abstract runStep(currentTime: Time): void;

    constructor(totalTime: Time, timeStep: Time, starterCode: string, target: number) {
        this.data = [];

        this.totalTime = totalTime;
        this.timeStep = timeStep;
        this.starterCode = starterCode;
        this.target = target;
        this.controlSystem = () => 0;
    }

    reset() {
        this.data = [];
    }

    run(): void {
        for(let t = 0; t < this.totalTime.ms(); t += this.timeStep.ms()) {
            this.runStep(Time.ms(t));
        }
    }
};
