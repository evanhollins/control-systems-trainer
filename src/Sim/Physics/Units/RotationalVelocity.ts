import Unit from "./Unit";

class RotationalVelocity extends Unit {
    protected constructor(rps: number) {
        super(rps);
    }

    /**
     * @param rps rotations per second
     */
    static rps(rps: number): RotationalVelocity {
        return new RotationalVelocity(rps);
    }

    /**
     * @returns rotations per second
     */
    rps(): number {
        return this.value;
    }

    /**
     * @param rpm rotations per minute
     */
    static rpm(rpm: number): RotationalVelocity {
        return new RotationalVelocity(rpm / 60);
    }

    /**
     * @returns rotations per minute
     */
    rpm(): number {
        return this.value * 60;
    }
}

export default RotationalVelocity;