import axios from "axios";

const send = async ({ method = "", path = "", data = {} } = {}) => {
	// const commonUrl = "http://192.168.0.17:3013/api";
	const commonUrl = "http://192.168.1.20:3013/api";
	const url = commonUrl + path;
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
		throw error;
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

export { getApi, putApi, postApi, delApi };
