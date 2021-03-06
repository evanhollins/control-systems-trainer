import Torque from './Units/Torque';
import RotationalPosition from './Units/RotationalPosition';
import RotationalVelocity from './Units/RotationalVelocity';
import RotationalAcceleration from './Units/RotationalAcceleration';
import Time from './Units/Time';
import { Resetable } from '../../Exercises/Exercise';
import RotationalFriction from './RotationalFriction';

export class RotationalState {
    position: RotationalPosition;
    velocity: RotationalVelocity;
    acceleration: RotationalAcceleration;
    torque: Torque;

    /**
     * @param p position in radians
     * @param v velocity in radians per second
     * @param a acceleration in radians per second squared
     * @param t torque in newton meters
     */
    constructor(
        p: number | RotationalPosition, 
        v: number | RotationalVelocity, 
        a: number | RotationalAcceleration,
        t: number | Torque
    ) {
        this.position = (p instanceof RotationalPosition) ? p : RotationalPosition.rad(p);
        this.velocity = (v instanceof RotationalVelocity) ? v : RotationalVelocity.radS(v);
        this.acceleration = (a instanceof RotationalAcceleration) ? a : RotationalAcceleration.radS2(a);
        this.torque = (t instanceof Torque) ? t : Torque.nm(t);
    }
};

type torqueFunction = (state: RotationalState) => Torque;
type inertiaFunction = (state: RotationalState) => number;

export class RotationalJoint implements Resetable {
    initialState?: RotationalState;
    data: Array<RotationalState>;

    torques: Array<torqueFunction>;
    inertias: Array<inertiaFunction>;
    friction?: RotationalFriction;

    constructor(initialState?: RotationalState) {
        if (initialState) {
            this.initialState = initialState;
            this.data = [initialState];
        } else {
            this.data = [{
                position: RotationalPosition.rad(0),
                velocity: RotationalVelocity.radS(0),
                acceleration: RotationalAcceleration.radS2(0),
                torque: Torque.nm(0)
            }];
        }
        
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

    reset() {
        if (this.initialState) {
            this.data = [this.initialState];
        } else {
            this.data = [{
                position: RotationalPosition.rad(0),
                velocity: RotationalVelocity.radS(0),
                acceleration: RotationalAcceleration.radS2(0),
                torque: Torque.nm(0)
            }];
        }
    }

    get current(): RotationalState {
        return this.data[this.data.length - 1]
    }

    run(deltaTime: Time) {
        let jTotal = this.inertias.reduce((accumulator, j) => {
            return accumulator + j(this.current);
        }, 0);

        let torqueTotal = this.torques.reduce((accumulator, t) => {
            return accumulator + t(this.current).nm();
        }, 0);

        if (this.friction) {
            torqueTotal += this.friction.torque(this.current.velocity, Torque.nm(torqueTotal)).nm();
        }

        let acceleration = RotationalAcceleration.radS2(torqueTotal / jTotal);
        let velocity = RotationalVelocity.radS(this.current.velocity.radS() + (acceleration.radS2() * deltaTime.s()))
        let position = RotationalPosition.rad(this.current.position.rad() + (velocity.radS() * deltaTime.s()));

        this.data.push({
            position,
            velocity,
            acceleration,
            torque: Torque.nm(torqueTotal)
        });
    }
}