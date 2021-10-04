import Unit from "./Unit";

class RotationalVelocity extends Unit {
    constructor(rps: number) {
        super(rps);
    }

    /**
     * 
     * @param {Number} rps revolutions per second
     * @returns {RotationalVelocity}
     */
    static rps(rps: number): RotationalVelocity {
        return new RotationalVelocity(rps);
    }

    /**
     * 
     * @param {Number} rpm revolutions per minute
     * @returns {RotationalVelocity}
     */
    static rpm(rpm: number): RotationalVelocity {
        return new RotationalVelocity(rpm / 60);
    }
}

export default RotationalVelocity;