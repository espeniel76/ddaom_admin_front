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

export const paging = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});

export const slangs = setSlangs();
export const menu = writable("");
export const menuSub = writable("");
