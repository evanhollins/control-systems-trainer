
class Unit {
    protected value: number;

    constructor(value: number) {
        this.value = value;
    }

    equals(other: Unit): boolean {
        return this.value === other.value;
    }

    isPositive(): boolean {
        return this.value >= 0;
    }

    isNegative(): boolean {
        return !this.isPositive();
    }

    negate<UnitType extends Unit>(): UnitType {
        let toReturn = Object.create(this);
        toReturn.value = -this.value;
        return toReturn;
    }
}

export default Unit;