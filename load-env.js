import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set NODE_ENV if not already set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// First load default .env file
config({ path: resolve(__dirname, '.env.local') });

// Then load environment-specific file if it exists
const envPath = resolve(__dirname, `.env.${process.env.NODE_ENV}`);
if (fs.existsSync(envPath)) {
  console.log(`Loading environment from ${envPath}`);
  const result = config({ path: envPath, override: true });
  
  if (result.error) {
    console.error(`Error loading ${envPath}:`, result.error);
  } else {
    console.log(`Successfully loaded environment variables from ${envPath}`);
    console.log(`PORT from env: ${process.env.PORT}`);
  }
} else {
  console.warn(`Environment file ${envPath} not found`);
} 