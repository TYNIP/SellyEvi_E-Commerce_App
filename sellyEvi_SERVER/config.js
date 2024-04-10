module.exports = {
    PORT: process.env.PORT,
    allowedDomains: (process.env.NODE_ENV === 'production' ? [
      process.env.REMOTE_CLIENT_APP, 
      process.env.REMOTE_SERVER_API
      ] : 
      [process.env.LOCAL_CLIENT_APP, 
      process.env.LOCAL_SERVER_API
    ]),
    DB: {
        PGHOST : process.env.PGHOST,
        PGUSER: process.env.PGUSER,
        PGDATABASE: process.env.PGDATABASE,
        PGPASSWORD: process.env.PGPASSWORD,
        PGPORT: process.env.PGPORT
    },
    FACEBOOK: {
        CALLBACK_URL: (process.env.NODE_ENV === 'production' ? process.env.REMOTE_FACEBOOK_CALLBACK_URL : process.env.LOCAL_FACEBOOK_CALLBACK_URL),
        CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
        CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET
      },
    GOOGLE: {
        CALLBACK_URL: (process.env.NODE_ENV === 'production' ? process.env.REMOTE_GOOGLE_CALLBACK_URL:process.env.LOCAL_GOOGLE_CALLBACK_URL),
        CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
        CONSUMER_SECRET: process.env.GOOGLE_CONSUMER_SECRET
      },
    SESSION_SECRET: process.env.SESSION_SECRET,
    CH_OUT: process.env.CH_OUT
}