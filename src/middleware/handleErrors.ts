import { validationResult } from 'express-validator';

export const handleErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    res.status(400).errors(errors.array());
  } else {
    next();
  }
};
