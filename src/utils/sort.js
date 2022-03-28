export const Sort = {
	checkSortList: async (_sortList) => {
		const sorts = [];
		const seqs = [];
		let Seq;
		let Sort;

		for (let i in _sortList) {
			let o = _sortList[i];
			if (o !== null) {
				Seq = Number(o.id.replace("sort_", ""));
				Sort = Number(o.value);
			}

			if (Sort < 1) {
				alert(Seq + "번 순서가 잘못된 순서 입니다. 순서는 1보다 큰, 숫자여야 합니다.");
				return false;
			} else if (Sort < 6) {
				if (seqs.indexOf(Seq) === -1) {
					sorts.push(Sort);
					seqs.push(Seq);
				}
			}
		}

		return sorts;
	},
	hasDuplicates: async (array) => {
		const isDup = array.some(function (x) {
			return array.indexOf(x) !== array.lastIndexOf(x);
		});
		return isDup;
	},
	makeSortList: async (sortList_) => {
		// const sort_ = [];
		const sortList = [];

		let Seq;
		let Sort;
		for (let i in sortList_) {
			let o = sortList_[i];

			if (o !== null) {
				Seq = Number(o.id.replace("sort_", ""));
				Sort = Number(o.value);
			}

			sortList.push({
				Seq,
				Sort,
			});
		}
		return sortList;
	},
};
