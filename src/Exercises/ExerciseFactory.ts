import { Exercise } from "./Exercise";
import Exercise1 from "./Exercise1";
import Exercise2 from "./Exercise2";

function GetExercise(exerciseNumber: string | null): Exercise {
    switch(exerciseNumber) {
        case "1":
            return new Exercise1();
        case "2":
            return new Exercise2();
        default:
            return new Exercise1();
    }
}

export default GetExercise;