import Unit from "./Unit";

class Voltage extends Unit {
    protected constructor(volts: number) {
        super(volts)
    }

    /**
     * @param {Number} v volts
     * @returns {Voltage}
     */
    static v(v: number): Voltage {
        return new Voltage(v);
    }

    /**
     * @returns volts
     */
    v(): number {
        return this.value;
    }
}

export default Voltage