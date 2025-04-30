import express from 'express'
import { SignUpUseCase } from '../application/use-cases/sign-up.use-case'
import { SignUpController } from '../application/controllers/sign-up.controller'
import { SignInUseCase } from '../application/use-cases/sign-in.use-case'
import { SignInController } from '../application/controllers/sign-in.controller'
import { makeSignUpUseCase } from '../factories/makeSignUpUseCase'
import { makeSignUpController } from '../factories/makeSignUpController'
import { makeSignInController } from '../factories/makeSignInController'

const app = express()

app.use(express.json())

app.post('/sign-up', async (req, res) => {
  const signUpController = makeSignUpController()

  const { statusCode, body } = await signUpController.handle({ body: req.body })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req, res) => {
  const signInController = makeSignInController()

  const { statusCode, body } = await signInController.handle({ body: req.body })

  res.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001')
})
