import Torque from './Units/Torque';
import RotationalVelocity from './Units/RotationalVelocity';

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
    torque(velocity: RotationalVelocity, torque: Torque): Torque {
        if (velocity.radS() === 0 && Math.abs(torque.nm()) <= this.staticFriction.nm()) {
            return torque.negate();
        } else {
            return torque.isPositive() ? this.dynamicFriction.negate() : this.dynamicFriction;
        }
    }
}

export default RotationalFriction;