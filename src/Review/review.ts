import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { prisma } from '../db.js';

const router = Router();

//* fetch all user reviews

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.user.findMany({
      where: {
        id: req.params.id
      },
      select: {
        review: true
      }
    });

    if (!reviews) {
      throw new Error('Cannot fetch user reviews');
    }

    res.json(reviews);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* post a review

router.post(
  '/user/send',
  body('sender_name').isString(),
  body('sender_email').isString(),
  body('sender_image').isString(),
  body('user_id').isString(),
  body('comment').isString(),
  body('rating').isInt(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const review = await prisma.review.create({
        data: {
          ...req.body
        }
      });

      if (!review) {
        throw new Error('Review not sent');
      }

      res.json({ message: 'Review sent successfully' });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

//* edit your review

router.put('/user/update/:id', async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.update({
      where: {
        id: req.params.id
      },
      data: {
        comment: req.body.comment,
        rating: req.body.comment
      },
      select: {
        comment: true,
        rating: true,
        user_id: true
      }
    });
    if (!review) {
      throw new Error('Could not update the review');
    }

    res;
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete a review

router.delete('/delete/user/:id', async (req: Request, res: Response) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: req.params.id
      }
    });

    if (!review) {
      throw new Error('Product review not deleted');
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//!n All the usella review routes

//* rate the website for its services
router.post(
  '/usella/send',
  body('user_id').isString(),
  body('comment').isString(),
  body('rating').isInt(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const review = await prisma.usellaReviews.create({
        data: {
          ...req.body
        }
      });

      if (!review) {
        throw new Error('Review not sent');
      }

      res.json({ message: 'Review sent successfully' });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);
router.delete(
  '/usella/delete/:id',

  async (req: Request, res: Response) => {
    try {
      const review = await prisma.usellaReviews.delete({
        where: {
          id: req.params.id
        }
      });

      if (!review) {
        throw new Error('Review not sent');
      }

      res.json({ message: 'Review sent successfully' });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

//* fetch all usella reviews

router.get('/usella', async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.usellaReviews.findMany({
      select: {
        comment: true,
        rating: true
      }
    });

    if (!reviews) {
      throw new Error('Cannot fetch usella reviews');
    }

    res.json(reviews);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
