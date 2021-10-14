import NeverestOrbital20 from "../Sim/Motors/NeverestOrbital20";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import RotationalPosition from "../Sim/Physics/Units/RotationalPosition";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import Arm from "../Sim/Wheels/Arm";
import { Exercise, Resetable } from "./Exercise";
import p5Type from "p5";

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
    private static totalTime = Time.s(10);
    private static timeStep = Time.ms(10);
    private static initialTarget = RotationalPosition.deg(180);

    private staticFriction = Torque.nm(0.2);
    private dynamicFriction = Torque.nm(0.1);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint();
    private motor = new NeverestOrbital20();
    private arm = new Arm();
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

    }
}

export default Exercise2;