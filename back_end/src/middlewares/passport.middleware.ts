import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../config';
import prisma from '../db/db';
import UserService from '../modules/user/services/user.service';
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};
async function checkUserExistsAndIsValid(id: number) {
  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  const result = await new UserService().checkIfUserCanPlay(id);
  return !userExists ? undefined : userExists;
}
export default (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await checkUserExistsAndIsValid(payload.id)
        .then(async (user) => {
          if (user) {
            return done(undefined, user);
          }
          return done(undefined, false);
        })
        .catch((err) => {
          done(err, false);
        });
    })
  );
};
