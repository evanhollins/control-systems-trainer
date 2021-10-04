import Torque from './Torque';
import RotationalVelocity from './RotationalVelocity';

class RotationalFriction {
    staticFriction: Torque;
    dynamicFriction: Torque;

    constructor(staticFriction: Torque, dynamicFriction: Torque) {
        this.staticFriction = staticFriction;
        this.dynamicFriction = dynamicFriction;
    }

    /**
     * Get reaction torque at an rpm. Includes torque
     * applied to correctly handle static torque.
     */
    get(rps: RotationalVelocity, torqueApplied: Torque): Torque {
        if (rps.value === 0 && Math.abs(torqueApplied.value) <= this.staticFriction.value) {
            return torqueApplied.negate();
        } else {
            return torqueApplied.isPositive() ? this.dynamicFriction.negate() : this.dynamicFriction;
        }
    }
}

export default RotationalFriction;