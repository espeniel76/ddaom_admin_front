import { useEffect, useState } from "react";
import consts from "../define/consts";
import { HttpMethod } from "../models/consts";

export default function (_url, _params, _page) {
	const [data, setData] = useState({
		result_code: "",
		error_desc: "",
		data: [],
	});

	useEffect(() => {
		let token = sessionStorage.getItem("AccessToken");
		let options = {
			method: HttpMethod.GET,
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};
		let url = `${consts.urls.ADMIN_API_SERVER}/api/${_url}?
			PeriodType=${_params.periodType}
			&StartDate=${_params.startDate}
			&EndDate=${_params.endDate}
			&ActiveYn=${_params.activeYn}
			&Search=${_params.search}
			&PageSize=${_page.pageSize}
			&Page=${_page.nowPage}`;
		fetch(url, options)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setData(data);
			});
	}, [_url, _params, _page]);

	return data;
}
