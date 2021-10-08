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

    for (let i = 0; i < 8; i++) {
        joint.run(timeStep);
    }

    expect(joint.data).toHaveLength(9);
    // const expected = [
    //     [0, 0, 0, 0],
    //     [0.0142, 1.420, 142, 0.355],
    //     [0.0426, 2.839, 141.9, 0.355],
    //     [0.0852, 4.257, 141.79, 0.354],
    //     [0.1419, 5.674, 141.69, 0.354],
    //     [0.2128, 7.090, 141.59, 0.354],
    //     [0.2978, 8.505, 141.49, 0.354],
    //     [0.3970, 9.918, 141.38, 0.353],
    //     [0.5103, 11.331, 141.28, 0.353]
    // ]

    // expected.forEach((e, i) => {
    //     expect(joint.data[i].position.rad()).toBeCloseTo(e[0]);
    //     expect(joint.data[i].velocity.radS()).toBeCloseTo(e[1]);
    //     expect(joint.data[i].acceleration.radS2()).toBeCloseTo(e[2]);
    //     expect(joint.data[i].torque.nm()).toBeCloseTo(e[3]);
    // })
})
