import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../../auth/Auth";
import { Home } from "../../components/index/Home";
import { Login } from "../../components/login/Login"
import { Registered } from "../../components/Registered/Registered";
const routes = [
    {
        name: 'login',
        path: '/login',
        element: <Login />
    },
    {
        name: 'registered',
        path: '/registered',
        element: <Registered />
    },
    {
        name: 'home',
        path: '/home',
        element: <Home />,
        meta: {
            isLogin: true
        }

    },
    { path: '/', name: 'disabled', element: <Navigate to="/home" /> }
]

const routesMap = () => {

    const fn = (routes) => {

        return routes.map(route =>
            <Route
                key={route.name}
                path={route.path}
                element={
                    route.meta?.isLogin
                        ? <Auth target={route.element} />
                        : route.element
                }
            >
                {route.children
                    ? fn(route.children)
                    : ''
                }
            </Route>

        )

    }

    return (
        <Routes>
            {fn(routes)}
        </Routes>
    )
}
export default routesMap();