import RedLine from "../Motors/RedLine";
import SteelFlywheel from "../Wheels/SteelFlywheel"
import { RotationalJoint } from "../Physics/RotationalJoint";
import RotationalFriction from "../Physics/RotationalFriction";
import Torque from "../Physics/Units/Torque";
import Time from "../Physics/Units/Time";

const motor = new RedLine();
const wheel = new SteelFlywheel();

const staticFriction = Torque.nm(0.1)
const dynamicFriction = Torque.nm(0.05);
const friction = new RotationalFriction(staticFriction, dynamicFriction);

let joint = new RotationalJoint();
joint.addTorque(motor.torque.bind(motor));
joint.addInertia(wheel.inertia.bind(wheel));

it('simulates correctly', () => {
    const timeStep = Time.ms(10);

    motor.setPower(0.5);

    for (let i = 0; i < 10; i++) {
        joint.run(timeStep);
    }

    expect(joint.data).toHaveLength(11);
    // console.log(joint.data)
})