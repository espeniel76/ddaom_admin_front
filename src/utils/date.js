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
	defaultConvertFull: (date) => {
		if (date) {
			let o = new Date(date);
			return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)} ${Maths.addZero(
				o.getHours(),
				2
			)}:${Maths.addZero(o.getMinutes(), 2)}`;
		} else {
			return null;
		}
	},
	defaultConvertFullT: (date) => {
		if (date) {
			let o = new Date(date);
			return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)}T${Maths.addZero(
				o.getHours(),
				2
			)}:${Maths.addZero(o.getMinutes(), 2)}`;
		} else {
			return null;
		}
	},
	nowDateYYYYMMDD: () => {
		let o = new Date();
		return `${o.getFullYear()}-${Maths.addZero(o.getMonth() + 1, 2)}-${Maths.addZero(o.getDate(), 2)}`;
	},
	getYYYYMMT: function () {
		let date = new Date();
		return `${date.getFullYear()}-${Maths.addZero(date.getMonth() + 1, 2)}-${Maths.addZero(
			date.getDate(),
			2
		)}T${Maths.addZero(date.getHours(), 2)}:${Maths.addZero(date.getMinutes(), 2)}`;
	},
	getYYYYMMTZ: function () {
		let date = new Date();
		return `${date.getFullYear()}-${Maths.addZero(date.getMonth() + 1, 2)}-${Maths.addZero(
			date.getDate(),
			2
		)}T${Maths.addZero(date.getHours(), 2)}:${Maths.addZero(date.getMinutes(), 2)}:${Maths.addZero(
			date.getSeconds(),
			2
		)}Z`;
	},
	getUnixtime: function () {
		let d = new Date();
		return d.getTime();
	},
	setUnixtime: function (date) {
		let d = new Date(date);
		return d.getTime();
	},
	getProcessText(fromDate, toDate) {
		let nowUnixtime = Dates.getUnixtime();
		let status;
		if (nowUnixtime < Dates.setUnixtime(fromDate)) {
			status = "예정";
		} else if (nowUnixtime < Dates.setUnixtime(toDate)) {
			status = "진행";
		} else {
			status = "종료";
		}
		return status;
	},
};
