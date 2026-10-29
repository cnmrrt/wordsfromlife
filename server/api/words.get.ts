import { defineEventHandler } from 'h3'
import { readWords } from '../utils/wordsContent'

export default defineEventHandler(() => readWords())
