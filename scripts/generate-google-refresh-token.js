/**
 * Generate Google OAuth Refresh Token
 *
 * This script helps you generate a refresh token for Google Search Console API.
 * Run this once during initial setup.
 *
 * Prerequisites:
 * 1. Created Google Cloud Project
 * 2. Enabled Google Search Console API
 * 3. Created OAuth 2.0 Client ID (Desktop app)
 * 4. Have Client ID and Client Secret
 *
 * Usage:
 *   node scripts/generate-google-refresh-token.js
 *
 * Follow the prompts:
 * 1. Enter your Client ID
 * 2. Enter your Client Secret
 * 3. Visit the authorization URL
 * 4. Sign in and authorize
 * 5. Copy the authorization code
 * 6. Paste it when prompted
 * 7. Copy the refresh token to your .env.local file
 */

const { google } = require('googleapis')
const readline = require('readline')

const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function generateRefreshToken() {
  try {
    console.log('🔐 Google Search Console OAuth Setup\n')
    console.log('This script will help you generate a refresh token for the Search Console API.\n')

    // Step 1: Get Client ID
    const clientId = await question('Enter your Google Client ID: ')
    if (!clientId || !clientId.includes('apps.googleusercontent.com')) {
      console.error('❌ Invalid Client ID format')
      process.exit(1)
    }

    // Step 2: Get Client Secret
    const clientSecret = await question('Enter your Google Client Secret: ')
    if (!clientSecret) {
      console.error('❌ Client Secret is required')
      process.exit(1)
    }

    console.log('\n✅ Credentials received\n')

    // Step 3: Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI)

    // Step 4: Generate authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent', // Force consent screen to get refresh token
    })

    console.log('📋 Step 1: Authorize this app by visiting this URL:\n')
    console.log(authUrl)
    console.log('\n')

    // Step 5: Get authorization code
    const code = await question('📋 Step 2: Enter the authorization code from that page: ')
    if (!code) {
      console.error('❌ Authorization code is required')
      process.exit(1)
    }

    console.log('\n⏳ Exchanging code for tokens...\n')

    // Step 6: Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token) {
      console.error('❌ No refresh token received. Try again with prompt=consent.')
      process.exit(1)
    }

    // Step 7: Display results
    console.log('✅ Success! Your refresh token:\n')
    console.log('━'.repeat(70))
    console.log(tokens.refresh_token)
    console.log('━'.repeat(70))
    console.log('\n📝 Add this to your .env.local file:\n')
    console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`)
    console.log('\n✅ Setup complete!\n')

    rl.close()
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    rl.close()
    process.exit(1)
  }
}

// Run the script
generateRefreshToken()
