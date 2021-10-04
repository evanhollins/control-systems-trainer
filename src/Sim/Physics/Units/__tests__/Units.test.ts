import Unit from '../Unit';
import Length from "../Length";
import Mass from "../Mass";
import Torque from "../Torque";
import Voltage from "../Voltage";
import Current from '../Current';
import RotationalVelocity from '../RotationalVelocity';
import RotationalPosition from '../RotationalPosition';

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
        expect(l.m()).toBe(10);
        expect(l.mm()).toBe(10000);
    })

    it('constructs with millimetres', () => {
        let l = Length.mm(1024);
        expect(l.m()).toBe(1.024);
    })
})

describe('Mass', () => {
    it('constructs with kilograms', () => {
        let m = Mass.kg(10);
        expect(m.kg()).toBe(10);
        expect(m.g()).toBe(10000);
    })

    it('constructs with grams', () => {
        let m = Mass.g(12);
        expect(m.kg()).toBe(0.012);
    })
})

describe('Torque', () => {
    it('constructs with newton meters', () => {
        let t = Torque.nm(10);
        expect(t.nm()).toBe(10);
    })

    it('constructs with ounce inches', () => {
        let t = Torque.oz_in(175);
        expect(t.nm()).toBeCloseTo(1.2358);
    })

    it('constructs with pound feet', () => {
        let t = Torque.lb_ft(15);
        expect(t.nm()).toBeCloseTo(20.3373);
    })

    it('converts between units correctly', () => {
        let t = Torque.nm(10);
        expect(t.oz_in()).toBeCloseTo(1416.03);
        expect(t.lb_ft()).toBeCloseTo(7.3756);
    })
})

describe('Voltage', () => {
    it('constructs with volts', () => {
        let v = Voltage.v(12);
        expect(v.v()).toBe(12);
    })
})

describe('Current', () => {
    it('constructs with amps', () => {
        let a = Current.a(3);
        expect(a.a()).toBe(3);
    })
})

describe('Rotational Position', () => {
    it('constructs with rad', () => {
        let p = RotationalPosition.rad(Math.PI);
        expect(p.rad()).toBe(Math.PI);
        expect(p.deg()).toBeCloseTo(180);
    })

    it('constructs with deg', () => {
        let p = RotationalPosition.deg(180);
        expect(p.deg()).toBeCloseTo(180);
        expect(p.rad()).toBeCloseTo(Math.PI);
    })
})

describe('Rotational Velocity', () => {
    it('constructs with rps', () => {
        let r = RotationalVelocity.rps(10);
        expect(r.rps()).toBe(10);
        expect(r.rpm()).toBeCloseTo(600);
    })

    it('constructs with rpm', () => {
        let r = RotationalVelocity.rpm(60);
        expect(r.rps()).toBe(1);
    })
})