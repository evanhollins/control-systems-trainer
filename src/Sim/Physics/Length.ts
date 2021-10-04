import Unit from "./Unit";

class Length extends Unit {
    constructor(meters: number) {
        super(meters)
    }

    /**
     * @param {Number} m Meters
     * @returns Length
     */
    static m(m: number): Length {
        return new Length(m);
    }

    /**
     * @param {Number} mm Millimetres
     * @returns Length
     */
    static mm(mm: number): Length {
        return new Length(mm / 1000);
    }
}

export default Length;