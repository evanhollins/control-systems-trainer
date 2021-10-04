import Unit from "./Unit";

class Time extends Unit {
    protected constructor(s: number) {
        super(s);
    }

    /**
     * @param s seconds
     */
    static s(s: number): Time {
        return new Time(s);
    }

    /**
     * @returns seconds
     */
    s(): number {
        return this.value;
    }

    /**
     * @param ms milliseconds
     */
    static ms(ms: number): Time {
        return new Time(ms / 1000);
    }

    /**
     * @returns milliseconds
     */
    ms(): number {
        return this.value * 1000;
    }
}

export default Time;