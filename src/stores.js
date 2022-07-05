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
      console.log('keywordGet', getDatas);
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
      console.log('getKeyword2', getDatas);
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
      const newData = await putFileApi(`/assets/images/${SeqImage}`, data);
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
      console.log('noticeGet', getDatas);
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
      console.log('saveNotice', newData);
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
      console.log('FaqStoreGet', getDatas);
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
      console.log('saveFaq', newData);
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

function setCategoryFaq() {
  let values = { ...initListValues };

  const { subscribe, set, update } = writable(values);

  const fetchCategoryFaq = async () => {
    let url = `/cs/faqs/category`;
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

  const getCategoryFaq = async (SeqFaq) => {
    let url = `/cs/faqs/${SeqFaq}`;
    try {
      const getDatas = await getApi(url);
      return getDatas;
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요. ');
    }
  };
  return {
    subscribe,
    fetchCategoryFaq,
    getCategoryFaq,
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
    EndDate
  ) => {
    try {
      const newData = await putApi(`/cs/inquiries/${SeqServiceInquiry}`, {
        SeqServiceInquiry,
        Status,
        Answer,

        StartDate,
        EndDate,
      });
      console.log('newData', newData);
      return newData;
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요. ');
    }
  };

  // const saveInquiries = async (Answer, ActiveYn, StartDate, EndDate) => {
  //   try {
  //     const newData = await postApi(`/cs/inquiries`, {
  //       Answer,
  //       ActiveYn,
  //       StartDate,
  //       EndDate,
  //     });
  //     console.log('saveInquiries', newData);
  //     return newData;
  //   } catch (error) {
  //     console.log(error);
  //     alert('오류가 발생했습니다. 다시 시도해 주세요. ');
  //   }
  // };

  const delInquiries = async (idList) => {
    let url = `/cs/inquiries`;
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
    fetchInquiries,
    getInquiries,
    editInquiries,
    delInquiries,
  };
}

function setMemberInformation() {
  let values = { ...initListValues };

  const { subscribe, set, update } = writable(values);

  const fetchMemberInformation = async (o, PageSize, Page) => {
    let url = `/cs/memberInformation?StartDate=${o.StartDate}&EndDate=${o.EndDate}&Search=${o.NickName}&PageSize=${PageSize}&Page=${Page}`;
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

  const getMemberInformation = async (seqMemberDtail) => {
    let url = `/cs/memberInformation/seqMemberDtail/${seqMemberDtail}`;
    try {
      const getDatas = await getApi(url);
      return getDatas;
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요. ');
    }
  };

  const getMemberInformationList = async (SeqMember) => {
    let url = `/cs/memberInformationList/ListData/${SeqMember}`;
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
      const newData = await putApi(`/cs/memberInformation/${SeqMember}`, {
        SeqMember,
        isBlocked,
        BlockedReason,
        StartDate,
      });
      console.log('editData', newData);
      return newData;
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요. ');
    }
  };

  const delMemberInformation = async (idList) => {
    let url = `/cs/memberInformation`;
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
    fetchMemberInformation,
    getMemberInformation,
    getMemberInformationList,
    editMemberInformation,
    delMemberInformation,
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
export const memberDetailsPage = writable({
  nowPage: 1,
  totalCount: 0,
  totalPage: 0,
  pageSize: 5,
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

export const inquiries = setInquiries();
export const memberInformation = setMemberInformation();
