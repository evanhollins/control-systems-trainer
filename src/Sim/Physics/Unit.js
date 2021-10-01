
class Unit {
  constructor(value) {
    this.value = value;
  }

  /**
   * @param {Unit} other 
   */
  equals(other) {
    return this.value === other.value;
  }

  isPositive() {
    return this.value >= 0;
  }

  isNegative() {
    return !this.isPositive();
  }

  negate() {
    return new this.constructor(-this.value);
  }
}

export default Unit;