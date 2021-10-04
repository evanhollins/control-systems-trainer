import RotationalVelocity from './RotationalVelocity';
import Torque from './Torque';
import Voltage from './Voltage';
import Current from './Current';
import Length from './Length';
import Mass from './Mass';

class DCMotor {
    operatingVoltage: Voltage;
    stallTorque: Torque;
    stallCurrent: Current;
    breakawayTorque: Torque;
    noLoadSpeed: RotationalVelocity;
    noLoadCurrent: Current;
    rotorRadius: Length;
    rotorMass: Mass;
    gearRatio: number;
    torqueConstant: number;
    suppliedVoltage: Voltage;

    /**
     * @param {Voltage} operatingVoltage Rated operating voltage
     * @param {Torque} stallTorque Torque when motor is stalled at operating voltage
     * @param {Current} stallCurrent Current when motor is stalled at operating voltage
     * @param {Torque} breakawayTorque Torque required to overcome static friction
     * @param {RotationalVelocity} noLoadSpeed Rotational velocity with no load at operating voltage
     * @param {Current} noLoadCurrent Current with no load at operating voltage
     * @param {Length} rotorRadius Radius of the internal rotor
     * @param {Mass} rotorMass Mass of the internal rotor
     * @param {Number} gearRatio Ratio of built in gearbox (motor revs/output revs)
     */
    constructor(
        operatingVoltage: Voltage,
        stallTorque: Torque,
        stallCurrent: Current,
        breakawayTorque: Torque,
        noLoadSpeed: RotationalVelocity,
        noLoadCurrent: Current,
        rotorRadius: Length,
        rotorMass: Mass,
        gearRatio: number
    ) {
        this.operatingVoltage = operatingVoltage;
        this.stallTorque = stallTorque;
        this.stallCurrent = stallCurrent;
        this.breakawayTorque = breakawayTorque;
        this.noLoadSpeed = noLoadSpeed;
        this.noLoadCurrent = noLoadCurrent;
        this.rotorRadius = rotorRadius;
        this.rotorMass = rotorMass;
        this.gearRatio = gearRatio;

        this.torqueConstant = this.stallTorque.value / this.noLoadSpeed.value;

        this.suppliedVoltage = Voltage.v(0);
    }

    inertia(): number {
        // Assume rotor is a solid cylinder
        let rotorInertia = 0.5 * this.rotorMass.value * Math.pow(this.rotorRadius.value, 2);

        // Translate inertia through gearbox
        let motorInertia = rotorInertia * Math.pow(this.gearRatio, 2)

        return motorInertia;
    }

    /**
     * Calculate the output torque of the motor given current
     * rotational velocity and input voltage. Currently ignores motor
     * inductance.
     */
    torque(rotationalVelocity: RotationalVelocity): Torque {
        let percentVoltage = this.suppliedVoltage.value / this.operatingVoltage.value;
        let fullVoltageTorque = this.stallTorque.value - (rotationalVelocity.value * this.torqueConstant);

        return Torque.nm(fullVoltageTorque * percentVoltage);
    }


}

export default DCMotor;
