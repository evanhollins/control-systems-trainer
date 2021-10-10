import RedLine from "../Sim/Motors/RedLine";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import RotationalVelocity from "../Sim/Physics/Units/RotationalVelocity";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import SteelFlywheel from "../Sim/Wheels/SteelFlywheel";
import { Exercise, Resetable } from "./Exercise";

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
function runControlSystem(target, current) {
    return 0;
}

window.runControlSystem = runControlSystem;
`

class Exercise1 extends Exercise {
    private static totalTime = Time.s(10);
    private static timeStep = Time.ms(100);
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
        super(Exercise1.totalTime, Exercise1.timeStep, starterCode, Exercise1.initialTarget.rps())

        this.joint.addInertia([
            this.wheel.inertia.bind(this.wheel),
            this.motor.inertia.bind(this.motor)
        ]);
        this.joint.addTorque([
            this.motor.torque.bind(this.motor),
        ])
        this.joint.friction = this.friction;
    }

    reset() {
        super.reset();
        for (let resetable of this.resetables) {
            resetable.reset();
        }
    }

    runStep(currentTime: Time) {
        let current = this.joint.current.velocity.rps();
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
}

export default Exercise1;