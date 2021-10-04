import Unit from "./Unit";

class Mass extends Unit {
    constructor(kg: number) {
        super(kg);
    }

    /**
     * @param {Number} kg kilograms
     * @returns {Mass}
     */
    static kg(kg: number): Mass {
        return new Mass(kg);
    }

    /**
     * @param {Number} g grams
     * @returns {Mass}
     */
    static g(g: number): Mass {
        return new Mass(g / 1000);
    }
}

export default Mass;