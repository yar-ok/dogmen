import SplashContainer from '../containers/SplashContainer'
import Login from '../containers/Login'
import Dashboard from '../containers/Dashboard'
import ForgotPassword from '../containers/ForgotPassword'
import SignUp from '../containers/SignUp'
import Welcome from '../containers/Welcome'
import Camera from '../containers/ios/CameraScreen'

const Stack = {
  Splash: { screen: SplashContainer },
  Login: { screen: Login },
  Dashboard: { screen: Dashboard },
  ForgotPassword: { screen: ForgotPassword },
  SignUp: { screen: SignUp },
  Welcome: { screen: Welcome },
  Camera: { screen: Camera },
}

export default Stack
