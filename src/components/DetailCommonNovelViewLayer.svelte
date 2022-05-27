<script>
	export let oModal;
	export let fnInitModal;
</script>

<div class={oModal.class} tabindex="-1" style={oModal.style}>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">내용 상세</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
					on:click={() => {
						fnInitModal();
					}}
				/>
			</div>
			<div class="modal-body">
				<textarea class="form-control form-control-sm" rows="10">{oModal.item.Content}</textarea>
			</div>
		</div>
	</div>
</div>
