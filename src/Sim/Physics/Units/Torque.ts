import Unit from './Unit';

class Torque extends Unit {
    private static ozIn_to_nm = 0.007062;
    private static lbFt_to_nm = 1.35584;

    protected constructor(nm: number) {
        super(nm)
    }

    /**
     * @param nm newton meters
     */
    static nm(nm: number): Torque {
        return new Torque(nm);
    }

    /**
     * @returns newton meters
     */
    nm(): number {
        return this.value;
    }

    /**
     * @param oz_in Ounce inches
     */
    static oz_in(oz_in: number): Torque {
        return new Torque(oz_in * Torque.ozIn_to_nm);
    }

    /**
     * @returns ounce inches
     */
    oz_in(): number {
        return this.value / Torque.ozIn_to_nm;
    }

    /**
     * @param lb_ft Pound*feet
     */
    static lb_ft(lb_ft: number): Torque {
        return new Torque(lb_ft * Torque.lbFt_to_nm);
    }

    /**
     * @returns pound feet
     */
    lb_ft(): number {
        return this.value / Torque.lbFt_to_nm;
    }
}

export default Torque;