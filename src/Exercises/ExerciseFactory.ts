import { Exercise } from "./Exercise";
import Exercise1 from "./Exercise1";
import Exercise2 from "./Exercise2";
import Exercise3 from "./Exercise3";
import Exercise4 from "./Exercise4";
import Exercise5 from "./Exercise5";
import Exercise6 from "./Exercise6";
import Exercise7 from "./Exercise7";

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
        case "5":
            return new Exercise5();
        case "6":
            return new Exercise6();
        case "7":
            return new Exercise7();
        default:
            return new Exercise1();
    }
}

export default GetExercise;