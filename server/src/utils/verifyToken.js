const jwt = require('jsonwebtoken')

// interface UserInfoRequest extends Request {
//   user?: string | jwt.JwtPayload;
// }

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

const verify = (req, res, next) => {
  const bearerHeader = req.header('authorization')

  if (!bearerHeader) {
    return res.status(403).json({success: false, error: 'Forbidden'})
  }

  try {
    const bearerToken = bearerHeader.split(' ')[1]

    const verified = jwt.verify(bearerToken, process.env.SECRET_TOKEN)
    req.user = verified

    // req.user has the user id attached
    // so i can extract id from that
    // to make api calls related to the user

    next()
  } catch (err) {
    return res.status(400).json({success: false, error: 'Invalid token'})
  }
}

module.exports = verify

// FOR FRONT-END
// so when i get bearer token after user logs in
// add that token to auth header when sending requests to backend
// ^ can probably create an axios instance for that
