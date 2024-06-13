import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import {  createSlotHandler, getAvailableSlotsHandler } from './slot.controller';


const router = express.Router();

router.post('/services/slots', createSlotHandler);
router.get('/slots/availability', getAvailableSlotsHandler);


export const SlotRoutes = router;