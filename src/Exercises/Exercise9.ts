import RedLine from "../Sim/Motors/RedLine";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import RotationalVelocity from "../Sim/Physics/Units/RotationalVelocity";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import SteelFlywheel from "../Sim/Wheels/SteelFlywheel";
import { Exercise, Resetable } from "./Exercise";
import p5Type from "p5";
import { angleToCoordinate } from '../Utility';

const starterCode = `
/*
* Your control system!
*
* You are trying to control a 775 pro to spin a
* steel flywheel at 10 revolutions per second (rps).
* 
* Your control system is handed two things, a target rps
* and a current rps. Based on those, you must decide what
* to set the motor to, which is any number between -1 and 1.
* 
* Some examples:
*   Full power forwards: 1
*   Full power backwards: -1
*   Half power forwards: 0.5
*   No power: 0
*
* Good luck!
*/

let Kp = 0;

(target, current, timeStep) => {
    let error = target - current;

    return error * Kp;
}

`

class Exercise9 extends Exercise {
    name = "Exercise9";
    private static totalTime = Time.s(5);
    private static timeStep = Time.ms(5);
    private static initialTarget = RotationalVelocity.rps(10);

    private staticFriction = Torque.nm(0.2);
    private dynamicFriction = Torque.nm(0.1);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint();
    private motor = new RedLine();
    private wheel = new SteelFlywheel();
    private resetables: Array<Resetable> = [this.joint, this.motor];


    graphConfig = {
        yLabel: "rps",
        xLabel: "Time (s)",
        tickFormater: (value: any) => 
            isNaN(value) ? value : (value / 1000).toFixed(1).toString(),
        // riseTimeValue?: number,
        // overshootValue?: number,
        // steadyStateError?: number,
        graphKeys: ["current", "target"]
    };

    constructor() {
        super(Exercise9.totalTime, Exercise9.timeStep, starterCode, Exercise9.initialTarget.rps())

        this.joint.addInertia([
            this.wheel.inertia,
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
        let current = this.joint.current.velocity.rps();
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

        let radius = 75;
        let angle = this.joint.data[this.drawStep] ? this.joint.data[this.drawStep].position.rad() : 0;
        let {x, y} = angleToCoordinate(angle, radius);

		p5.background(255);

        p5.fill(66, 135, 245);
        p5.noStroke();
        p5.ellipse(centerX, centerY, 200, 200);

        p5.fill(66, 245, 111);
        p5.noStroke();
        p5.ellipse(centerX + x, centerY + y, 20, 20);
    }
}

export default Exercise9;