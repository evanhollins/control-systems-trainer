import Unit from "./Unit";

class Current extends Unit {
    constructor(amps: number) {
        super(amps);
    }

    static a(a: number) : Current {
        return new Current(a);
    }
}

export default Current;