<script>
	import { active } from "tinro";
</script>

<!-- <nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/about/sub">Sub</a>
	<a href="/contacts">Contacts</a>
</nav> -->

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

		<li class="menu-header small text-uppercase"><span class="menu-header-text">Forms &amp; Tables</span></li>
		<li class="menu-item">
			<a href="#\" class="menu-link menu-toggle">
				<i class="menu-icon tf-icons bx bx-detail" />
				<div data-i18n="Form Elements">Form Elements</div>
			</a>
			<ul class="menu-sub">
				<li class="menu-item">
					<a href="forms-basic-inputs.html" class="menu-link">
						<div data-i18n="Basic Inputs">Basic Inputs</div>
					</a>
				</li>
				<li class="menu-item">
					<a href="forms-input-groups.html" class="menu-link">
						<div data-i18n="Input groups">Input groups</div>
					</a>
				</li>
			</ul>
		</li>
		<li class="menu-item active open">
			<a href="#\" class="menu-link menu-toggle">
				<i class="menu-icon tf-icons bx bx-detail" />
				<div data-i18n="Form Layouts">Form Layouts</div>
			</a>
			<ul class="menu-sub">
				<li class="menu-item">
					<a href="form-layouts-vertical.html" class="menu-link">
						<div data-i18n="Vertical Form">Vertical Form</div>
					</a>
				</li>
				<li class="menu-item active">
					<a href="form-layouts-horizontal.html" class="menu-link">
						<div data-i18n="Horizontal Form">Horizontal Form</div>
					</a>
				</li>
			</ul>
		</li>
	</ul>
</aside>
