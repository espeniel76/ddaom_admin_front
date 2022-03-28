import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
	if (!sessionStorage.getItem("AccessToken")) {
		return <Route render={() => <Redirect to={{ pathname: "/login" }} />} />;
	} else {
		return <Route exact path={props.path} children={props.component} />;
	}
}

export default AuthRoute;
