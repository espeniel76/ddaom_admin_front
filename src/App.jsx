import GAListener from "components/GAListener";
import { EmptyLayout, LayoutRoute, MainLayout } from "components/Layout";
import PageSpinner from "components/PageSpinner";
import AuthPage from "pages/AuthPage";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CategoryPage from "./pages/part/CategoryPage";
import CategoryPageDetail from "./pages/part/CategoryPageDetail";
import UserStore from "./store/users";
import AdminPage from "./pages/members/AdminPage";
import AdminPageDetail from "./pages/members/AdminPageDetail";
import UserPage from "./pages/members/UserPage";
import UserPageDetail from "./pages/members/UserPageDetail";
import "./styles/reduction.scss";
import ChapterPage from "./pages/study/ChapterPage";
import ChapterPageDetail from "./pages/study/ChapterPageDetail";

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
								<Route exact path="/" children={<ChapterPage />} />
								<Route exact path="/study/chapters" children={<ChapterPage />} />
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
