
type ExerciseData = {
    time: number;
    target: number;
    current: number;
}

type Exercise = {
    data: Array<ExerciseData>

    reset: () => void;
    run: (time: number) => void;
};

class Sim {
    exercise: Exercise | undefined;
    durationMs: number;
    stepMs: number;
    updateGraphData: (data: Array<ExerciseData>) => void;

    constructor(updateGraphData: (data: Array<ExerciseData>) => void) {
        this.updateGraphData = updateGraphData;

        this.durationMs = 0;
        this.stepMs = 0;
    }

    setup(exercise: Exercise, durationMs: number, stepMs: number) {
        this.exercise = exercise;
        this.durationMs = durationMs;
        this.stepMs = stepMs;
    }

    run() {
        if (this.exercise) {
            this.exercise.reset()

            for (let i = 0; i < this.durationMs; i += this.stepMs) {
                this.exercise.run(i)
            }
            this.updateGraphData(this.exercise.data)
        }
    }
}

export default Sim;