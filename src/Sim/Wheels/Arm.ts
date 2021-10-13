import Length from "../Physics/Units/Length";
import Mass from "../Physics/Units/Mass";
import { RodAboutEnd, PointMass } from "../Physics/MomentOfInertia";

class Arm {
    r: RodAboutEnd = new RodAboutEnd(Mass.g(100), Length.mm(300));
    p: PointMass = new PointMass(Mass.g(500), Length.m(300));

    constructor() {
        this.inertia = this.inertia.bind(this);
    }

    inertia(): number {
        return this.r.inertia() + this.p.inertia();
    }
}

export default Arm;