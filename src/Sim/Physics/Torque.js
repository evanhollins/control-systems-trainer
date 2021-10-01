import Unit from './Unit';

class Torque extends Unit {
  constructor(nm) {
    super(nm)
  }

  /**
   * @param {Number} nm newton*meters
   * @returns {Torque}
   */
  static nm(nm) {
    return new Torque(nm);
  }

  /**
   * @param {Number} oz_in Ounce*inches
   * @returns {Torque}
   */
  static oz_in(oz_in) {
    return new Torque(oz_in * 0.007062);
  }

  /**
   * @param {Number} lb_ft Pound*feet
   * @returns {Torque}
   */
  static lb_ft(lb_ft) {
    return new Torque(lb_ft * 1.35582);
  }
}

export default Torque;