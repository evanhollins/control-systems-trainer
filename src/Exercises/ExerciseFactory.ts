import { Exercise } from "./Exercise";
import Exercise1 from "./Exercise1";
import Exercise2 from "./Exercise2";
import Exercise3 from "./Exercise3";
import Exercise4 from "./Exercise4";

function GetExercise(exerciseNumber: string | null): Exercise {
    switch(exerciseNumber) {
        case "1":
            return new Exercise1();
        case "2":
            return new Exercise2();
        case "3":
            return new Exercise3();
        case "4":
            return new Exercise4();
        default:
            return new Exercise1();
    }
}

export default GetExercise;