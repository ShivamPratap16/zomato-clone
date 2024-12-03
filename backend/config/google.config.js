// backend/config/google.config.js

  import { UserModel } from '../database/user/index.js';
  import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 
export const googleAuthConfig = (passport) => {
  const googleConfig = {
    clientId: '',      // Replace with your actual Client ID
    clientSecret: '',  // Replace with your actual Client Secret
    redirectUri: 'http://localhost:4000/auth/google/callback',  // Replace with your actual Redirect URI
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.redirectUri,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the DB by the  profile id
          let user = await UserModel.findOne({ googleId: profile.id });

          if (!user) {
            // If user doesn't exist, create a new user
            user = await UserModel.create({
              googleId: profile.id,
              fullname: profile.displayName,
              email: profile.emails[0].value, // Assuming the first email is the primary one
              // You can also store the accessToken, refreshToken if you need to
            });
          }

          // Pass the user object to the `done` callback
          return done(null, user);
        } catch (error) {
          console.error('Error during Google OAuth authentication:', error);
          return done(error, false);  // Return false if an error occurs
        }
      }
    )
  );


  passport.serializeUser((user, done) => {
    console.log("Serialized User:", user);
    done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

};
