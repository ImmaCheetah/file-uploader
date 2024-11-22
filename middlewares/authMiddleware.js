module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
    res.status(401).json({msg: 'Not authorized'})
    // next(
    //   new CustomError('Authorization', 'You are not authorized to view this page', 401)
    // )
  }
}