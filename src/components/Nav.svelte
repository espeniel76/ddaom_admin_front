<script>
	// import { active } from "tinro";
	let listMenu = [
		{
			title: "소설관리",
			menus: [
				{
					title: "메인",
					active: true,
					open: true,
					src: "/",
					subs: [
						{ title: "전체소설", src: "/" },
						{ title: "삭제된 소설", src: "/" },
					],
				},
				{
					title: "표지관리",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
				{
					title: "금칙어관리",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
				{
					title: "주제어관리",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
			],
		},
		{
			title: "이벤트관리",
			menus: [
				{
					title: "이벤트",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
			],
		},
		{
			title: "CS관리",
			menus: [
				{
					title: "공지사항",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
				{
					title: "1:1문의",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
				{
					title: "FAQ",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
			],
		},
		{
			title: "회원관리",
			menus: [
				{
					title: "회원관리 정보",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
			],
		},
		{
			title: "통계",
			menus: [
				{
					title: "통계",
					active: false,
					open: true,
					src: "/",
					subs: [],
				},
			],
		},
	];
</script>

<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
	<div class="app-brand demo" style="padding-left: 0rem">
		<img alt="" src="./assets/img/logo.png" width="50" />
		<span class="app-brand-text demo menu-text fw-bolder ms-2">따옴 관리자</span>
	</div>

	<div class="menu-inner-shadow" />

	<ul class="menu-inner py-1">
		<li class="menu-item">
			<a href="index.html" class="menu-link">
				<i class="menu-icon tf-icons bx bx-home-circle" />
				<div data-i18n="Analytics">Dashboard</div>
			</a>
		</li>

		{#each listMenu as menu}
			<li class="menu-header small text-uppercase">
				<span class="menu-header-text">{menu.title}</span>
			</li>
			{#each menu.menus as item}
				<li class="menu-item {item.active ? ' active' : ''} {item.open ? ' open' : ''}">
					<a href={item.url} class="menu-link {item.subs.length > 0 ? 'menu-toggle' : ''}">
						<i class="menu-icon tf-icons bx bx-detail" />
						<div data-i18n="Form Elements">{item.title}</div>
					</a>
					{#if item.subs.length > 0}
						<ul class="menu-sub">
							{#each item.subs as sub}
								<li class="menu-item">
									<a href={sub.src} class="menu-link">
										<div data-i18n="Basic Inputs">{sub.title}</div>
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		{/each}
	</ul>
</aside>

<style>
	a:-webkit-any-link {
		color: -webkit-link;
		cursor: pointer;
	}
</style>
