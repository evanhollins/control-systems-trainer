import Unit from "./Unit";

class Length extends Unit {
    protected constructor(meters: number) {
        super(meters)
    }

    /**
     * @param m meters
     */
    static m(m: number): Length {
        return new Length(m);
    }

    /**
     * @returns meters
     */
    m(): number {
        return this.value
    }

    /**
     * @param mm millimetres
     */
    static mm(mm: number): Length {
        return new Length(mm / 1000);
    }

    /**
     * @returns millimetres
     */
    mm(): number {
        return this.value * 1000;
    }

}

export default Length;