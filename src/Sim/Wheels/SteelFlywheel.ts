import Length from "../Physics/Units/Length";
import Mass from "../Physics/Units/Mass";
import Wheel from "../Physics/Wheel";

class SteelFlywheel extends Wheel {
    private static radius = Length.mm(50);
    private static mass = Mass.kg(2);

    constructor() {
        super(SteelFlywheel.radius, SteelFlywheel.mass);
    }
}