import RotationalFriction from "../RotationalFriction";
import { RotationalState } from "../RotationalJoint";
import RotationalVelocity from "../Units/RotationalVelocity";
import Torque from "../Units/Torque";

let rf = new RotationalFriction(Torque.nm(1), Torque.nm(0.5));
let rps = RotationalVelocity.rps(0);

it('constructs correctly', () => {
    expect(rf.staticFriction.value).toBe(1);
    expect(rf.dynamicFriction.value).toBe(0.5);
})

it('calculates correctly when not spinning and applying less than static torque', () => {
    expect(
        rf.torque(new RotationalState(0, rps, 0, 0.75))
            .equals(Torque.nm(-0.75))
    ).toBe(true);
    expect(
        rf.torque(new RotationalState(0, rps, 0, -0.75))
            .equals(Torque.nm(0.75))
    ).toBe(true);
})

it('calculates correctly when not spinning and applied torque is greater than static', () => {
    expect(
        rf.torque(new RotationalState(0, rps, 0, 1.5))
            .equals(Torque.nm(-0.5))
    ).toBe(true);

    expect(
        rf.torque(new RotationalState(0, rps, 0, -1.5))
            .equals(Torque.nm(0.5))
    ).toBe(true);
})

it('calculates correctly when spinning', () => {
    rps = RotationalVelocity.rps(10);

    expect(
        rf.torque(new RotationalState(0, rps, 0, 1.5))
            .equals(Torque.nm(-0.5))
    ).toBe(true);

    expect(
        rf.torque(new RotationalState(0, rps, 0, -1.5))
            .equals(Torque.nm(0.5))
    ).toBe(true);
})