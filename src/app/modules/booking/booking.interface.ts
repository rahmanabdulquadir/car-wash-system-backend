import { Types } from "mongoose";
import { TUser } from "../user/user.interface";
import { TService } from "../service/service.interface";
import { TSlot } from "../slot/slot.interface";

export type TBooking = {
  // customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: "car" | "truck" | "SUV" | "van" | "motorcycle" | "bus" | "electricVehicle" | "hybridVehicle" | "bicycle" | "tractor";
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}

