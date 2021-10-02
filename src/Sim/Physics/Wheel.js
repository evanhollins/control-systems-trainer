import Mass from './Mass';
import Length from './Length';

/**
 * Creates a "wheel" simulated as a solid cylinder to hand to a motor.
 * 
 * @param {Length} Radius
 * @param {Mass} Mass
 */
class Wheel {
    constructor(radius, mass) {
        this.radius = radius;
        this.mass = mass;
    }

    inertia() {
        return 0.5 * this.mass.value * Math.pow(this.radius.value, 2);
    }
}

export default Wheel;