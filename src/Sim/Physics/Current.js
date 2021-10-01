import Unit from "./Unit";

class Current extends Unit {
  constructor(amps) {
    super(amps);
  }

  /**
   * @param {Number} a amps
   * @returns {Current}
   */
  static a(a) {
    return new Current(a);
  }
}

export default Current;