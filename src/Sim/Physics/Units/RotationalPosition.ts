import Unit from "./Unit";

class RotationalPosition extends Unit {
    private static conversion = Math.PI * 2 / 360;

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
        return new RotationalPosition(deg * RotationalPosition.conversion);
    }

    /**
     * @returns degrees
     */
    deg(): number {
        return this.value / RotationalPosition.conversion;
    }
}

export default RotationalPosition;