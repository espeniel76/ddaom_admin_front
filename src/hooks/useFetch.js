import { useEffect, useState } from "react";
import consts from "../define/consts";
import { HttpMethod } from "../models/consts";

export default function (url, httpMethod, tData) {
	const [data, setData] = useState({
		result_code: "",
		error_desc: "",
		data: [],
	});

	useEffect(() => {
		let token = sessionStorage.getItem("AccessToken")
			? sessionStorage.getItem("AccessToken")
			: null;

		let options = {
			method: httpMethod,
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		switch (httpMethod) {
			case HttpMethod.POST:
				if (tData) {
					options.body = JSON.stringify(tData);
				}
				break;
			default:
				break;
		}

		fetch(`${consts.urls.ADMIN_API_SERVER}/api/${url}`, options)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setData(data);
			});
	}, [url, httpMethod, tData]);

	return data;
}
