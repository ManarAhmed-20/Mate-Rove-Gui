import Communication from "./components/communication/communication";
import ThrusterConfiguration from "./components/thruster/thruster";
import GrippersConfiguration from "./components/gripper/gripper";
import SensorsConfiguration from "./components/sensor/sensor";
export default function Configurations() {
    return (
        <div className="flex flex-col mt-20 gap-5 w-full p-2.5 bg-gray">
            <div className="flex justify-center gap-5 bg-gray">
                <Communication />
                <ThrusterConfiguration />
                <GrippersConfiguration />
                <SensorsConfiguration />
            </div>
        </div>
    );
}
