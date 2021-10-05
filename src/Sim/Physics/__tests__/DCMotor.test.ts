import DCMotor from "../DCMotor";
import RotationalVelocity from '../Units/RotationalVelocity';
import Torque from '../Units/Torque';
import Voltage from '../Units/Voltage';
import Current from '../Units/Current';
import Length from '../Units/Length';
import Mass from '../Units/Mass';
import { RotationalState } from "../RotationalJoint";

// Parameters for Andymark Neverest orbital 20
let operatingVoltage = Voltage.v(12);
let stallTorque = Torque.oz_in(175);
let stallCurrent = Current.a(11.5);
let breakawayTorque = Torque.oz_in(6.4);
let noLoadSpeed = RotationalVelocity.rpm(340);
let noLoadCurrent = Current.a(0.2);
let rotorRadius = Length.mm(12);
let rotorMass = Mass.g(83);
let gearRatio = 19.2;

let dcMotor = new DCMotor(
    operatingVoltage,
    stallTorque,
    stallCurrent,
    breakawayTorque,
    noLoadSpeed,
    noLoadCurrent,
    rotorRadius,
    rotorMass,
    gearRatio
)

it('calculates inertia correctly', () => {
    expect(dcMotor.inertia()).toBeCloseTo(0.0022)
})

test.each([
    [1, 0, 1.236],
    [1, 340, 0],
    [1, 250, 0.327],
    [1, 150, 0.691],
    [0.5, 0, 0.618],
    [0.5, 340, 0],
    [0.5, 200, 0.254]
])("Calculates torque at %i volts and %i rpm", (v, rpm, t) => {
    dcMotor.setPower(v);
    let state = new RotationalState(1, RotationalVelocity.rpm(rpm), 0, 0);
    expect(dcMotor.torque(state).nm()).toBeCloseTo(t)
})