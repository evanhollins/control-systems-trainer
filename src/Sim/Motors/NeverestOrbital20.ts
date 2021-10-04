import DCMotor from "../Physics/DCMotor";
import RotationalVelocity from '../Physics/Units/RotationalVelocity';
import Torque from '../Physics/Units/Torque';
import Voltage from '../Physics/Units/Voltage';
import Current from '../Physics/Units/Current';
import Length from '../Physics/Units/Length';
import Mass from '../Physics/Units/Mass';

export default class NeverestOrbital20 extends DCMotor {
    private static operatingVoltage = Voltage.v(12);
    private static stallTorque = Torque.oz_in(175);
    private static stallCurrent = Current.a(11.5);
    private static breakawayTorque = Torque.oz_in(6.4);
    private static noLoadSpeed = RotationalVelocity.rpm(340);
    private static noLoadCurrent = Current.a(0.2);
    private static rotorRadius = Length.mm(12);
    private static rotorMass = Mass.g(83);
    private static gearRatio = 19.2;

    constructor() {
        super(
            NeverestOrbital20.operatingVoltage,
            NeverestOrbital20.stallTorque,
            NeverestOrbital20.stallCurrent,
            NeverestOrbital20.breakawayTorque,
            NeverestOrbital20.noLoadSpeed,
            NeverestOrbital20.noLoadCurrent,
            NeverestOrbital20.rotorRadius,
            NeverestOrbital20.rotorMass,
            NeverestOrbital20.gearRatio
        )
    }

}
