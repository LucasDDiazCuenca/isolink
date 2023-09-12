import context from './context'
import { utils } from 'com'

const { isTokenValid, isTokenAlive } = utils

export default () => isTokenValid(context.token) && isTokenAlive(context.token)