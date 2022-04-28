import axios from "axios";
import consts from "../define/consts";

const send = async ({ method = "", path = "", data = {} } = {}) => {
	const url = consts.urls.ADMIN_API_SERVER + path;
	const getToken = sessionStorage.getItem("AccessToken");
	const headers = {
		"Content-Type": "application/json",
		Authorization: getToken,
	};
	const options = {
		method,
		url,
		headers,
		data,
	};
	try {
		const response = await axios(options);
		return response.data;
	} catch (error) {
		// throw error;
		console.log(error);
		const response = await axios(options);
		return response.data;
	}
};

const getApi = (path) => {
	return send({ method: "GET", path: path });
};
const putApi = (path, data) => {
	return send({ method: "PUT", path, data });
};
const postApi = (path, data) => {
	return send({ method: "POST", path, data });
};
const delApi = (path, data) => {
	return send({ method: "DELETE", path, data });
};
const sendFile = async ({ method = "", path = "", data = {} } = {}) => {
	const url = consts.urls.ADMIN_API_SERVER + path;
	const getToken = sessionStorage.getItem("AccessToken");
	const headers = {
		Authorization: getToken,
	};
	const options = {
		method,
		url,
		headers,
		data,
	};
	try {
		const response = await axios(options);
		return response.data;
	} catch (error) {
		const response = await axios(options);
		return response.data;
	}
};
const putFileApi = (path, data) => {
	return sendFile({ method: "PUT", path, data });
};
const postFileApi = (path, data) => {
	return sendFile({ method: "POST", path, data });
};

export { getApi, putApi, postApi, delApi, putFileApi, postFileApi };
