const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const localOptions = {
	usernameField: "email",
};
const localLogin = new LocalStrategy(
	localOptions,
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				return done(null, false);
			}

			const passwordExist = await bcrypt.compare(password, user.password);

			if (!passwordExist) {
				return done(null, false);
			}
			return done(null, user);
		} catch (err) {
			return done(null, err);
		}
	}
);

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
passport.use(localLogin);
