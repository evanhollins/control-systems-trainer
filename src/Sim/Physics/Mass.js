import Unit from "./Unit";

class Mass extends Unit {
    constructor(kg) {
        super(kg);
    }

    /**
     * @param {Number} kg kilograms
     * @returns {Mass}
     */
    static kg(kg) {
        return new Mass(kg);
    }

    /**
     * @param {Number} g grams
     * @returns {Mass}
     */
    static g(g) {
        return new Mass(g / 1000);
    }
}

export default Mass;