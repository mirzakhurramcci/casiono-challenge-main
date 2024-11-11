import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';
import { UserCreateInput } from '../../modules/user/generated-types/user-resolvers-types';
import { waterfall } from 'async';
// const validateEmail =
const emailSchema = yup.string().email().required();
const passwordSchema = yup
  .string()
  .min(8, 'Password should be minimum 8 characters')
  .matches(
    /^(?=.*[A-Z])(?=.*\d)/,
    'Password should contain at least 1 uppercase character and 1 numeric value'
  );

export class UserValidations {
  prisma: PrismaClient;
  constructor(prisma) {
    this.prisma = prisma;
  }
  private async validateEmail(email: string) {
    await emailSchema.validate(email);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new yup.ValidationError('Email already in use');
    }
  }

  private async validatePassword(password: string) {
    await passwordSchema.validate(password);
  }
  private async validateAge(dob: Date) {
    // Check if user is 18 years old
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      throw new yup.ValidationError('You must be 18 years old');
    }
  }
  async validateUserSignUp(input: UserCreateInput) {
    // The return of function gets passed down the water fall to the next validation
    return new Promise((resolve, reject) => {
      waterfall(
        [
          async (next) => {
            try {
              await this.validateEmail(input.email);
              next(undefined, input);
            } catch (err) {
              next(err);
            }
          },
          async (input: UserCreateInput, next) => {
            try {
              await this.validatePassword(input.password);
              next(undefined, input);
            } catch (err) {
              next(err);
            }
          },
          async (input: UserCreateInput, next) => {
            try {
              await this.validateAge(input.dob);
              next(undefined, input);
            } catch (err) {
              next(err);
            }
          },
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}
