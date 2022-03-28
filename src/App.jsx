import GAListener from "components/GAListener";
import { EmptyLayout, LayoutRoute, MainLayout } from "components/Layout";
import PageSpinner from "components/PageSpinner";
import AuthPage from "pages/AuthPage";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UserStore from "./store/users";
import "./styles/reduction.scss";
import Genres from "./pages/assets/Genres";

const getBasename = () => {
	return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

function App() {
	return (
		<BrowserRouter basename={getBasename()}>
			<UserStore>
				<GAListener>
					<Switch>
						<LayoutRoute exact path="/login" layout={EmptyLayout} component={() => <AuthPage />} />
						<MainLayout>
							<React.Suspense fallback={<PageSpinner />}>
								<Route exact path="/" children={<Genres />} />
								<Route exact path="/assets/genres" children={<Genres />} />
							</React.Suspense>
						</MainLayout>
						<Redirect to="/" />
					</Switch>
				</GAListener>
			</UserStore>
		</BrowserRouter>
	);
}

export default App;
