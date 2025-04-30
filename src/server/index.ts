import express from 'express'
import { makeSignUpController } from '../factories/makeSignUpController'
import { makeSignInController } from '../factories/makeSignInController'
import { routeAdapter } from './adapters/routeAdapter'
import { makeListLeadsController } from '../factories/makeListLeadsController'
import { middlewareAdapter } from './adapters/middlewareAdapter'
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware'
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware'

const app = express()

app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))

app.post('/sign-in', routeAdapter(makeSignInController()))

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController()),
)

app.post(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  (req, res) => {
    res.json({ created: true })
  },
)

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001')
})
