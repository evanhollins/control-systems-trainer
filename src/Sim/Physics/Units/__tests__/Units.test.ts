import Unit from '../Unit';
import Length from "../Length";
import Mass from "../Mass";
import Torque from "../Torque";
import Voltage from "../Voltage";
import Current from '../Current';
import RotationalVelocity from '../RotationalVelocity';

describe('Unit', () => {
    let u1 = new Unit(1);
    let u2 = new Unit(1);
    let u3 = new Unit(-1);

    it('tests equality', () => {
        expect(u1.equals(u2)).toBe(true);
        expect(u1.equals(u3)).toBe(false);
    })

    it('tests positivity', () => {
        expect(u1.isPositive()).toBe(true);
        expect(u3.isPositive()).toBe(false);
    })

    it('tests negativity', () => {
        expect(u1.isNegative()).toBe(false);
        expect(u3.isNegative()).toBe(true);
    })

    it('negates', () => {
        expect(u1.negate().equals(u3)).toBe(true);
        expect(u3.negate().equals(u1)).toBe(true);
    })
})

describe('Length', () => {
    it('constructs with meters', () => {
        let l = Length.m(10);
        expect(l.value).toBe(10);
    })

    it('constructs with millimetres', () => {
        let l = Length.mm(1000);
        expect(l.value).toBe(1);
    })
})

describe('Mass', () => {
    it('constructs with kilograms', () => {
        let m = Mass.kg(10);
        expect(m.value).toBe(10);
    })

    it('constructs with grams', () => {
        let m = Mass.g(12);
        expect(m.value).toBe(0.012);
    })
})

describe('Torque', () => {
    it('constructs with newton meters', () => {
        let t = Torque.nm(10);
        expect(t.value).toBe(10);
    })

    it('constructs with ounce inches', () => {
        let t = Torque.oz_in(175);
        expect(t.value).toBeCloseTo(1.2358);
    })

    it('constructs with pound feet', () => {
        let t = Torque.lb_ft(15);
        expect(t.value).toBeCloseTo(20.3373);
    })
})

describe('Voltage', () => {
    it('constructs with volts', () => {
        let v = Voltage.v(12);
        expect(v.value).toBe(12);
    })
})

describe('Current', () => {
    it('constructs with amps', () => {
        let a = Current.a(3);
        expect(a.value).toBe(3);
    })
})

describe('Rotational Velocity', () => {
    it('constructs with rps', () => {
        let r = RotationalVelocity.rps(10);
        expect(r.value).toBe(10);
    })

    it('constructs with rpm', () => {
        let r = RotationalVelocity.rpm(60);
        expect(r.value).toBe(1);
    })
})