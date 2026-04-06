import { config } from 'dotenv'
import path from 'path'

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') })

export default {
  datasource: {
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
}