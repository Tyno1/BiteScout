import User from "../models/User.js";
import userType from "../models/UserType.js";

const persistUserMiddleware = async (req, res, next) => {
  try {
    // Check if user info is available in the request
    if (!req.userInfo) {
      return next();
    }

    // Get user info from the request
    const { sub, email, name, picture, email_verified, locale } = req.userInfo;
    const auth0Id = sub;

    // check if session has been initialized
    if (req.session) {
      req.session.user = { name, email, userId: sub, picture };
    } else {
      return next();
    }

    // Find the user
    let user = await User.findOne({ auth0Id: auth0Id });

    const lowestPrivilegeType = await userType
      .findOne()
      .sort({ level: -1 })
      .limit(1);

    if (!lowestPrivilegeType) {
      console.error("No lowest privilege type found.");
      return next(); // Return early if no lowest privilege type is found.
    }


    if (user) {
      (user.email = email),
        (user.name = name),
        (user.picture = picture),
        (user.lastLogin = new Date()),
        (user.emailVerified = email_verified),
        (user.locale = locale),
        (user.userType = lowestPrivilegeType._id);
      await user.save();
    } else {
      user = await User.create({
        auth0Id,
        email,
        name,
        picture,
        lastLogin: new Date(),
        emailVerified: email_verified,
        userType: lowestPrivilegeType._id,
        locale,
      });
    }

    // Attach database user to request
    req.dbUser = user;

    next();
  } catch (error) {
    console.error("Error persisting user:", error);
    next(error);
  }
};
export default persistUserMiddleware;
