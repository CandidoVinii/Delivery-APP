import { User } from '../database/models';

export const userValidations = async (data) => {
  if (data.name.length < 12) {
    return { error:
      { code: 400, message: '"Name" length must be at least 12 characters long' },
    };
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = data.email.match(regex);
  if (!validEmail) {
    return { error: { code: 400, message: '"Email" must be a valid email' } };
  }

  if (data.password.length < 6) {
    return { error:
      { code: 400, message: '"Password" length must be at least 6 characters long' } };
  }
  
  const userLogin = await User.findOne({ where: { email: data.email } });
    if (userLogin) return { error: { code: 409, message: 'User already registered' } };
    return true;
};
