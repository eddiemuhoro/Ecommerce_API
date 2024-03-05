// //@ts-nocheck
import axios from 'axios';
import { Router, Request, Response } from 'express';
import { handleErrors } from '../middleware/handleErrors.js';
import { body } from 'express-validator';
import { prisma } from '../db.js';

const router = Router();

router.get('/token', async (_req: Request, res: Response) => {
  try {
    const secret = process.env.APP_SECRET;
    const key = process.env.APP_KEY;
    const auth = Buffer.from(key + ':' + secret).toString('base64');

    const token = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    if (!token) {
      throw new Error('Could not get token');
    }

    res.json({ token: token.data.access_token });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/callback', async (req: Request, res: Response) => {
  try {
    const callbackBody = req.body;

    if (!callbackBody.Body.stkCallback.CallbackMetadata) {
      console.log(callbackBody.Body);
    }

    console.log(callbackBody.Body.stkCallback.CallbackMetadata);

    await prisma.payment.create({
      data: {
        id: callbackBody.Body.stkCallback.CallbackMetadata.Item[1].Value,
        amount: callbackBody.Body.stkCallback.CallbackMetadata.Item[0].Value,
        phone: callbackBody.Body.stkCallback.CallbackMetadata.Item[4].Value,
        transactionDate:
          callbackBody.Body.stkCallback.CallbackMetadata.Item[3].Value,     
      }
    });
    res.json({ message: 'success' })
  } catch (e: any) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

export const callBackUrl = async(req: Request, res: Response)=>{
    try {
        const callbackBody = req.body;
    
        if (!callbackBody.Body.stkCallback.CallbackMetadata) {
        console.log(callbackBody.Body);
        }
    
        console.log(callbackBody.Body.stkCallback.CallbackMetadata);
    
        await prisma.payment.create({
        data: {
            id: callbackBody.Body.stkCallback.CallbackMetadata.Item[1].Value,
            amount: callbackBody.Body.stkCallback.CallbackMetadata.Item[0].Value,
            phone: callbackBody.Body.stkCallback.CallbackMetadata.Item[4].Value,
            transactionDate:
            callbackBody.Body.stkCallback.CallbackMetadata.Item[3].Value,     
        }
        });
        res.json({ message: 'success' })
    } catch (e: any) {
        console.log(e.message);
        res.status(500).json({ message: e.message });
    }
}

export const payment = async (req: Request, res: Response) => {
    try {
      const shortCode = 174379;
      const { phone, amount } = req.body;
      const passKey =
        'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

      let token = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      const url =
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
      const date = new Date();
      const timestamp =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2);

      const password = Buffer.from(shortCode + passKey + timestamp).toString(
        'base64'
      );

      const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        CallBackURL: 'https://usella.up.railway.app/pay/callback',
        AccountReference: 'Mpesa Test',
        TransactionDesc: 'Testing stk push'
      };

      await axios
        .post(url, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then((data) => {
          console.log(data);
          res.json(data.data);
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.message);
        });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
}

router.post(
  '/pay',
  body('phone'),
  body('amount'),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const shortCode = 174379;
      const { phone, amount } = req.body;
      const passKey =
        'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

      let token = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      const url =
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
      const date = new Date();
      const timestamp =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2) +
        ('0' + date.getSeconds()).slice(-2);

      const password = Buffer.from(shortCode + passKey + timestamp).toString(
        'base64'
      );

      const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        CallBackURL: 'https://usella.up.railway.app/mpesa/callback',
        AccountReference: 'Mpesa Test',
        TransactionDesc: 'Testing stk push'
      };

      await axios
        .post(url, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then((data) => {
          console.log(data);
          res.json(data.data);
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.message);
        });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

export default router;
