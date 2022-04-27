import { writable, get } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "./service/api";

let initListValues = {
	ResultCode: "",
	ErrorDesc: "",
	Data: {
		TotalCount: 0,
		List: [],
	},
};

function setSlangs() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchSlangs = async (ActiveYn, Search, PageSize, Page) => {
		try {
			const getDatas = await getApi(`/assets/slangs?ActiveYn=${ActiveYn}&Search=${Search}&PageSize=${PageSize}&Page=${Page}`);
			if (getDatas.ResultCode !== "OK") {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const editSlang = async (SeqSlang, Slang, ActiveYn) => {
		try {
			const newData = await putApi(`/assets/slangs/${SeqSlang}`, {
				Slang,
				ActiveYn,
			});
			if (newData.ResultCode !== "OK") {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const saveSlang = async (Slang, ActiveYn) => {
		try {
			const newData = await postApi(`/assets/slangs`, {
				Slang,
				ActiveYn,
			});
			if (newData.ResultCode !== "OK") {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	return {
		subscribe,
		fetchSlangs,
		editSlang,
		saveSlang,
	};
}
function setGenres() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchGenres = async (ActiveYn, Search, PageSize, Page) => {
		try {
			const getDatas = await getApi(`/assets/genres?ActiveYn=${ActiveYn}&Search=${Search}&PageSize=${PageSize}&Page=${Page}`);
			if (getDatas.ResultCode !== "OK") {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const editGenre = async (SeqGenre, Genre, ActiveYn) => {
		try {
			const newData = await putApi(`/assets/genres/${SeqGenre}`, {
				Genre,
				ActiveYn,
			});
			if (newData.ResultCode !== "OK") {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const saveGenre = async (Genre, ActiveYn) => {
		try {
			const newData = await postApi(`/assets/genres`, {
				Genre,
				ActiveYn,
			});
			if (newData.ResultCode !== "OK") {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			console.log(error);
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	return {
		subscribe,
		fetchGenres,
		editGenre,
		saveGenre,
	};
}
function setKeywords() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchKeywords = async (o, PageSize, Page) => {
		let url = `/assets/keywords?ActiveYn=${o.ActiveYn}&ProcessYn=${o.ProcessYn}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Keyword}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== "OK") {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const getKeyword = async (SeqKeyword) => {
		let url = `/assets/keywords/${SeqKeyword}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const editKeyword = async (SeqKeyword, Keyword, ActiveYn, StartDate, EndDate) => {
		try {
			const newData = await putApi(`/assets/keywords/${SeqKeyword}`, {
				Keyword,
				ActiveYn,
				StartDate,
				EndDate,
			});
			return newData;
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const saveKeyword = async (Keyword, ActiveYn, StartDate, EndDate) => {
		try {
			const newData = await postApi(`/assets/keywords`, {
				Keyword,
				ActiveYn,
				StartDate,
				EndDate,
			});
			return newData;
		} catch (error) {
			console.log(error);
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	return {
		subscribe,
		fetchKeywords,
		getKeyword,
		editKeyword,
		saveKeyword,
	};
}

export const paging = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});

export const menu = writable("");
export const menuSub = writable("");
export const slangs = setSlangs();
export const genres = setGenres();
export const keywords = setKeywords();
