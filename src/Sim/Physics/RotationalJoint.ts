import Torque from './Units/Torque';
import RotationalPosition from './Units/RotationalPosition';
import RotationalVelocity from './Units/RotationalVelocity';
import RotationalAcceleration from './Units/RotationalAcceleration';
import Time from './Units/Time';

export type RotationalState = {
    position: RotationalPosition;
    velocity: RotationalVelocity;
    acceleration: RotationalAcceleration;
};

type torqueFunction = (state: RotationalState) => Torque;
type inertiaFunction = (state: RotationalState) => number;

export class RotationalJoint {
    data: Array<RotationalState>;

    torques: Array<torqueFunction>;
    inertias: Array<inertiaFunction>;

    constructor() {
        this.data = [{
            position: RotationalPosition.rad(0),
            velocity: RotationalVelocity.radS(0),
            acceleration: RotationalAcceleration.radS2(0)
        }];
        
        this.torques = [];
        this.inertias = [];
    }

    addTorque(t: Array<torqueFunction> | torqueFunction) {
        if (Array.isArray(t)) {
            this.torques.push(...t);
        } else {
            this.torques.push(t);
        }
    }

    addInertia(i: Array<inertiaFunction> | inertiaFunction) {
        if (Array.isArray(i)) {
            this.inertias.push(...i);
        } else {
            this.inertias.push(i);
        }
    }

    run(deltaTime: Time) {
        let currentState = this.data[this.data.length - 1];

        let jTotal = this.inertias.reduce((accumulator, j) => {
            return accumulator + j(currentState);
        }, 0);

        let torqueTotal = this.torques.reduce((accumulator, t) => {
            return accumulator + t(currentState).nm();
        }, 0);

        let acceleration = RotationalAcceleration.radS2(torqueTotal / jTotal);
        let velocity = RotationalVelocity.radS(currentState.velocity.radS() + (acceleration.radS2() * deltaTime.s()))
        let position = RotationalPosition.rad(currentState.position.rad() + (velocity.radS() * deltaTime.s()));

        this.data.push({
            position,
            velocity,
            acceleration
        });
    }
}