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
			set(getDatas);
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	const editSlang = async (SeqSlang, Slang, ActiveYn) => {
		try {
			const options = {
				path: `/assets/slangs/${SeqSlang}`,
				data: {
					Slang,
					ActiveYn,
				},
			};
			const newData = await putApi(options);
			console.log(newData);
		} catch (error) {
			alert("오류가 발생했습니다. 다시 시도해 주세요. ");
		}
	};

	return {
		subscribe,
		fetchSlangs,
		editSlang,
	};
}

export const slangs = setSlangs();
export const menu = writable("");
export const menuSub = writable("");
