import Mass from './Units/Mass';
import Length from './Units/Length';

/**
 * Creates a "wheel" simulated as a solid cylinder to hand to a motor.
 */
class Wheel {
    radius: Length;
    mass: Mass;

    constructor(radius: Length, mass: Mass) {
        this.radius = radius;
        this.mass = mass;
    }

    inertia(): number {
        return 0.5 * this.mass.value * Math.pow(this.radius.value, 2);
    }
}

export default Wheel;