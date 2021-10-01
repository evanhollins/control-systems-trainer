import Unit from "./Unit";

class Length extends Unit {
  constructor(meters) {
    super(meters)
  }

  /**
   * @param {Number} m Meters
   * @returns Length
   */
  static m(m) {
    return new Length(m);
  }

  /**
   * @param {Number} mm Millimetres
   * @returns Length
   */
  static mm(mm) {
    return new Length(mm / 1000);
  }
}

export default Length;