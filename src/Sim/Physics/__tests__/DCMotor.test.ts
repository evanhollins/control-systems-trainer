import DCMotor from "../DCMotor";
import RotationalVelocity from '../Units/RotationalVelocity';
import Torque from '../Units/Torque';
import Voltage from '../Units/Voltage';
import Current from '../Units/Current';
import Length from '../Units/Length';
import Mass from '../Units/Mass';

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
    [12, 0, 1.236],
    [12, 340, 0],
    [12, 250, 0.327],
    [12, 150, 0.691],
    [6, 0, 0.618],
    [6, 340, 0],
    [6, 200, 0.254]
])("Calculates torque at %i volts and %i rpm", (v, rpm, t) => {
    dcMotor.suppliedVoltage = Voltage.v(v);
    expect(dcMotor.torque(RotationalVelocity.rpm(rpm)).nm()).toBeCloseTo(t)
})