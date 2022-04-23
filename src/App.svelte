<script>
	import Router from "./router.svelte";
	import Nav from "./components/Nav.svelte";
	import Footer from "./components/Footer.svelte";
	import { setContext } from "svelte";
	import Login from "./pages/Login.svelte";
	setContext("menu", "금칙어관리");
	console.log("App");

	$: accessToken = sessionStorage.getItem("AccessToken");
	$: {
		console.log(accessToken);
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
						<!-- <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">{menu} / </span>{menu}</h4> -->
						<Router />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
