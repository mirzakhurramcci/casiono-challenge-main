import { GraphQLError } from 'graphql';
import { sign } from 'jsonwebtoken';
import dayjs from 'dayjs';
import { jwtSecret } from '../../../config';
import { CouponValidations } from '../../../utils/validations/coupon';
import { CouponCreateInput } from '../generated-types/coupon-resolvers-types';
export default class CouponService {
  couponValidation: CouponValidations;
  constructor() {
    this.couponValidation = new CouponValidations(prisma);
  }
  getCouponsOfUser(id: number) {
    return prisma.coupon.findMany({
      where: {
        userId: id,
        active: true,
      },
    });
  }

  async startGame(userId: number, startNumber: number) {
    await this.couponValidation.validateUserCanPlay(userId);
    const numberGenerated = this.generateRandomDigit();
    const points = this.evaluatePoints(numberGenerated);
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        attempts: {
          decrement: 1,
        },
        points: {
          increment: points,
        },
      },
    });
    return {
      numberGenerated: parseInt(numberGenerated),
      pointsAdded: points,
      attemptsRemaining: user.attempts,
      totalPoints: user.points,
    };
  }
  async createCoupon(userId: number, input: CouponCreateInput) {
    await this.couponValidation.validateUserHasEnoughPoints(userId);
    const coupon = await prisma.coupon.create({
      data: {
        code: input.code,
        userId: userId,
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        points: {
          decrement: 1000,
        },
      },
    });
    return coupon;
  }
  async redeemCoupon(userId: number, couponCode: string) {
    await this.couponValidation.validateRedeemCoupon(userId, couponCode);
    const coupon = await prisma.coupon.update({
      where: {
        code: couponCode,
      },
      data: {
        active: false,
      },
    });
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        attempts: 50,
      },
    });
    return coupon;
  }
  private generateRandomDigit() {
    let digit = '';
    for (let i = 0; i < 3; i++) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      digit += randomNum.toString();
    }
    return digit;
  }
  private evaluatePoints(num) {
    const digitString = num.toString();

    if (/^(\d)\1{2}$/.test(digitString)) {
      return 500;
    } else if (/^(123|234|345|456|567|678|789)$/.test(digitString)) {
      return 200;
    } else if (/^(246|468)$/.test(digitString)) {
      return 200;
    } else if (/^(135|357|579)$/.test(digitString)) {
      return 200;
    } else if (/^(159)$/.test(digitString)) {
      return 50;
    } else {
      return 5;
    }
  }
}
