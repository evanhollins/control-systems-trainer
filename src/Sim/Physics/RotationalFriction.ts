import Torque from './Units/Torque';
import { RotationalState } from './RotationalJoint';

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
    torque(state: RotationalState): Torque {
        if (state.velocity.radS() === 0 && Math.abs(state.torque.nm()) <= this.staticFriction.nm()) {
            return state.torque.negate();
        } else {
            return state.torque.isPositive() ? this.dynamicFriction.negate() : this.dynamicFriction;
        }
    }
}

export default RotationalFriction;