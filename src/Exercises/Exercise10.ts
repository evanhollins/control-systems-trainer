import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import { Exercise, Resetable } from "./Exercise";
import p5Type from "p5";
import NeverestOrbital20 from "../Sim/Motors/NeverestOrbital20";
import { PointMass } from "../Sim/Physics/MomentOfInertia";
import Length from "../Sim/Physics/Units/Length";
import Mass from "../Sim/Physics/Units/Mass";

const starterCode = `
/*
* You are trying to drive a robot to a position!
*
* Your control system is handed two things, current position
* in meters, and a target position in meters. Based on those, 
* you must decide what to set the motor to, which is any 
* number between -1 and 1.
*
* Good luck!
*/

let error = 0;
let cumulativeError = 0;
let changeInError = 0;
let previousError = 0;

let Kp = 0;
let Ki = 0;
let Kd = 0;

(target, current, timeStep) => {
    error = target - current;
    changeInError = (error - previousError) / timeStep;
    cumulativeError += error * timeStep;

    previousError = error;

    return error * Kp + changeInError * Kd + cumulativeError * Ki;
}

`

class Exercise10 extends Exercise {
    name = "Exercise10";
    private static totalTime = Time.s(3);
    private static timeStep = Time.ms(5);
    private static initialTarget = 1;
    private static rotationToMm = 0.3;

    private staticFriction = Torque.nm(2);
    private dynamicFriction = Torque.nm(2);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint();
    private motor = new NeverestOrbital20();
    private robot = new PointMass(Mass.kg(5), Length.mm(50))
    private resetables: Array<Resetable> = [this.joint, this.motor];


    graphConfig = {
        yLabel: "meters",
        xLabel: "Time (s)",
        tickFormater: (value: any) => 
            isNaN(value) ? value : (value / 1000).toFixed(1).toString(),
        // riseTimeValue?: number,
        // overshootValue?: number,
        // steadyStateError?: number,
        graphKeys: ["current", "target"]
    };

    constructor() {
        super(Exercise10.totalTime, Exercise10.timeStep, starterCode, Exercise10.initialTarget)

        this.joint.addInertia([
            this.robot.inertia,
            this.motor.inertia
        ]);
        this.joint.addTorque([
            this.motor.torque,
        ])
        this.joint.friction = this.friction;

        this.reset = this.reset.bind(this);
        this.runStep = this.runStep.bind(this);
        this.draw = this.draw.bind(this);
    }

    reset() {
        super.reset();
        for (let resetable of this.resetables) {
            resetable.reset();
        }
    }

    runStep(currentTime: Time) {
        let current = this.joint.current.position.rot() * Exercise10.rotationToMm;
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
        const centerY = p5.height / 2;

        const bodyWidth = 300;
        const bodyHeight = 150;
        const numberOfLines = 5;
        const lineLength = p5.width / (numberOfLines * 2);

        let distance = this.joint.data[this.drawStep]
                        ? this.joint.data[this.drawStep].position.rot() * Exercise10.rotationToMm
                        : 0;

		p5.background(255);

        // Road
        p5.push();
        p5.fill(50);
        p5.noStroke();
        p5.rectMode(p5.CENTER)
        p5.rect(centerX, centerY + 50, p5.width, bodyHeight);
        p5.stroke(230, 221, 53);
        p5.strokeWeight(3);

        let xOffset = ((distance % 0.2) / 0.2) * (lineLength * 2);

        for (let i = 0; i < numberOfLines + 1; i++) {
            p5.line(i * 2 * lineLength - xOffset, centerY + 50, i * 2 * lineLength + lineLength - xOffset, centerY + 50);
        }
        p5.pop();

        // Finish line
        p5.push();
        p5.stroke(201, 34, 34);
        p5.strokeWeight(20);
        p5.strokeCap(p5.SQUARE);

        let distanceToGo = this.target - distance;

        p5.line(
            centerX + (distanceToGo / 0.2) * (lineLength * 2), 
            centerY - bodyHeight * 0.5 + 50, 
            centerX + (distanceToGo / 0.2) * (lineLength * 2),
            centerY + bodyHeight * 0.5 + 50, 
        );
        p5.pop();

        // Body
        p5.push();
        p5.fill(0, 0, 176);
        p5.noStroke();
        p5.rectMode(p5.CENTER);
        p5.rect(centerX, centerY, bodyWidth, bodyHeight);
        p5.pop();

        // Tire and wheel
        p5.push();
        p5.noStroke();
        [-(bodyWidth * 0.35), 0, (bodyWidth * 0.35)].forEach(xOffset => {
            p5.fill(135);
            p5.circle(centerX + xOffset, centerY + bodyHeight * 0.35, 80);
            p5.fill(0);
            p5.circle(centerX + xOffset, centerY + bodyHeight * 0.35, 40);
        })
        p5.pop();

        // Dozer
        p5.push();
        p5.noFill();
        p5.stroke(80);
        p5.strokeWeight(10);
        p5.arc(centerX + bodyWidth * 0.5 + 75, centerY, 50, bodyHeight, p5.HALF_PI, -p5.HALF_PI);
        p5.line(centerX + bodyWidth * 0.5, centerY, centerX + bodyWidth * 0.5 + 50, centerY);
        p5.pop();

    }
}

export default Exercise10;