import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

export class CouponValidations {
  prisma: PrismaClient;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async validateUserCanPlay(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user!.attempts <= 0) {
      throw new GraphQLError('You have no attempts left');
    }
  }
  async validateUserHasEnoughPoints(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user!.points < 1000) {
      throw new GraphQLError('You have no enough points');
    }
  }
  async validateRedeemCoupon(userId: number, code: string) {
    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code,
      },
    });
    if (!coupon) {
      throw new GraphQLError('Invalid Coupon');
    }
    if (coupon!.userId !== userId) {
      throw new GraphQLError('You are not the owner of this coupon');
    }
    // Check if the coupon is active
    if (!coupon!.active) {
      throw new GraphQLError('This coupon has  already been redeemed');
    }
  }
}
