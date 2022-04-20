<script>
	import { url, isActive } from "@sveltech/routify";
</script>

<div>
	<h1>따옴 어드민</h1>
	<!-- <a href={$url("./about")}>About</a>
	<a href={$url("./company")}>Company</a> -->

	<a href={$url("./about")} class:located={$isActive("./about")}>About</a>
	<a href={$url("./company")} class:located={$isActive("./company")}>Company</a>

	<slot />
</div>
