import {RotationalJoint, RotationalState} from "../RotationalJoint";
import Torque from "../Units/Torque";
import Time from "../Units/Time";
import RotationalPosition from "../Units/RotationalPosition";
import RotationalVelocity from "../Units/RotationalVelocity";
import RotationalAcceleration from "../Units/RotationalAcceleration";


it('constructs correctly', () => {
    let testTorque = (state: RotationalState) => {
        return Torque.nm(1);
    }

    let testInertia = (state: RotationalState) => {
        return 10;
    }

    let joint = new RotationalJoint();

    joint.addTorque(testTorque);
    joint.addInertia(testInertia);
    expect(joint.torques).toHaveLength(1);
    expect(joint.inertias).toHaveLength(1);

    joint.addTorque([testTorque, testTorque]);
    joint.addInertia([testInertia, testInertia]);
    expect(joint.torques).toHaveLength(3);
    expect(joint.inertias).toHaveLength(3);
});

it('basic rotational joint calculates state correctly', () => {
    const testTorque = (state: RotationalState) => {
        return Torque.nm(10);
    }
    const testInertia = (state: RotationalState) => {
        return 10;
    }
    let joint = new RotationalJoint();
    joint.addTorque(testTorque);
    joint.addInertia(testInertia);

    for (let i = 0; i < 5; i++) {
        joint.run(Time.s(1));
    }

    const expected = [
        [0, 0, 0, 0],
        [1, 1, 1, 10],
        [3, 2, 1, 10],
        [6, 3, 1, 10],
        [10, 4, 1, 10],
        [15, 5, 1, 10]
    ].map(x => {
        return new RotationalState(x[0], x[1], x[2], x[3]);
    });

    expect(joint.data).toMatchObject(expected);
})