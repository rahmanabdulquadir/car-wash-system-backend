import jwt from 'jsonwebtoken';
import { catchAsync } from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { IPaymentTokenInfo } from './payment.interface';
import { paymentService } from './payment.service';
import Booking from '../booking/booking.model';
// import { Booking } from '../booking/booking.model';

export const successPaymentController = catchAsync(async (req, res) => {
  const paymentInfoToken = req.query.pt as string;
  let decode;
  try {
    decode = jwt.verify(paymentInfoToken, process.env.SIGNATURE_KEY as string);
  } catch (error) {
    sendResponse(res, {
      data: null,
      success: false,
      message: 'invalid payment info',
      statusCode: 400,
    });
  }

  const { amount, transactionId, slotId } = decode as IPaymentTokenInfo;
  await Booking.findOneAndUpdate({ slot: slotId }, { payment: 'paid' });
  const result = await paymentService.createPayment(
    Number(amount),
    transactionId,
  );
  res.send(result);
});
export const failedPaymentController = catchAsync(async (req, res) => {
  const paymentInfoToken = req.query.pt as string;
  let decode;
  try {
    decode = jwt.verify(paymentInfoToken, process.env.SIGNATURE_KEY as string);
  } catch (error) {
    sendResponse(res, {
      data: null,
      success: false,
      message: 'invalid payment info',
      statusCode: 400,
    });
  }

  const { slotId } = decode as IPaymentTokenInfo;

  const result = await paymentService.failedPayment(slotId);
  res.send(result);
});
