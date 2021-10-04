import DCMotor from "../Physics/DCMotor";
import RotationalVelocity from '../Physics/Units/RotationalVelocity';
import Torque from '../Physics/Units/Torque';
import Voltage from '../Physics/Units/Voltage';
import Current from '../Physics/Units/Current';
import Length from '../Physics/Units/Length';
import Mass from '../Physics/Units/Mass';


export default class RedLine extends DCMotor {
    private static operatingVoltage = Voltage.v(12);
    private static stallTorque = Torque.nm(0.71);
    private static stallCurrent = Current.a(134);
    private static breakawayTorque = Torque.nm(0.05);
    private static noLoadSpeed = RotationalVelocity.rpm(18700);
    private static noLoadCurrent = Current.a(0.7);
    private static rotorRadius = Length.mm(12.5);
    private static rotorMass = Mass.lbs(0.5);
    private static gearRatio = 1;

    constructor() {
        super(
            RedLine.operatingVoltage,
            RedLine.stallTorque,
            RedLine.stallCurrent,
            RedLine.breakawayTorque,
            RedLine.noLoadSpeed,
            RedLine.noLoadCurrent,
            RedLine.rotorRadius,
            RedLine.rotorMass,
            RedLine.gearRatio
        )
    }

}
