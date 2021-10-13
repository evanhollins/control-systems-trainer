import Mass from "./Units/Mass";
import Length from "./Units/Length";

export class PointMass {
    mass: Mass;
    length: Length;

    constructor(mass: Mass, length: Length) {
        this.mass = mass;
        this.length = length;

        this.inertia = this.inertia.bind(this);
    }

    inertia(): number {
        return this.mass.kg() * Math.pow(this.length.m(), 2);
    }
}

export class RodAboutEnd {
    mass: Mass;
    length: Length;

    constructor(mass: Mass, length: Length) {
        this.mass = mass;
        this.length = length;

        this.inertia = this.inertia.bind(this);
    }

    inertia(): number {
        return this.mass.kg() * Math.pow(this.length.m(), 2) / 3;
    }
}