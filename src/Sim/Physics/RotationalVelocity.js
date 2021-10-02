import Unit from "./Unit";

class RotationalVelocity extends Unit {
    constructor(rps) {
        super(rps);
    }

    /**
     * 
     * @param {Number} rps revolutions per second
     * @returns {RotationalVelocity}
     */
    static rps(rps) {
        return new RotationalVelocity(rps);
    }

    /**
     * 
     * @param {Number} rpm revolutions per minute
     * @returns {RotationalVelocity}
     */
    static rpm(rpm) {
        return new RotationalVelocity(rpm / 60);
    }
}

export default RotationalVelocity;