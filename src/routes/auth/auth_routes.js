import express from "express";
const router = express.Router();
import { registerUser, loginUser, userDetails, store_profile, google_social_auth, store_google_user } from "controllers/auth/auth_controller";
import { auth } from "middlewares/auth_middleware";
import passport from "passport"

// router.post(`/register`, registerUser);
router.post(`/login`, loginUser);
router.get(`/user_details`, auth, userDetails);
router.post(`/create/profile`, auth, store_profile);

router.route('/register').post(registerUser);
// router.route('/:id').get(show).put(update).delete(destory)


// google+ authentications
router.get(`/google`, passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get(`/google/redirect`, passport.authenticate('google'), google_social_auth)


//store user details who is sign in with google
router.post('/store_social_user', store_google_user);




export default router;