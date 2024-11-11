import { Prisma } from '@prisma/client';
const userWithoutPasswordSelect = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    dob: true,
    attempts: true,
    points: true,
  },
});
export type SanitizedUser = Prisma.UserGetPayload<
  typeof userWithoutPasswordSelect
>;
