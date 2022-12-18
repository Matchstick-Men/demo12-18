import { Home } from "../../components/index/Home";
import { Login } from "../../components/login/Login"
import { Registered } from "../../components/login/Registered";
const routers = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/registered',
        element: <Registered />
    },
    {
        path: '/home',
        element: <Home />
    }
]
export default routers;