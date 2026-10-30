import { defineEventHandler } from 'h3'
import { fetchWordIndex } from '../../utils/supabaseWords'

export default defineEventHandler(event => fetchWordIndex(event))
