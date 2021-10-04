import Torque from './Units/Torque';
import RotationalVelocity from './Units/RotationalVelocity';

class RotationalJoint {
    position: Array<number>;
    velocity: Array<number>;
    acceleration: Array<number>;

    torques: Array<(position: number, velocity: number, acceleration: number) => Torque>;
    inertias: Array<(position: number, velocity: number, acceleration: number) => number>;

    constructor() {
        this.position = [0];
        this.velocity = [0];
        this.acceleration = [0];
        
        this.torques = [];
        this.inertias = [];
    }

    run(deltaTime: Number) {

    }
}

export default RotationalJoint;