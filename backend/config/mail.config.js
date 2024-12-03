import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name from the current file's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv
dotenv.config({
  path: resolve(__dirname, '../.env'),  // Use resolve for path handling
});

// Initialize and return Mailgun client
export function initializeMailgun() {
  return mailgun({
    apiKey: process.env.MAILGUN__API__KEY,
    domain: process.env.MAILGUN__DOMAIN,
  });
}
