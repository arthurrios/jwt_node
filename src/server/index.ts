import express from 'express'
import { SignUpUseCase } from '../application/use-cases/sign-up.use-case'
import { SignUpController } from '../application/controllers/sign-up.controller'
import { SignInUseCase } from '../application/use-cases/sign-in.use-case'
import { SignInController } from '../application/controllers/sign-in.controller'

const app = express()

app.use(express.json())

app.post('/sign-up', async (req, res) => {
  const SALT = 12
  const signUpUseCase = new SignUpUseCase(SALT)
  const signUpController = new SignUpController(signUpUseCase)

  const { statusCode, body } = await signUpController.handle({ body: req.body })

  res.status(statusCode).json(body)
})

app.post('/sign-in', async (req, res) => {
  const signInUseCase = new SignInUseCase()
  const signInController = new SignInController(signInUseCase)

  const { statusCode, body } = await signInController.handle({ body: req.body })

  res.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log('Server started at http://localhost:3001')
})
