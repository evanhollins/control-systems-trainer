import NeverestOrbital20 from "../Sim/Motors/NeverestOrbital20";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import RotationalPosition from "../Sim/Physics/Units/RotationalPosition";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import Mass from "../Sim/Physics/Units/Mass";
import Length from "../Sim/Physics/Units/Length";
import { Exercise, Resetable } from "./Exercise";
import p5Type from "p5";
import { RodAboutEnd } from "../Sim/Physics/MomentOfInertia";
import { angleToCoordinate } from '../Utility';

const starterCode = `
/*
* Your control system!
*
* You are trying to point an arm at a particular angle using a Neverest
* orbital 20.
* 
* Your control system is handed two things, a target angle in degrees
* and a current angle in degrees. Based on those, you must decide what
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
(target, current) => {
    if (current < target) {
        return 1;
    } else {
        return -1;
    }
}

`

class Exercise2 extends Exercise {
    name = "Exercise2";
    private static totalTime = Time.s(3);
    private static timeStep = Time.ms(5);
    private static initialTarget = RotationalPosition.deg(180);

    private staticFriction = Torque.nm(0.2);
    private dynamicFriction = Torque.nm(0.1);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint();
    private motor = new NeverestOrbital20();
    private arm = new RodAboutEnd(Mass.g(100), Length.mm(300));
    private resetables: Array<Resetable> = [this.joint, this.motor];

    graphConfig = {
        yLabel: "degrees",
        xLabel: "Time (s)",
        tickFormater: (value: any) => 
            isNaN(value) ? value : (value / 1000).toFixed(1).toString(),
        // riseTimeValue?: number,
        // overshootValue?: number,
        // steadyStateError?: number,
        graphKeys: ["current", "target"]
    };

    constructor() {
        super(Exercise2.totalTime, Exercise2.timeStep, starterCode, Exercise2.initialTarget.deg())

        this.joint.addInertia([
            this.arm.inertia,
            this.motor.inertia
        ]);
        this.joint.addTorque([
            this.motor.torque
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
        let current = this.joint.current.position.deg();
        let setPoint = this.controlSystem(this.target, current);
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

        let armLength = 200;
        let angle = this.joint.data[this.drawStep].position.rad();
        let {x, y} = angleToCoordinate(angle, armLength);

		p5.background(255);

        // Coordinate system
        p5.push();
        p5.strokeWeight(1);
        p5.stroke(100);
        p5.line(centerX, 0, centerX, p5.height);
        p5.line(0, centerY, p5.width, centerY);
        p5.pop();
        
        // Text
        p5.push();
        p5.textAlign("center", "center");
        p5.textSize(36);
        p5.fill(255, 0, 0);
        p5.text("N", centerX, 50);
        p5.fill(0);
        p5.text("S", centerX, p5.height - 50);
        p5.text("W", 50, centerY);
        p5.text("E", p5.width - 50, centerY);

        p5.pop();

        // Wires
        p5.push();
        p5.strokeWeight(5);
        p5.stroke(0);
        p5.line(centerX - 2, centerY, centerX - 2, centerY - 100);
        p5.stroke(255, 0, 0);
        p5.line(centerX + 2, centerY, centerX + 2, centerY - 100);
        p5.pop();

        // Motor outline
        p5.push();
        p5.stroke(0);
        p5.fill(255);
        p5.strokeWeight(3);
        p5.ellipse(centerX, centerY, 100, 100);
        p5.pop();

        // Bolt holes
        p5.push();
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.ellipse(centerX - 35, centerY, 8, 8);
        p5.ellipse(centerX + 35, centerY, 8, 8);
        p5.ellipse(centerX, centerY - 35, 8, 8);
        p5.ellipse(centerX, centerY + 35, 8, 8);
        p5.pop();

        // Arm
        p5.push();
        p5.stroke(p5.GRAY);
        p5.strokeWeight(20);
        p5.strokeCap("square");
        p5.line(centerX, centerY, centerX + x, centerY + y);
        p5.pop();

        // Motor shaft
        p5.push();
        p5.fill(0);
        p5.noStroke();
        p5.ellipse(centerX, centerY, 10, 10);
        p5.pop();
    }
}

export default Exercise2;