import Unit from "./Unit";

class RotationalVelocity extends Unit {
    private static rps_to_radS = 2 * Math.PI;
    private static rpm_to_radS = 2 * Math.PI / 60;

    protected constructor(radS: number) {
        super(radS);
    }

    /**
     * @param radS radians per second
     */
    static radS(radS: number): RotationalVelocity {
        return new RotationalVelocity(radS);
    }

    /**
     * @returns radians per second
     */
    radS(): number {
        return this.value;
    }

    /**
     * @param rps rotations per second
     */
    static rps(rps: number): RotationalVelocity {
        return new RotationalVelocity(rps * RotationalVelocity.rps_to_radS);
    }

    /**
     * @returns rotations per second
     */
    rps(): number {
        return this.value / RotationalVelocity.rps_to_radS;
    }

    /**
     * @param rpm rotations per minute
     */
    static rpm(rpm: number): RotationalVelocity {
        return new RotationalVelocity(rpm * RotationalVelocity.rpm_to_radS);
    }

    /**
     * @returns rotations per minute
     */
    rpm(): number {
        return this.value / RotationalVelocity.rpm_to_radS;
    }
}

export default RotationalVelocity;