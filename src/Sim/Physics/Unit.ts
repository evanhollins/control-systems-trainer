
type UnitConstructor = { new (): Unit };

class Unit {
    value: number;

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

    negate(): Unit {
        let toReturn: Unit = Object.create(this);
        toReturn.value = -this.value;
        return toReturn;
    }
}

export default Unit;