import Unit from "./Unit";

class Current extends Unit {
    protected constructor(amps: number) {
        super(amps);
    }

    /**
     * @param a amps
     */
    static a(a: number) : Current {
        return new Current(a);
    }

    /**
     * @returns amps
     */
    a(): number {
        return this.value;
    }
}

export default Current;