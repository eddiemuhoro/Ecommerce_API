import { body } from 'express-validator';
import { handleErrors } from '../middleware/handleErrors.js';
import { prisma } from '../db.js';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { verifyEmail } from '../Mailer/productMail.js';
//* register user

const router = Router();

export const register =
  (body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    function generateVerificationCode() {
      const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += digits[Math.floor(Math.random() * 10)];
      }
      return code;
    }

    const verificationCode = generateVerificationCode();
    try {
      const { name, email, password } = req.body;
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 10),
          code: verificationCode
        },
        select: {
          id: true,
          email: true
        }
      });

      if (!user) {
        throw new Error('Registration failed');
      }
      await verifyEmail(user.email, req.body.name, verificationCode);

      res.status(200).json({
        message: 'user registered',
        verification: 'Verification email sent',
        email: user.email
      });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

//* login user

export const login =
  (body('email').isString(),
  body('password').isString(),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = bcrypt.compareSync(password, user!.password);

      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      if (!user.isVerified) {
        throw new Error('User not verfied');
      }

      res.status(200).json({
        id: user!.id,
        name: user!.name,
        email: user!.email,
        phone: user!.phone
      });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  });

router.get('/resend/code/:email', async (req: Request, res: Response) => {
  try {
    function generateVerificationCode() {
      const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += digits[Math.floor(Math.random() * 10)];
      }
      return code;
    }

    const verificationCode = generateVerificationCode();

    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email
      }
    });
    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.update({
      where: {
        email: req.params.email
      },
      data: {
        code: verificationCode
      }
    });

    await verifyEmail(user.email, user.name, verificationCode);

    res.json({ message: 'Verification email sent', code: verificationCode });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/check/:email', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.json({ exists: true });
  } catch (e: any) {
    res.status(500).json({ exists: false });
  }
});

//* fetch all the users
//route to show a simple formfiedl to verify the user
// router.get('/verify/:email/:id', async (req: Request, res: Response) => {
//   try {
//     res.send(
//       `<form action="/submit/${req.params.id}/${req.params.email}" method="GET">` +
//         `<input type="text" name="code" placeholder="Enter verification code" val/>` +
//         `<button type="submit">Verify</button>` +
//         `</form>`
//     );
//   } catch (e: any) {
//     res.status(500).json({ message: e.message });
//   }
// });

// router.get('/submit/:id/:email', (req, res) => {
//   const code = req.body.code;
//   console.log(`Received code: ${code}`);
//   res.redirect(
//     `http://localhost:4200/users/verify/${req.params.email}/${code}`
//   );
// });
router.put(
  '/verify/social/:email',
  body('code'),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.params.email
        }
      });
      if (!user) {
        throw new Error('User not found');
      }

      const users = await prisma.user.update({
        where: {
          email: req.params.email
        },
        data: {
          isVerified: true
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      });
      if (!users) {
        throw new Error('Cannot verify user');
      }
      res.json(users);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.put(
  '/verify/:email/:code',
  body('code'),
  handleErrors,
  async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.params.email
        }
      });
      if (!user) {
        throw new Error('User not found');
      }

      if (req.params.code == user.code) {
        const user = await prisma.user.update({
          where: {
            email: req.params.email
          },
          data: {
            isVerified: true
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        });
        if (!user) {
          throw new Error('Cannot verify user');
        }
        res.json(user);
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get('/followers/:id', async (req: Request, res: Response) => {
  try {
    const followers = await prisma.follow.findMany({
      where: {
        followingId: req.params.id
      }
    });
    if (!followers) {
      throw new Error('no followers');
    }
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: followers.map((follower) => follower.followerId)
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      }
    });
    res.json({
      followers: users,
      count: users.length
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/following/:id', async (req: Request, res: Response) => {
  try {
    const following = await prisma.follow.findMany({
      where: {
        followerId: req.params.id
      }
    });
    if (!following) {
      throw new Error('no following');
    }
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: following.map((follower) => follower.followingId)
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      }
    });
    res.json({
      following: users,
      count: users.length
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        password: false,
        name: true,
        email: true,
        phone: true,
        location: true,
        bio: true,
        profile_pic: true,
        isVerified: true,
        cover_pic: true,
        product: true,
        review: true,
        followers: true,
        following: true,
        usellaReviews: true
      }
    });

    if (!users) {
      throw new Error('Cannot fetch users');
    }

    res.json(users);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* get a single user
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        bio: true,
        location: true,
        profile_pic: true,
        cover_pic: true,
        followers: true,
        following: true,
        product: true
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

//* delete account

router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });

    if (!user) {
      throw new Error('Account not deleted');
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
//* update profile

router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...req.body
      }
    });
    if (!profile) {
      throw new Error('Profile not updated');
    }

    res.status(200).json(profile);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.put(
  '/reset/password/:email/:password',
  async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.update({
        where: {
          email: req.params.email
        },
        data: {
          password: bcrypt.hashSync(req.params.password, 10)
        }
      });
      if (!user) {
        throw new Error('Cannot reset password');
      }
      res.json({ message: 'Password reset successfully' });
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
);

//folow a user

export default router;
