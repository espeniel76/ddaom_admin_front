import sidebarBgImage from "assets/img/sidebar/sidebar-4.jpg";
import SourceLink from "components/SourceLink";
import React from "react";
import { MdAccountBalanceWallet, MdAccountBalance, MdGroupWork, MdInsertChart, MdKeyboardArrowDown, MdNotificationsActive } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "utils/bemnames";

const sidebarBackground = {
	backgroundImage: `url("${sidebarBgImage}")`,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
};
const navSets = [
	{
		name: "학습관리",
		Icon: MdGroupWork,
		items: [
			{
				name: "기본챕터관리",
				to: "/study/chapters",
				exact: true,
				Icon: MdInsertChart,
			},
			{
				name: "중급챕터관리",
				to: "/study/chapterMiddles",
				exact: false,
				Icon: MdInsertChart,
			},
			{
				name: "어휘관리",
				to: "/study/vocabularies",
				exact: false,
				Icon: MdInsertChart,
			},
		],
	},
	{
		name: "회원",
		Icon: MdGroupWork,
		items: [
			{
				name: "회원관리 정보",
				to: "/members/user",
				exact: false,
				Icon: MdInsertChart,
			},
			{
				name: "어드민관리 정보",
				to: "/members/admin",
				exact: false,
				Icon: MdNotificationsActive,
			},
		],
	},
];

const bem = bn.create("sidebar");

class Sidebar extends React.Component {
	state = {
		isOpen학습관리: true,
		isOpen분류관리: false,
		isOpen회원: false,
	};

	handleClick = (name) => () => {
		this.setState((prevState) => {
			const isOpen = prevState[`isOpen${name}`];

			return {
				[`isOpen${name}`]: !isOpen,
			};
		});
	};

	setNav(o) {
		return (
			<div key={o.name}>
				<NavItem className={bem.e("nav-item")} onClick={this.handleClick(o.name)}>
					<BSNavLink className={bem.e("nav-item-collapse")}>
						<div className="d-flex">
							<o.Icon className={bem.e("nav-item-icon")} />
							<span className=" align-self-start">{o.name}</span>
						</div>
						<MdKeyboardArrowDown
							className={bem.e("nav-item-icon")}
							style={{
								padding: 0,
								transform: eval(`this.state.isOpen${o.name}`) ? "rotate(0deg)" : "rotate(-90deg)",
								transitionDuration: "0.3s",
								transitionProperty: "transform",
							}}
						/>
					</BSNavLink>
				</NavItem>
				<Collapse isOpen={eval(`this.state.isOpen${o.name}`)}>
					{o.items.map(({ to, name, exact, Icon }, index) => (
						<NavItem key={index} className={bem.e("nav-item")}>
							<BSNavLink id={`navItem-${name}-${index}`} className="text-uppercase" tag={NavLink} to={to} activeClassName="active" exact={exact}>
								<Icon className={bem.e("nav-item-icon")} />
								<span className="">{name}</span>
							</BSNavLink>
						</NavItem>
					))}
				</Collapse>
			</div>
		);
	}

	render() {
		return (
			<aside className={bem.b()} data-image={sidebarBgImage}>
				<div className={bem.e("background")} style={sidebarBackground} />
				<div className={bem.e("content")}>
					<Navbar>
						<SourceLink className="navbar-brand d-flex">
							<span className="text-white">무한패턴 Admin v0.1</span>
						</SourceLink>
					</Navbar>
					<Nav>{navSets.map((item) => this.setNav(item))}</Nav>
				</div>
			</aside>
		);
	}
}

export default Sidebar;
