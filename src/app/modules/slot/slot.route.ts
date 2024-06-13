import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import {  createSlotHandler } from './slot.controller';


const router = express.Router();

router.post('/services/slots', createSlotHandler);


export const SlotRoutes = router;