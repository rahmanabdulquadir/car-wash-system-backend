import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { Slot } from './slot.model';
import { TSlot } from './slot.interface';

const createSlotsIntoDB = async (
  serviceId: string,
  date: string,
  startTime: string,
  endTime: string,
) => {
  const serviceData = await Service.findById(serviceId);
  if (!serviceData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found');
  }

  const serviceDuration = serviceData.duration; // Assume 60 minutes duration for the service

  const startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / serviceDuration;

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = startMinutes + i * serviceDuration;
    const slotEndTime = slotStartTime + serviceDuration;

    const slotStartTimeStr = `${String(Math.floor(slotStartTime / 60)).padStart(2, '0')}:${String(slotStartTime % 60).padStart(2, '0')}`;
    const slotEndTimeStr = `${String(Math.floor(slotEndTime / 60)).padStart(2, '0')}:${String(slotEndTime % 60).padStart(2, '0')}`;

    slots.push({
      service: serviceId,
      date,
      startTime: slotStartTimeStr,
      endTime: slotEndTimeStr,
    });
  }

  const createdSlots = await Slot.insertMany(slots);
  return createdSlots;
};


interface SlotQuery {
  date?: string;
  serviceId?: string;
}


const getAvailableSlotsFromDB = async (query: SlotQuery): Promise<TSlot[]> => {
  const filter: any = { isBooked: 'available' };

  if (query.date) {
    filter.date = query.date;
  }

  if (query.serviceId) {
    filter.service = query.serviceId;
  }

  const slots = await Slot.find(filter).populate('service');
  return slots;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
};
