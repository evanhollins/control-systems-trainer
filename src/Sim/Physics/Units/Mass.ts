import Unit from "./Unit";

class Mass extends Unit {
    protected constructor(kg: number) {
        super(kg);
    }

    /**
     * @param kg kilograms
     */
    static kg(kg: number): Mass {
        return new Mass(kg);
    }

    /**
     * @returns meters
     */
    kg(): number {
        return this.value;
    }

    /**
     * @param  g grams
     */
    static g(g: number): Mass {
        return new Mass(g / 1000);
    }

    g(): number {
        return this.value * 1000;
    }
}

export default Mass;