// import httpStatus from 'http-status';
// import AppError from '../../errors/AppError';
// import { Service } from '../service/service.model';
// import { Slot } from './slot.model';
// import { TSlot } from './slot.interface';

// const createSlotsIntoDB = async (
//   serviceId: string,
//   date: string,
//   startTime: string,
//   endTime: string,
// ) => {
//   const serviceData = await Service.findById(serviceId);
//   if (!serviceData) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Service not found');
//   }

//   const serviceDuration = serviceData.duration; // Assume 60 minutes duration for the service

//   const startMinutes =
//     parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
//   const endMinutes =
//     parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

//   const totalDuration = endMinutes - startMinutes;
//   const numberOfSlots = totalDuration / serviceDuration;

//   const slots = [];
//   for (let i = 0; i < numberOfSlots; i++) {
//     const slotStartTime = startMinutes + i * serviceDuration;
//     const slotEndTime = slotStartTime + serviceDuration;

//     const slotStartTimeStr = `${String(Math.floor(slotStartTime / 60)).padStart(2, '0')}:${String(slotStartTime % 60).padStart(2, '0')}`;
//     const slotEndTimeStr = `${String(Math.floor(slotEndTime / 60)).padStart(2, '0')}:${String(slotEndTime % 60).padStart(2, '0')}`;

//     slots.push({
//       service: serviceId,
//       date,
//       startTime: slotStartTimeStr,
//       endTime: slotEndTimeStr,
//     });
//   }

//   const createdSlots = await Slot.insertMany(slots);
//   return createdSlots;
// };


// interface SlotQuery {
//   date?: string;
//   serviceId?: string;
// }


// const getAvailableSlotsFromDB = async (query: SlotQuery): Promise<TSlot[]> => {
//   const filter: any = { isBooked: 'available' };

//   if (query.date) {
//     filter.date = query.date;
//   }

//   if (query.serviceId) {
//     filter.service = query.serviceId;
//   }

//   const slots = await Slot.find(filter).populate('service');
//   return slots;
// };

// export const SlotServices = {
//   createSlotsIntoDB,
//   getAvailableSlotsFromDB,
// };



import QueryBuilder from "../../builder/QueryBuilder";
import { IAnyObject } from "../../interface/error";
import ISlot from "./slot.interface";
import Slot from "./slot.model";
import { minutesToTime, timeToMinutes } from "./slot.utils";


const createSlot = async (payload: ISlot, duration: number) => {
  // {
  //     "service": "60d9c4e4f3b4b544b8b8d1c5",
  //     "date": "2024-06-15",
  //     "startTime": "09:00",
  //     "endTime": "14:00"
  // }


  const startMinutes = timeToMinutes(payload.startTime);
  const endMinutes = timeToMinutes(payload.endTime);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  const slots = [];
  let start = startMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const end = start + duration;
    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: minutesToTime(start),
      endTime: minutesToTime(end),
      isBooked: "available",
    });
    start = end;
  }

  const result = await Slot.create(slots);
  return result;
};

const getAllAvailableSlotsService = async (query: IAnyObject) => {
  const find = Slot.find().populate("service");
  const queryBuilder = new QueryBuilder(find, query).filter();
  const result = await queryBuilder.modelQuery;
  return result;
};
const getAllSlotsService = async (query: IAnyObject) => {
  const find = Slot.find().sort("-createdAt").populate("service");
  const queryBuilder = new QueryBuilder(find, query).filter().paginate();
  const totalDoc = await queryBuilder.count();
  const result = await queryBuilder.modelQuery;
  return { result, totalDoc: totalDoc.totalCount };
};
const getSlotByIdService = async (id: string) => {
  const result = await Slot.findById(id).populate("service");

  return result;
};
const toggleSlotsStuasService = async (id: string) => {
  const slot = await Slot.findById(id);
  if (!slot) return null;
  const oldStatus = slot.isBooked;
  if (oldStatus === "booked") {
    return null;
  }

  const newStatus = oldStatus === "available" ? "cancel" : "available";
  const result = await Slot.findByIdAndUpdate(id, {
    $set: { isBooked: newStatus },
  });

  return result;
};

const slotService = {
  createSlot,
  getAllAvailableSlotsService,
  getSlotByIdService,
  getAllSlotsService,toggleSlotsStuasService
};

export default slotService;
