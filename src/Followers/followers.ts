import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { Request, Response } from 'express';
import { prisma } from '../db.js';

export const follow =
  (body('followerId').notEmpty().withMessage('follower_id is required'),
  body('followingId').notEmpty().withMessage('following_id is required'),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { followerId, followingId } = req.body;
      const follower = await prisma.follow.create({
        data: {
          followerId: followerId,
          followingId: followingId
        }
      });
      if (!follower) {
        throw new Error('Error following user');
      }
      res.status(200).json({
        message: 'User followed successfully',
        follower
      });
    } catch (err) {
      console.error('Error following user:', err);
    }
  });

export const unFollow =
  (body('followerId')
    .notEmpty()
    .withMessage('follower_id is required')
    .isString(),
  body('followingId')
    .notEmpty()
    .withMessage('following_id is required')
    .isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { followerId, followingId } = req.body;
      const follower = await prisma.follow.deleteMany({
        where: {
          followerId: followerId,
          followingId: followingId
        }
      });
      if (!follower) {
        throw new Error('Error unfollowing user');
      }

      res.status(200).json({
        message: 'User unfollowed successfully',
        follower
      });
    } catch (err) {
      console.error('Error following user:', err);
    }
  });
