import { Exercise, ExerciseData } from '../Exercises/Exercise';
class Sim {
    exercise: Exercise | undefined;
    updateGraphData: (data: Array<ExerciseData>) => void;

    constructor(updateGraphData: (data: Array<ExerciseData>) => void) {
        this.updateGraphData = updateGraphData;
    }

    setup(exercise: Exercise) {
        this.exercise = exercise;
    }

    run() {
        if (this.exercise) {
            this.exercise.reset();
            this.exercise.run();
            this.updateGraphData(this.exercise.data);
        }
    }
}

export default Sim;