import consts from "../define/consts";
import { HttpMethod } from "../models/consts";

export const Ajax = {
	run: async (o) => {
		let token = sessionStorage.getItem("AccessToken");
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${o.url}`;
		let retVal = await fetch(url, {
			method: o.method,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			mode: "cors",
			credentials: "include",
			body: JSON.stringify(o.data),
		}).then((response) => {
			return response.json();
		});
		console.log(retVal);
		return retVal;
	},
	runGet: async (o) => {
		let token = sessionStorage.getItem("AccessToken");
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${o.url}`;
		let retVal = await fetch(url, {
			method: o.method,
			headers: {
				"Content-Type": "text/plain",
				Authorization: token,
			},
			mode: "cors",
			credentials: "include",
		}).then((response) => {
			return response.json();
		});
		console.log(retVal);
		return retVal;
	},
	runListCommon: async (_url, _params, _page) => {
		let token = sessionStorage.getItem("AccessToken");
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${_url}?
			PeriodType=${_params.periodType}
			&StartDate=${_params.startDate}
			&EndDate=${_params.endDate}
			&ActiveYn=${_params.activeYn}
			&Type=${_params.type}
			&Search=${_params.search}
			&PageSize=${_page.pageSize}
			&Page=${_page.nowPage}`;
		let retVal = await fetch(url, {
			method: HttpMethod.GET,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			mode: "cors",
			credentials: "include",
		}).then((response) => {
			return response.json();
		});
		return retVal;
	},
	runListCommonStudy: async (_url, _params, _page, _seq) => {
		let token = sessionStorage.getItem("AccessToken");
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${_url}?
			&ActiveYn=${_params.activeYn}
			&BasicYn=${_params.basicYn}
			&PageSize=${_page.pageSize}
			&Page=${_page.nowPage}
			&SeqChapter=${_seq}`;
		let retVal = await fetch(url, {
			method: HttpMethod.GET,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			mode: "cors",
			credentials: "include",
		}).then((response) => {
			return response.json();
		});
		return retVal;
	},
	runFile: async (o) => {
		let token = sessionStorage.getItem("AccessToken");
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${o.url}`;
		let retVal = await fetch(url, {
			method: o.method,
			mode: "cors",
			headers: {
				Authorization: token,
			},
			credentials: "include",
			body: o.data,
		}).then((response) => {
			return response.json();
		});
		return retVal;
	},
};
