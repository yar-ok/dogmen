import SplashContainer from '../containers/SplashContainer'
import Login from '../containers/Login'
import Dashboard from '../containers/Dashboard'
import ForgotPassword from '../containers/ForgotPassword'
import SignUp from '../containers/SignUp'
import Welcome from '../containers/Welcome'
import PendingOrders from '../containers/PendingOrders'

import Camera from '../containers/ios/CameraScreen'

// import {
//   SplashContainer,
//   Login,
//   Dashboard,
//   ForgotPassword ,
//   SignUp,
//   Welcome
// } from '../containers'

const Stack = {
  Splash: { screen: SplashContainer },
  Login: { screen: Login },
  Dashboard: { screen: Dashboard },
  ForgotPassword: { screen: ForgotPassword },
  SignUp: { screen: SignUp },
  Welcome: { screen: Welcome },
  Camera: { screen: Camera },
  PendingOrders: { screen: PendingOrders },
}

export default Stack
