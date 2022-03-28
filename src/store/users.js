import React, { createContext } from "react";
import consts from "../define/consts";

export const UserContext = createContext();

export const initContext = {
	tokenInfos: null,
	tokenParse: null,
	searchParams: {
		periodType: "All",
		startDate: "",
		endDate: "",
		activeYn: "All",
		search: "",
	},
	pageInfos: {
		nowPage: consts.init.NOW_PAGE,
		totalCount: 0,
		totalPage: 0,
		pageSize: consts.init.PAGE_SIZE,
		pageListSize: consts.init.PAGE_LIST_SIZE,
		startPage: 0,
		endPage: 0,
	},

	pageList: {
		ganre: {
			searchParams: {
				basicYn: "All",
				activeYn: "All",
			},
			pageInfos: {
				nowPage: consts.init.NOW_PAGE,
				totalCount: 0,
				totalPage: 0,
				pageSize: consts.init.PAGE_SIZE,
				pageListSize: consts.init.PAGE_LIST_SIZE,
				startPage: 0,
				endPage: 0,
			},
		},
	},
};

const UserStore = (props) => {
	let users = initContext;
	return <UserContext.Provider value={users}>{props.children}</UserContext.Provider>;
};
export default UserStore;
