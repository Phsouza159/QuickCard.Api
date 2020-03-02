const jwt = require('jsonwebtoken')
  , authConfig = require('@config/autenticacao.json')
  , UnauthorizedException = require('@exception/unauthorizedException')
  , codHttp = require('@enum/codHttp')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(codHttp.authorizationRequired)
      .send( new UnauthorizedException('No tokens provided'))

  const parts = authHeader.split(' ')

  if (!parts.length === 2)
    return res.status(codHttp.authorizationRequired)
      .send(new UnauthorizedException('Token error'))

  const [ scheme, token ] = parts;
  
  if (!/^Bearer$/i.test(scheme))
    return res.status(codHttp.authorizationRequired)
      .send(new UnauthorizedException('Badly formatted token'))

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) 
      return res.status(codHttp.authorizationRequired)
        .send(new UnauthorizedException('invalid token'))

    req._user = decoded

    return next()
  });
};