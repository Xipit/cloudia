<script lang="ts">
</script>

<main>
	<h1 class="headline">Register</h1>
	<form action="?/register" method="POST" class="auth-form">
		<div class="fieldMail">
			<label class= "labelMail" for=""> Email </label>
			<input type="text" name="email" />
		</div>
		<div class="fieldPassword">
			<label class= "labelPassword" for=""> Password </label>
			<input type="password" name="password" />
		</div>
		<div class="buttonRegister">
			<button class="btn btn-primary">Register</button>
		</div>
		
	</form>
</main>

<style lang="scss">
	@import 'src/routes/(account)/accountpage-layout.scss';

</style>