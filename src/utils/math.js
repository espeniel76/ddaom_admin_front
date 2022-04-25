export const Maths = {
	addZero: (num, size) => {
		num = String(num);
		let remain = 0;
		if (num.length < size) {
			let z = "";
			remain = size - num.length;
			for (let index = 0; index < remain; index++) {
				z += "0";
			}
			num = `${z}${num}`;
		}
		return num;
	},
};
