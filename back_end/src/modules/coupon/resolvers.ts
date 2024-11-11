import prisma from '../../db/db';
import authenticationMiddleware from '../../middlewares/authentication.middleware';
import { Resolvers } from './generated-types/coupon-resolvers-types';
import CouponService from './services/coupon.service';
const services = new CouponService();
export const couponResolver: Resolvers = {
  Query: {
    getCoupons: authenticationMiddleware((parent, args, context) => {
      return services.getCouponsOfUser(context.user.id);
    }),
  },
  Mutation: {
    createCoupon: authenticationMiddleware((parent, args, context) => {
      return services.createCoupon(context.user.id, args.coupon);
    }),
    startGame: authenticationMiddleware((parent, args, context) => {
      return services.startGame(context.user.id, args.randomNumber);
    }),
    redeemCoupon: authenticationMiddleware((parent, args, context) => {
      return services.redeemCoupon(context.user.id, args.couponCode);
    }),
  },
};
