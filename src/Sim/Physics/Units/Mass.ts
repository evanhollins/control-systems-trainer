import Unit from "./Unit";

class Mass extends Unit {
    private static lbs_to_kg = 0.4536;

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
     * @param g grams
     */
    static g(g: number): Mass {
        return new Mass(g / 1000);
    }

    /**
     * @returns grams
     */
    g(): number {
        return this.value * 1000;
    }

    /**
     * @param lbs pounds
     */
    static lbs(lbs: number): Mass {
        return new Mass(lbs * Mass.lbs_to_kg);
    }

    /**
     * @returns pounds
     */
    lbs(): number {
        return this.value / Mass.lbs_to_kg;
    }
}

export default Mass;