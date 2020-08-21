const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: process.env.TOKEN_SECRET,
};
const jwtLogin = new jwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findOne({ _id: payload.sub });

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	} catch (err) {
		done(null, err);
	}
});

passport.use(jwtLogin);
