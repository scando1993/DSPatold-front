<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Settings</h1>
		</div>
		<div>
			<b-tabs content-class="mt-3">
				<b-tab title="Account Settings" active><p>I'm the first tab</p></b-tab>
				<b-tab title="UI Settings">
					<b-form-checkbox 
						id="checkbox-5"
						v-model="status5"
						name="checkbox-5"
						value="accepted"
						unchecked-value="not_accepted"
						>Show campaign results map
						
					</b-form-checkbox>


				</b-tab>
				<b-tab title="Reporting Settings"><p>I'm a disabled tab!</p></b-tab>
			</b-tabs>
		</div>

		
	
			
		&nbsp;

		
	</div>

	
</template>
