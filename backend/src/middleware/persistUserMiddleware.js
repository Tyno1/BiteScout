const persistUserMiddleware = async (req, res, next) => {
  // Check if user info is available in the request
  if (!req.user) {
    return next();
  }

  // Get user info from the request
  const { sub, email, name, picture, email_verified, locale } = req.userInfo;
  const auth0Id = sub;

  // Store user info in the session
  req.session.user = { name, email, userId: sub, picture };

  // Update or create user in the database
  const user = await User.findOneAndUpdate(
    { auth0Id },
    {
      email,
      name,
      picture,
      lastLogin: new Date(),
      emailVerified: email_verified,
      locale,
    },
    { new: true, upsert: true }
  );

  // Attach database user to request
  req.dbUser = user;

  next();
};
export default persistUserMiddleware;
