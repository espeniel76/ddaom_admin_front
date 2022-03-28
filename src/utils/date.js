import { Maths } from "./math";

export const Dates = {
	defaultConvert: (date) => {
		if (date) {
			let o = new Date(date);
			return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)}`;
		} else {
			return null;
		}
	},
	defaultConvertYYYYMMDDHHIISS: (date) => {
		if (date) {
			let o = new Date(date);
			return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)} ${Maths.addZero(o.getHours(), 2)}:${Maths.addZero(o.getMinutes(), 2)}:${Maths.addZero(
				o.getSeconds(),
				2
			)}`;
		} else {
			return null;
		}
	},
	/**
	 * YYYY-MM-DD
	 */
	nowDateYYYYMMDD: () => {
		let o = new Date();
		return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)}`;
	},
	getYYYYMMT: function () {
		let date = new Date();
		return `${date.getFullYear()}-${Maths.addZero(date.getMonth() + 1, 2)}-${Maths.addZero(date.getDate(), 2)}T${Maths.addZero(date.getHours(), 2)}:${Maths.addZero(date.getMinutes(), 2)}`;
	},
	getYYYYMMTZ: function () {
		let date = new Date();
		return `${date.getFullYear()}-${Maths.addZero(date.getMonth() + 1, 2)}-${Maths.addZero(date.getDate(), 2)}T${Maths.addZero(date.getHours(), 2)}:${Maths.addZero(
			date.getMinutes(),
			2
		)}:${Maths.addZero(date.getSeconds(), 2)}Z`;
	},
};
