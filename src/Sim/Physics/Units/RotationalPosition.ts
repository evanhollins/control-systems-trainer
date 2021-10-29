import Unit from "./Unit";

class RotationalPosition extends Unit {
    private static deg2rad = Math.PI * 2 / 360;
    private static rot2rad = Math.PI * 2;

    /**
     * @param rad Radians
     */
    protected constructor(rad: number) {
        super(rad);
    }

    /**
     * @param rad radians
     * @returns {RotationalPosition}
     */
    static rad(rad: number): RotationalPosition {
        return new RotationalPosition(rad);
    }

    /**
     * @returns radians
     */
    rad(): number {
        return this.value;
    }

    static deg(deg: number): RotationalPosition {
        return new RotationalPosition(deg * RotationalPosition.deg2rad);
    }

    /**
     * @returns degrees
     */
    deg(): number {
        return this.value / RotationalPosition.deg2rad;
    }

    /**
     * @param rot rotations
     * @returns {RotationalPosition}
     */
    static rot(rot: number): RotationalPosition {
        return new RotationalPosition(rot * RotationalPosition.rot2rad);
    }

    /**
     * @returns rotations
     */
    rot(): number {
        return this.value / RotationalPosition.rot2rad;
    }
}

export default RotationalPosition;