import passport from "passport"
import GoogleStrategy from "passport-google-oauth2"
import models from "models/index";


// The USER object is the "authenticated user" from the done() in authUser function.
// serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

passport.serializeUser((user, done) => {
    done(null, user.id)
})


// This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
// deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

passport.deserializeUser(async (id, done) => {
    const user = await models.User.findById(id);
    done(null, user);
})


passport.use(new GoogleStrategy({
    clientID: '460555740632-ju1vfl67j2qo8495l8mokkiqoc0l3akf.apps.googleusercontent.com',
    clientSecret: 'Iu7vTL23BLYsawoShT3NWSOq',
    callbackURL:'/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {

    const _user = await models.User.findOne({social_id:profile.id})
    if(_user){
        done(null, _user);
    }else{
        const _newUser = await new models.User({
            social_id : profile.id,
            email     : profile.email,
            fname     : profile.name.givenName,
            lname     : profile.name.familyName,
            thumbnail : profile.photos[0].value   
        }).save();

        done(null, _newUser);

    }
}))


