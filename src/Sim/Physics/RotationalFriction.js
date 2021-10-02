import Torque from './Torque';
import RotationalVelocity from './RotationalVelocity';

class RotationalFriction {
    /**
     * @param {Torque} staticFriction 
     * @param {Torque} dynamicFriction 
     */
    constructor(staticFriction, dynamicFriction) {
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;
    }

    /**
     * Get reaction torque at an rpm. Includes torque
     * applied to correctly handle static torque.
     * 
     * @param {RotationalVelocity} rps Revolutions per second
     * @param {Torque} torqueApplied
     * @returns {Torque} Reaction torque
     */
    get(rps, torqueApplied) {
        if (rps.value === 0 && Math.abs(torqueApplied.value) <= this.staticFriction.value) {
            return torqueApplied.negate();
        } else {
            return torqueApplied.isPositive() ? this.dynamicFriction.negate() : this.dynamicFriction;
        }
    }
}

export default RotationalFriction;