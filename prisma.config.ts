import { config } from 'dotenv'
import path from 'path'

// Load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
}