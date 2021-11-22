function isRoaster(req, res, next) {
    if (req.session.user.profileType !== "roaster" ) {
      return res.redirect('/login');
    }
    next();
  }

  module.exports = isRoaster;