import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
class PrivateRoute extends Component {
	render() {
		// routerConfig 为具体某项路由表信息，详见 --(3) 具体使用
		const { routerConfig, location } = this.props;
		const { pathname } = location;
		const isLogin = localStorage.getItem("name");
		// 如果该路由不用进行权限校验，登录状态下登陆页除外
		// 因为登陆后，无法跳转到登陆页

		// 这部分代码，是为了在需要登陆状态下 进行验证--------------
		if (isLogin) {
			// 如果是登陆状态，想要跳转到登陆，重定向到主页
			if (pathname === "/home") {
				return <Redirect to="/" />;
			} else {
				// 如果路由合法，就跳转到相应的路由
				if (targetRouterConfig) {
					return (<Route path={pathname} component={targetRouterConfig.component} />);
				} else {
					// 如果路由不合法，重定向到 404 页面
					return <Redirect to="/login" />;
				}
			}
		} else {
			// 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
			if (targetRouterConfig && targetRouterConfig.auth) {
				console.log('跳转登录登录')
				return <Redirect to="/login" />;
			}
		}
	}
}
export default PrivateRoute