<script>
	import Router from "./router.svelte";
	import Nav from "./components/Nav.svelte";
	import Footer from "./components/Footer.svelte";
	import Login from "./pages/Login.svelte";
	import { menu, menuSub, menuSubSub } from "./stores";

	$: accessToken = sessionStorage.getItem("AccessToken");

	function fnNavOnOff() {
		const element = document.getElementById("layout-menu");
		const style = element.style.display;

		style === "flex" ? (element.style = "display:none") : (element.style = "display:flex");
	}
</script>

{#if !accessToken}
	<Login />
{:else}
	<div class="layout-wrapper layout-content-navbar">
		<div class="layout-container">
			<Nav />
			<div class="layout-page">
				<div class="content-wrapper">
					<div class="container-xxl flex-grow-1 container-p-y">
						<h4 class="fw-bold py-3 mb-4">
							<button
								id="navBtn"
								class="bx bx-menu bx-sm"
								on:click={fnNavOnOff}
								style="border: none; background: none;"
							/>

							<span class="text-muted fw-light">{$menu} / </span>{$menuSub}{$menuSubSub ? " / " + $menuSubSub : ""}
						</h4>
						<Router />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
