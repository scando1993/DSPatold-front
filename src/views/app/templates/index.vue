<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">
				Email Templates
			</h1>
		</div>

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalTemplate-1')">+ New Template</b-button>
			
		</div>
		&nbsp;
		
		<div id="emptyMessage" class="row" style="display:none;">
			<div class="alert alert-info">
				No templates yet. Let's create one!
			</div>
		</div>

		
		
	</div>

</template>
