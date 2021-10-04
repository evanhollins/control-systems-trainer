import Unit from "./Unit";

class RotationalAcceleration extends Unit {
    protected constructor(radS2: number) {
        super(radS2)
    }

    /**
     * @param radS2 radians per second squared
     */
    static radS2(radS2: number): RotationalAcceleration {
        return new RotationalAcceleration(radS2);
    }

    /**
     * @returns radS2 radians per second squared
     */
    radS2() {
        return this.value;
    }
}

export default RotationalAcceleration;