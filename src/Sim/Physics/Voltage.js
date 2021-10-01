import Unit from "./Unit";

class Voltage extends Unit {
  constructor(volts) {
    super(volts)
  }

  /**
   * @param {Number} v volts
   * @returns {Voltage}
   */
  static v(v) {
    return new Voltage(v);
  }
}

export default Voltage