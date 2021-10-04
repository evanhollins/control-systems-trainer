import Unit from "./Unit";

class Voltage extends Unit {
    constructor(volts: number) {
        super(volts)
    }

    /**
     * @param {Number} v volts
     * @returns {Voltage}
     */
    static v(v: number): Voltage {
        return new Voltage(v);
    }
}

export default Voltage