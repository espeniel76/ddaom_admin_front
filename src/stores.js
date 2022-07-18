import { onMount } from 'svelte';
import { writable, get } from 'svelte/store';
import {
	getApi,
	putApi,
	delApi,
	postApi,
	postFileApi,
	putFileApi,
} from './service/api';

let initListValues = {
	ResultCode: '',
	ErrorDesc: '',
	Data: {
		TotalCount: 0,
		List: [],
	},
};

function setMainAll() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/all?Sort=${o.Sort}&ProcessYn=${o.ProcessYn}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Keyword}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetch,
	};
}
function setMainFinish() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (SeqKeyword) => {
		let url = `/main/all/finishes/${SeqKeyword}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetch,
	};
}
function setMainDeletedAll() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/deleted/all?PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await postApi(url, o);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	const get = async (SeqNovelDelete, Step) => {
		let url = `/main/deleted/all/${SeqNovelDelete}/${Step}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetch,
		get,
	};
}
function setNovelStep1() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/all/step1?Sort=${o.Sort}&SeqKeyword=${o.SeqKeyword}&SeqGenre=${o.SeqGenre}&Search=${o.Search}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetch,
	};
}
function setNovelStep2() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/all/step234?Step=2&Sort=${o.Sort}&SeqNovelStep1=${o.SeqNovelStep1}&Search=${o.Search}&PageSize=${PageSize}&Page=${Page}&Deleted=${o.Deleted}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetch,
	};
}
function setNovelStep3() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/all/step234?Step=3&Sort=${o.Sort}&SeqNovelStep1=${o.SeqNovelStep1}&Search=${o.Search}&PageSize=${PageSize}&Page=${Page}&Deleted=${o.Deleted}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetch,
	};
}
function setNovelStep4() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (o, PageSize, Page) => {
		let url = `/main/all/step234?Step=4&Sort=${o.Sort}&SeqNovelStep1=${o.SeqNovelStep1}&Search=${o.Search}&PageSize=${PageSize}&Page=${Page}&Deleted=${o.Deleted}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetch,
	};
}
function setSlangs() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchSlangs = async (ActiveYn, Search, PageSize, Page) => {
		try {
			const getDatas = await getApi(
				`/assets/slangs?ActiveYn=${ActiveYn}&Search=${Search}&PageSize=${PageSize}&Page=${Page}`
			);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editSlang = async (SeqSlang, Slang, ActiveYn) => {
		try {
			const newData = await putApi(`/assets/slangs/${SeqSlang}`, {
				Slang,
				ActiveYn,
			});
			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const saveSlang = async (Slang, ActiveYn) => {
		try {
			const newData = await postApi(`/assets/slangs`, {
				Slang,
				ActiveYn,
			});
			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
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
			const getDatas = await getApi(
				`/assets/genres?ActiveYn=${ActiveYn}&Search=${Search}&PageSize=${PageSize}&Page=${Page}`
			);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editGenre = async (SeqGenre, Genre, ActiveYn) => {
		try {
			const newData = await putApi(`/assets/genres/${SeqGenre}`, {
				Genre,
				ActiveYn,
			});
			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const saveGenre = async (Genre, ActiveYn) => {
		try {
			const newData = await postApi(`/assets/genres`, {
				Genre,
				ActiveYn,
			});
			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
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
		let url = `/assets/keywords?Sort=${o.Sort}&ActiveYn=${o.ActiveYn}&ProcessYn=${o.ProcessYn}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Keyword}&PageSize=${PageSize}&Page=${Page}`;

		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const getKeyword = async (SeqKeyword) => {
		let url = `/assets/keywords/${SeqKeyword}`;
		try {
			const getDatas = await getApi(url);

			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editKeyword = async (
		SeqKeyword,
		Keyword,
		ActiveYn,
		StartDate,
		EndDate
	) => {
		try {
			const newData = await putApi(`/assets/keywords/${SeqKeyword}`, {
				Keyword,
				ActiveYn,
				StartDate,
				EndDate,
			});
			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
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
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const delKeyword = async (idList) => {
		let url = `/assets/keywords`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				// alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetchKeywords,
		getKeyword,
		editKeyword,
		saveKeyword,
		delKeyword,
	};
}

function setColors() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetch = async (o, PageSize, Page) => {
		let url = `/assets/colors?ActiveYn=${o.ActiveYn}&Search=${o.Color}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const get = async (SeqColor) => {
		let url = `/assets/colors/${SeqColor}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const edit = async (SeqColor, Name, Color, ActiveYn) => {
		try {
			const newData = await putApi(`/assets/colors/${SeqColor}`, {
				Name,
				Color,
				ActiveYn,
			});
			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const save = async (Name, Color, ActiveYn) => {
		try {
			const newData = await postApi(`/assets/colors`, {
				Name,
				Color,
				ActiveYn,
			});
			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const delColors = async (idList) => {
		let url = `/assets/colors`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetch,
		get,
		edit,
		save,
		delColors,
	};
}
function setImages() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetch = async (o, PageSize, Page) => {
		let url = `/assets/images?ActiveYn=${o.ActiveYn}&Search=${o.Name}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const get = async (SeqImage) => {
		let url = `/assets/images/${SeqImage}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const save = async (Name, Image, ActiveYn) => {
		var data = new FormData();
		data.append('Name', Name);
		data.append('ActiveYn', ActiveYn);
		data.append('Image', Image.files[0]);
		try {
			const newData = await postFileApi(`/assets/images`, data);
			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const edit = async (SeqImage, Name, Image, ActiveYn) => {
		var data = new FormData();
		data.append('Name', Name);
		data.append('ActiveYn', ActiveYn);
		data.append('Image', Image.files[0]);
		try {
			const newData = await putFileApi(
				`/assets/images/${SeqImage}`,
				data
			);
			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const delImages = async (idList) => {
		let url = `/assets/images`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	return {
		subscribe,
		fetch,
		get,
		edit,
		save,
		delImages,
	};
}
function setDeleteNovel() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const saveStep1 = async (o) => {
		try {
			const newData = await postApi(`/main/deleted/step1`, {
				Step: o.step,
				SeqNovel: o.seqNovel,
				ReasonDelete: o.reasonDelete,
				TypeDelete: o.typeDelete,
			});
			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		saveStep1,
	};
}

function setNotice() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchNotice = async (o, PageSize, Page) => {
		let url = `/cs/notices?ActiveYn=${o.ActiveYn}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Notice}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.1');
		}
	};

	const getNotice = async (SeqNotice) => {
		let url = `/cs/notices/${SeqNotice}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editNotice = async (
		SeqNotice,
		Title,
		Content,
		ActiveYn,
		StartDate,
		EndDate
	) => {
		try {
			const newData = await putApi(`/cs/notices/${SeqNotice}`, {
				Title,
				Content,
				ActiveYn,
				StartDate,
				EndDate,
			});

			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const saveNotice = async (Title, Content, ActiveYn, StartDate, EndDate) => {
		try {
			const newData = await postApi(`/cs/notices`, {
				Title,
				Content,
				ActiveYn,
				StartDate,
				EndDate,
			});

			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const delNotice = async (idList) => {
		let url = `/cs/notices`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				// alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetchNotice,
		getNotice,
		editNotice,
		saveNotice,
		delNotice,
	};
}

function setFaq() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchFaq = async (o, PageSize, Page) => {
		let url = `/cs/faqs?ActiveYn=${o.ActiveYn}&faqCategory=${o.oCategory}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Faq}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	const getFaq = async (SeqFaq) => {
		let url = `/cs/faqs/${SeqFaq}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editFaq = async (
		SeqFaq,
		faqCategory,
		Title,
		Content,
		ActiveYn,
		StartDate,
		EndDate
	) => {
		try {
			const newData = await putApi(`/cs/faqs/${SeqFaq}`, {
				SeqFaq,
				faqCategory,
				Title,
				Content,
				ActiveYn,
				StartDate,
				EndDate,
			});

			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const saveFaq = async (
		faqCategory,
		Title,
		Content,
		ActiveYn,
		StartDate,
		EndDate
	) => {
		try {
			const newData = await postApi(`/cs/faqs`, {
				faqCategory,
				Title,
				Content,
				ActiveYn,
				StartDate,
				EndDate,
			});

			return newData;
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const delFaq = async (idList) => {
		let url = `/cs/faqs`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				// alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetchFaq,
		getFaq,
		editFaq,
		saveFaq,
		delFaq,
	};
}

//나중에 한번에 카테고리리스트 + 카테고리탭 합치기
function setCategoryFaq() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchCategoryFaq = async () => {
		let url = `/cs/faqs/category`;
		console.log(url);
		try {
			const getDatas = await getApi(url);
			console.log(getDatas);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	return {
		subscribe,
		fetchCategoryFaq,
	};
}

//CategoryList
function setCategoryFaqList() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchCategoryList = async (ActiveYn, Search, PageSize, Page) => {
		try {
			const getDatas = await getApi(
				`/cs/categoryFaqs?ActiveYn=${ActiveYn}&Search=${Search}&PageSize=${PageSize}&Page=${Page}`
			);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editCategoryList = async (SeqCategoryFaqs, Category, ActiveYn) => {
		try {
			const newData = await putApi(
				`/cs/categoryFaqs/${SeqCategoryFaqs}`,
				{
					Category,
					ActiveYn,
				}
			);
			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const saveCategoryList = async (Category, ActiveYn) => {
		try {
			const newData = await postApi(`/cs/categoryFaqs`, {
				Category,
				ActiveYn,
			});

			if (newData.ResultCode !== 'OK') {
				alert(newData.ErrorDesc);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	const delsaveCategoryList = async (idList) => {
		let url = `/cs/CategoryFaqs`;
		try {
			const getDatas = await delApi(url, idList);
			if (getDatas.ResultCode !== 'OK') {
				// alert(getDatas.ErrorDesc);
				alert('삭제리스트 체크하기');
			} else {
				alert('삭제확인');
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetchCategoryList,
		editCategoryList,
		saveCategoryList,
		delsaveCategoryList,
	};
}

function setInquiries() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const fetchInquiries = async (o, PageSize, Page) => {
		let url = `/cs/inquiries?Status=${o.Status}&StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.Inquiries}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	const getInquiries = async (SeqServiceInquiry) => {
		let url = `/cs/inquiries/${SeqServiceInquiry}`;

		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editInquiries = async (
		SeqServiceInquiry,
		Status,
		Answer,
		StartDate,
		EndDate,
		Title,
		SeqMember
	) => {
		try {
			const newData = await putApi(`/cs/inquiries/${SeqServiceInquiry}`, {
				SeqServiceInquiry,
				Status,
				Answer,
				StartDate,
				EndDate,
				Title,
				SeqMember,
			});

			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	//
	return {
		subscribe,
		fetchInquiries,
		getInquiries,
		editInquiries,
	};
}

function setMemberInformation() {
	let values = { ...initListValues };
	//////
	const { subscribe, set, update } = writable(values);

	const fetchMemberInformation = async (o, PageSize, Page) => {
		let url = `/memberInfo/memberInformation?StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.NickName}&BlackedYn=${o.BlackedYn}&ActiveYn=${o.ActiveYn}&DateSelect=${o.DateSelect}&Value=${o.Value}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);
			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	const getMemberInformation = async (seqMemberDtail, allocatedDb) => {
		let url = `/memberInfo/memberInformation/seqMemberDtail?seqMemberDtail=${seqMemberDtail}&allocatedDb=${allocatedDb}`;
		try {
			const getDatas = await getApi(url);
			return getDatas;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	const editMemberInformation = async (
		SeqMember,
		isBlocked,
		BlockedReason,
		StartDate
	) => {
		try {
			const newData = await putApi(
				`/memberInfo/memberInformation/${SeqMember}`,
				{
					SeqMember,
					isBlocked,
					BlockedReason,
					StartDate,
				}
			);
			return newData;
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetchMemberInformation,
		getMemberInformation,
		editMemberInformation,
	};
}
function setMemberInformationList() {
	let values = { ...initListValues };

	const { subscribe, set, update } = writable(values);

	const setMemberInformationList = async (SeqMember, PageSize, Page) => {
		let url = `/memberInfo/memberInformationList/ListData?SeqMember=${SeqMember}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			console.log(error);
			alert('오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	return {
		subscribe,
		setMemberInformationList,
	};
}

function setNobel() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetch = async (SeqMember, novelStep, step) => {
		let url = `/memberInfo/memberInformationList/novelData?SeqMember=${SeqMember}&step=${step}&novelStep=${novelStep}`;
		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};

	return {
		subscribe,
		fetch,
	};
}
// novelLog
function setMemLog() {
	let values = { ...initListValues };
	const { subscribe, set, update } = writable(values);
	const fetchLog = async (SeqMember, PageSize, Page) => {
		let url = `/memberInfo/memberInformationList/ListLog?SeqMember=${SeqMember}&PageSize=${PageSize}&Page=${Page}`;
		try {
			const getDatas = await getApi(url);

			if (getDatas.ResultCode !== 'OK') {
				alert(getDatas.ErrorDesc);
			} else {
				set(getDatas);
			}
		} catch (error) {
			alert('오류가 발생했습니다. 다시 시도해 주세요. ');
		}
	};
	return {
		subscribe,
		fetchLog,
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

export const pagingLog = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});

export const pagingStep1 = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});
export const pagingStep2 = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});
export const pagingStep3 = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});
export const pagingStep4 = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});
export const memberLogPage = writable({
	nowPage: 1,
	totalCount: 0,
	totalPage: 0,
	pageSize: 10,
	pageListSize: 10,
	startPage: 0,
	endPage: 0,
});

//체크박스
export const checkedList = writable([]);
export const check = writable(false);

export const menu = writable('');
export const menuSub = writable('');
export const menuSubSub = writable('');

export const mainAll = setMainAll();
export const mainAllFinish = setMainFinish();
export const mainAllDetail = writable({});
export const mainDeletedAll = setMainDeletedAll();
export const deleteNovel = setDeleteNovel();

export const novelStep1 = setNovelStep1();
export const novelStep2 = setNovelStep2();
export const novelStep3 = setNovelStep3();
export const novelStep4 = setNovelStep4();
export const slangs = setSlangs();
export const genres = setGenres();
export const keywords = setKeywords();
export const colors = setColors();
export const images = setImages();

export const notice = setNotice();

export const faq = setFaq();
export const categoryFaq = setCategoryFaq();
export const categoryList = setCategoryFaqList();

export const inquiries = setInquiries();
export const memberInformation = setMemberInformation();
export const memberInformationList = setMemberInformationList();
export const novelFetch = setNobel();
export const novelLog = setMemLog();
