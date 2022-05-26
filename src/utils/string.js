export const Strings = {
	getDeleteType: (typeDelete) => {
		typeDelete = Number(typeDelete);
		let state;
		switch (typeDelete) {
			case 1:
				state = "작가요청";
				break;
			case 2:
				state = "운영검수";
				break;
			case 3:
				state = "기타";
				break;
		}
		return state;
	},
};
