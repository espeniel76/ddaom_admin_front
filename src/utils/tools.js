import { Route, Redirect } from "react-router-dom";

export const Tools = {
	OpenWin: (url, name) => {
		let popupX = window.screen.width;
		let popupY = window.screen.height;

		console.log(popupX, popupY);
		popupX = 1;
		popupY = 1;
		console.log(popupX, popupY);

		window.open(url, name, `status=no, height=800px, width=1200px, left=${popupX}px, top=${popupY}px`);
	},
	CheckLogin: () => {
		if (!sessionStorage.getItem("AccessToken")) {
			window.location.href = "/login";
			return false;
		}
	},
	SetActive(refRadioView, setIsView, isBool) {
		if (isBool) {
			refRadioView[0].current.classList.add("active");
			refRadioView[1].current.classList.remove("active");
		} else {
			refRadioView[0].current.classList.remove("active");
			refRadioView[1].current.classList.add("active");
		}
		setIsView(isBool);
	},
};
