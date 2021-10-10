import Length from "../Physics/Units/Length";
import Mass from "../Physics/Units/Mass";
import Wheel from "../Physics/Wheel";

export default class SteelFlywheel extends Wheel {
    private static radius = Length.mm(100);
    private static mass = Mass.kg(4);

    constructor() {
        super(SteelFlywheel.radius, SteelFlywheel.mass);
    }
}