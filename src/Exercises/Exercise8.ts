import NeverestOrbital20 from "../Sim/Motors/NeverestOrbital20";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint, RotationalState } from "../Sim/Physics/RotationalJoint";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import Mass from "../Sim/Physics/Units/Mass";
import Length from "../Sim/Physics/Units/Length";
import { Exercise, Resetable } from "./Exercise";
import p5Type from "p5";
import { PointMass } from "../Sim/Physics/MomentOfInertia";
import RotationalPosition from "../Sim/Physics/Units/RotationalPosition";
import RotationalVelocity from "../Sim/Physics/Units/RotationalVelocity";
import RotationalAcceleration from "../Sim/Physics/Units/RotationalAcceleration";

const starterCode = `
/*
* Your control system!
*
* You are controlling an elevator, and need to up to the top floor.
* This elevator is no longer empty, and you must contend with gravity!
* 
* Your control system is handed a target floor and a current floor, 
* where the ground floor is 0, first floor is 1, etc. If the elevator
* is between floors, you get a floating point number e.g. 0.5.
* Based on those, you must decide what to set the motor to, which is 
* any number between -1 and 1.
*
* Good luck!
*/

let Kp = 0;
let Kd = 0;
let previous = 0;

(target, current, timeStep) => {
    let error = target - current;
    let changeInError = (current - previous) / timeStep;
    previous = current;

    return error * Kp + changeInError * Kd;
}

`

class Exercise8 extends Exercise {
    name = "Exercise8";
    private static totalTime = Time.s(9);
    private static timeStep = Time.ms(5);
    private static initialTarget = 0;
    private initialState: RotationalState = {
        position: RotationalPosition.deg(360 * 5 * 2),
        velocity: RotationalVelocity.radS(0),
        acceleration: RotationalAcceleration.radS2(0),
        torque: Torque.nm(0)
    }

    private staticFriction = Torque.nm(0.02);
    private dynamicFriction = Torque.nm(0.01);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint(this.initialState);
    private motor = new NeverestOrbital20();
    private car = new PointMass(Mass.kg(1), Length.mm(300));
    private resetables: Array<Resetable> = [this.joint, this.motor];

    graphConfig = {
        yLabel: "floor",
        xLabel: "Time (s)",
        tickFormater: (value: any) => 
            isNaN(value) ? value : (value / 1000).toFixed(1).toString(),
        // riseTimeValue?: number,
        // overshootValue?: number,
        // steadyStateError?: number,
        graphKeys: ["current", "target"]
    };

    constructor() {
        super(Exercise8.totalTime, Exercise8.timeStep, starterCode, Exercise8.initialTarget)
        this.reset = this.reset.bind(this);
        this.runStep = this.runStep.bind(this);
        this.draw = this.draw.bind(this);
        this.gravity = this.gravity.bind(this);

        this.joint.addInertia([
            this.car.inertia,
            this.motor.inertia
        ]);
        this.joint.addTorque([
            this.motor.torque,
            this.gravity
        ])
        this.joint.friction = this.friction;
    }

    reset() {
        super.reset();
        for (let resetable of this.resetables) {
            resetable.reset();
        }
    }

    gravity(state: RotationalState) {
        return state.position.deg() > 0 ? Torque.nm(-1) : Torque.nm(0);
    }

    runStep(currentTime: Time) {
        let current = this.joint.current.position.deg() / (5 * 360);
        let setPoint = this.controlSystem(this.target, current, this.timeStep.s());

        if (setPoint === null || setPoint === undefined) {
            this.log("Control system didn't return anything. Make sure your function will always return a number.")
        } else if (typeof setPoint !== "number") {
            this.log("Control system returned something that wasn't a number. Make sure your function will always return a number.")
        }

        this.motor.setPower(setPoint);
        this.joint.run(this.timeStep);

        this.data.push({
            time: currentTime.ms(),
            target: this.target,
            current,
            setPoint
        })
    }

    draw(p5: p5Type) {
        const centerX = p5.width / 2;

        let currentFloor = this.joint.data[this.drawStep].position.deg() / (360 * 5);

        let floors = 4;
        let floorSpacing  = p5.height / (floors + 1);
        let elevatorHeight = floorSpacing;
        let elevatorWidth = floorSpacing * 0.75;

		p5.background(255);

        // Floors background
        p5.push();
        p5.noStroke();
        p5.fill(207, 91, 85);
        p5.rect(0, floorSpacing, centerX, p5.height);
        p5.pop();

        // Elevator background
        p5.push();
        p5.noStroke();
        p5.fill(100, 100, 100);
        p5.rect(centerX, 0, elevatorWidth * 2, p5.height);
        p5.pop();

        // Elevator background
        p5.push();
        p5.noStroke();
        p5.fill(0);
        p5.ellipse(centerX + elevatorWidth, floorSpacing / 2, elevatorWidth, elevatorWidth);
        p5.pop();

        // Elevator
        p5.push();
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.fill(171, 164, 87);
        p5.rect(centerX, p5.height - elevatorHeight - (currentFloor * elevatorHeight), elevatorWidth, elevatorHeight);
        p5.pop();

        // Weight
        p5.push();
        p5.fill(0);
        p5.rect(centerX + elevatorWidth + 10, elevatorHeight * (currentFloor + 1), elevatorWidth - 20, elevatorHeight);
        p5.pop();

        // Cable
        p5.push();
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.line(centerX + (elevatorWidth / 2), elevatorHeight / 2, centerX + (elevatorWidth / 2), p5.height - elevatorHeight * (currentFloor + 1))
        p5.line(centerX + (elevatorWidth * 1.5), elevatorHeight / 2, centerX + (elevatorWidth * 1.5), elevatorHeight * (currentFloor + 1))
        p5.pop();

        // Floors
        for (let i = 0; i < floors; i++) {
            p5.push();
            p5.stroke(0);
            p5.strokeWeight(5);
            let height = p5.height - (i * floorSpacing);
            p5.line(0, height, centerX, height);
            p5.pop();
        }
    }
}

export default Exercise8;