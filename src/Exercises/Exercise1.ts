import RedLine from "../Sim/Motors/RedLine";
import RotationalFriction from "../Sim/Physics/RotationalFriction";
import { RotationalJoint } from "../Sim/Physics/RotationalJoint";
import RotationalVelocity from "../Sim/Physics/Units/RotationalVelocity";
import Time from "../Sim/Physics/Units/Time";
import Torque from "../Sim/Physics/Units/Torque";
import SteelFlywheel from "../Sim/Wheels/SteelFlywheel";
import { Exercise, Resetable } from "./Exercise";

const starterCode = `
function runControlSystem(target, current) {
    return 0;
}

window.runControlSystem = runControlSystem;
`

class Exercise1 extends Exercise {
    private static totalTime = Time.s(10);
    private static timeStep = Time.ms(100);

    private staticFriction = Torque.nm(0.2);
    private dynamicFriction = Torque.nm(0.1);
    private friction = new RotationalFriction(this.staticFriction, this.dynamicFriction);
    private joint = new RotationalJoint();
    private motor = new RedLine();
    private wheel = new SteelFlywheel();
    private resetables: Array<Resetable> = [this.joint, this.motor];

    private target: RotationalVelocity;


    constructor() {
        super(Exercise1.totalTime, Exercise1.timeStep, starterCode)

        this.joint.addInertia([
            this.wheel.inertia.bind(this.wheel),
            this.motor.inertia.bind(this.motor)
        ]);
        this.joint.addTorque([
            this.motor.torque.bind(this.motor),
            this.friction.torque.bind(this.friction)
        ])

        this.target = RotationalVelocity.rps(10);
    }

    reset() {
        super.reset();
        for (let resetable of this.resetables) {
            resetable.reset();
        }
    }

    runStep(currentTime: Time) {
        let current = this.joint.current.velocity.rps();
        let setPoint = this.controlSystem(this.target.rps(), current);
        this.motor.setPower(setPoint);
        this.joint.run(this.timeStep);

        this.data.push({
            time: currentTime.ms(),
            target: this.target.rps(),
            current,
            setPoint
        })
    }
}

export default Exercise1;