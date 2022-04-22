<script>
	import Router from "./router.svelte";
	import Nav from "./components/Nav.svelte";
	import Footer from "./components/Footer.svelte";
</script>

<div class="layout-wrapper layout-content-navbar">
	<div class="layout-container">
		<Nav />
		<div class="layout-page">
			<div class="content-wrapper">
				<div class="container-xxl flex-grow-1 container-p-y">
					<Router />
					<Footer />
				</div>
			</div>
		</div>
	</div>
</div>
