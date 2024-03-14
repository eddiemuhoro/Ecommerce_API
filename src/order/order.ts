import { Router, Request, Response } from 'express';
import { prisma } from '../db.js';
import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import {
  orderCreatedEmail,
  orderDeliveredEmail,
  orderConfirmEmail
} from '../Mailer/productMail.js';
import axios from 'axios';
// import { payOrder } from '../Mpesa/mpesa.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        buyer_id: true,
        product_id: true,
        quantity: true,
        location: true,
        seller_id: true,
        order_status: true,
        product: true
      }
    });

    if (!orders) {
      throw new Error('No orders found');
    }
    res.status(200).json(orders);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const product = await prisma.product.findUnique({
      where: {
        id: order.product_id
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const buyer = await prisma.user.findUnique({
      where: {
        id: order.buyer_id
      }
    });

    if (!buyer) {
      throw new Error('Buyer not found');
    }

    res.status(200).json({
      order_name: product.name,
      order_description: product.description,
      order_price: product.price,
      order_quantity: order.quantity,
      order_status: order.order_status,
      order_payment_status: order.paymentStatus,
      order_location: order.location,

      buyer_name: buyer.name,
      buyer_email: buyer.email,
      buyer_phone: buyer.phone,
      buyer_image: buyer.profile_pic,

      seller_name: product.seller_name,
      seller_email: product.seller_email,
      seller_phone: product.seller_phone
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        buyer_id: req.params.id
      },
      select: {
        id: true,
        buyer_id: true,
        product_id: true,
        location: true,
        quantity: true,
        order_status: true,
        product: true,
        paymentStatus: true
      }
    });

    if (!orders) {
      throw new Error('No orders found');
    }

    // let buyer_id: any = null;

    // orders.map(async (order) => {
    //   buyer_id = order.buyer_id;
    // });

    // const buyer = await prisma.user.findUnique({
    //   where: {
    //     id: buyer_id
    //   }
    // });

    // if (!buyer) {
    //   throw new Error('Buyer not found');
    // }
    res.status(200).json(orders);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/seller/:id', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        seller_id: req.params.id
      },
      select: {
        id: true,
        buyer_id: true,
        product_id: true,
        location: true,
        quantity: true,

        order_status: true,
        product: true,
        paymentStatus: true
      }
    });

    if (!order) {
      throw new Error('No orders found');
    }

    res.status(200).json(order);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post(
  '/create',
  body('buyer_id').isString(),
  body('buyer_email').isString(),
  body('buyer_name').isString(),
  body('product_id').isString(),
  body('quantity').isInt(),
  body('location').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    const {
      buyer_id,
      product_id,
      quantity,
      location,
      buyer_email,
      buyer_name
    } = req.body;
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: product_id
        }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      if (quantity > product.quantity) {
        throw new Error('Product quantity greater than available');
      }

      if (buyer_id == product.seller_id) {
        throw new Error('You cannot buy your sale');
      }

      await prisma.product.update({
        where: {
          id: product_id
        },
        data: {
          status: 'SOLD'
        }
      });

      const order = await prisma.order.create({
        data: {
          buyer_id: buyer_id,
          product_id: product_id,
          quantity: quantity,
          location: location,
          seller_id: product.seller_id,
          price: product.price
        }
      });

      if (!order) {
        throw new Error('Order not created');
      }

      await prisma.cart.delete({
        where: {
          id: product_id 
        }
      });

      await orderCreatedEmail(
        buyer_email,
        product.id,
        buyer_name,
        product.name,
        product.price,
        product.description,
        product.images[0]
      );

      await orderConfirmEmail(
        product.seller_email,
        product.id,
        product.seller_name,
        product.name,
        product.price,
        product.description,
        product.images[0]
      );

      res.status(200).json({ message: 'Order created', order });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.delete('/cancel/:id', async (req: Request, res: Response) => {
  try {
    // const currentOrder = await prisma.order.findUnique({
    //   where:{
    //     id: req.params.id
    //   }
    // });

    // if(currentOrder?.order_status == "ACCEPTED"){
    //   throw new Error("Order is already accepted by the seller")
    // }
    const order = await prisma.order.delete({
      where: {
        id: req.params.id
      }
    });

    await prisma.product.update({
      where: {
        id: order.product_id
      },
      data: {
        status: 'AVAILABLE'
      }
    });

    if (!order) {
      throw new Error('Order has not been canceled');
    }

    res.json({ message: 'Order has been canceled successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/confirm/:id/:seller', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        id: req.params.id,
        seller_id: req.params.seller
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: req.params.id
      },
      data: {
        order_status: 'ACCEPTED'
      }
    });

    if (!updatedOrder) {
      throw new Error('Order not confirmed');
    }

    res.status(200).json({ message: 'Order confirmed successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/reject/:id/:seller', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        id: req.params.id,
        seller_id: req.params.seller
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: req.params.id
      },
      data: {
        order_status: 'PENDING'
      }
    });

    if (!updatedOrder) {
      throw new Error('Order not rejected');
    }

    await prisma.product.update({
      where: {
        id: updatedOrder.product_id
      },
      data: {
        status: 'AVAILABLE'
      }
    });

    await prisma.order.delete({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ message: 'Order rejected successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/pay/:amount/:id', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.order_status == 'PENDING') {
      throw new Error('Order has not been confirmed yet');
    } else {
      const { amount } = req.params;
      const { phone } = req.body;
      const orderAmount: number = parseInt(amount);
      const order = await prisma.order.findUnique({
        where: {
          id: req.params.id
        }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (orderAmount < order.price) {
        throw new Error('Amount is not equal to the order price');
      }

      const shortCode = 174379;

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
        .then(async (data) => {
          console.log(data);
          const updatedOrder = await prisma.order.update({
            where: {
              id: req.params.id
            },
            data: {
              paymentStatus: 'PAID'
            }
          });

          if (!updatedOrder) {
            throw new Error('Payment not made');
          }

          res.status(200).json({
            message: 'order has been paid successfully',
            data: data.data
          });
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.message);
        });
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/complete/:id', async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const payment = {
      UNPAID: 'UNPAID',
      PAID: 'PAID'
    };
    if (order.paymentStatus == payment.UNPAID) {
      throw new Error('Order is not paid');
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: req.params.id
      },
      data: {
        order_status: 'DELIVERED'
      }
    });

    if (!updatedOrder) {
      throw new Error('Order not completed');
    }

    const product = await prisma.product.findUnique({
      where: {
        id: updatedOrder.product_id
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }
    const buyer = await prisma.user.findUnique({
      where: {
        id: updatedOrder.buyer_id
      }
    });

    if (!buyer) {
      throw new Error('Buyer not found');
    }

    await orderDeliveredEmail(
      buyer?.email,
      product?.id,
      buyer?.name,
      product?.name,
      product?.price,
      product?.description,
      product?.images[0]
    );

    await prisma.history.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images,
        status: product.status,
        seller_id: product.seller_id,
        seller_email: product.seller_email,
        seller_name: product.seller_name,
        seller_phone: product.seller_phone,
        belongsTo: updatedOrder.buyer_id,
        quantity: updatedOrder.quantity,
        location: updatedOrder.location
      }
    });

    await prisma.product.delete({
      where: {
        id: updatedOrder.product_id
      }
    });

    await prisma.order.delete({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ message: 'Order completed successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/history/:id', async (req: Request, res: Response) => {
  try {
    const history = await prisma.history.findMany({
      where: {
        belongsTo: req.params.id
      }
    });

    if (!history) {
      throw new Error('History not found');
    }
    res.json(history);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post(
  '/add/cart',
  body('product_id').isString(),
  body('buyer_id').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const product = await prisma.cart.create({
        data: {
          id: req.body.product_id,
          buyer_id: req.body.buyer_id
        }
      });
      if (!product) {
        res.status(500).json({ message: 'cannot add item to cart' });
      }
      res.json(product);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get('/fetch/cart/:id', async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {
        buyer_id: req.params.id
      },
      select: {
        id: true
      }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product: any = [];
    for (let i = 0; i < cart.length; i++) {
      const item = await prisma.product.findUnique({
        where: {
          id: cart[i].id.replace(req.params.id, '')
        }
      });
      product.push(item);
    }

    res.json(product);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/delete/cart/:id', async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id: req.params.id
      }
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    res.json({ message: 'removed from cart successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
