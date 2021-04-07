"use strict";

import passportJwt from "passport-jwt";

import { JWT } from "../settings/consts";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.KEY,
};

// const auth = async (passport) => {
// 	passport.use(new JwtStrategy(opts, async (jwtpayload, done) => {
// 		try {
// 			if (jwtpayload.token_type === 'access') {
// 				const user = await AuthUserDataAccess.findByPk(jwtpayload.user_id, {
// 					include: [{
// 						model: AuthGroup,
// 						through: {
// 							attributes: []
// 						}
// 					}],
// 				});
// 				if (user && user.id && user.is_active) {
// 					return done(null, user);
// 				}
// 				return done(null, false);
// 			} else {
// 				return done('Invalid token', false);
// 			}
// 		} catch (e) {
// 			return done(e, false);
// 		}
// 	}));
// };

// export {
// 	auth
// };
