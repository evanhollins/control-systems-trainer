import RotationalVelocity from './Units/RotationalVelocity';
import Torque from './Units/Torque';
import Voltage from './Units/Voltage';
import Current from './Units/Current';
import Length from './Units/Length';
import Mass from './Units/Mass';
import { RotationalState } from './RotationalJoint';
import { Resetable } from '../../Exercises/Exercise';
import { clamp } from "../../Utility";

class DCMotor implements Resetable {
    private operatingVoltage: Voltage;
    private stallTorque: Torque;
    private stallCurrent: Current;
    private breakawayTorque: Torque;
    private noLoadSpeed: RotationalVelocity;
    private noLoadCurrent: Current;
    private rotorRadius: Length;
    private rotorMass: Mass;
    private gearRatio: number;
    private torqueConstant: number;
    private suppliedVoltage: Voltage;

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

        this.torqueConstant = this.stallTorque.nm() / this.noLoadSpeed.rps();

        this.suppliedVoltage = Voltage.v(0);

        this.reset = this.reset.bind(this);
        this.setPower = this.setPower.bind(this);
        this.inertia = this.inertia.bind(this);
        this.torque = this.torque.bind(this);
    }

    reset() {
        this.suppliedVoltage = Voltage.v(0);
    }

    setPower(power: number) {
        power = clamp(power, -1, 1);
        this.suppliedVoltage = Voltage.v(this.operatingVoltage.v() * power);
    }

    inertia(): number {
        // Assume rotor is a solid cylinder
        let rotorInertia = 0.5 * this.rotorMass.kg() * Math.pow(this.rotorRadius.m(), 2);

        // Translate inertia through gearbox
        let motorInertia = rotorInertia * Math.pow(this.gearRatio, 2)

        return motorInertia;
    }

    /**
     * Calculate the output torque of the motor given current
     * rotational velocity and input voltage. Currently ignores motor
     * inductance.
     */
    torque(state: RotationalState): Torque {
        let percentVoltage = this.suppliedVoltage.v() / this.operatingVoltage.v();
        let fullVoltageTorque = this.stallTorque.nm() - (state.velocity.rps() * this.torqueConstant);

        return Torque.nm(fullVoltageTorque * percentVoltage);
    }


}

export default DCMotor;
