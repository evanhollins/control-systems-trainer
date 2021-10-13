import { PointMass, RodAboutEnd } from "../MomentOfInertia";
import Mass from '../Units/Mass';
import Length from '../Units/Length';

describe('Point mass', () => {
    it('calculates correctly', () => {
        let p = new PointMass(Mass.kg(3), Length.m(2));
        expect(p.inertia()).toBe(12)
    })
})

describe('Rod about end', () => {
    it('calculates correctly', () => {
        let r = new RodAboutEnd(Mass.kg(3), Length.m(2));
        expect(r.inertia()).toBe(4)
    })
})
