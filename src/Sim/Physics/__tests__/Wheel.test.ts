import Wheel from "../Wheel";
import Length from "../Units/Length";
import Mass from "../Units/Mass";

it('calculates moment of inertia', () => {
    let w = new Wheel(Length.mm(50), Mass.kg(1));

    expect(w.inertia()).toBeCloseTo(0.00125);
})