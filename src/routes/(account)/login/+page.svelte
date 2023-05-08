<script lang="ts">
</script>

<main>
	<h1 class="headline">Login</h1>
		<form action="?/login" method="POST" class="auth-form">
			<div class="fieldMail">
				<label class= "labelMail" for=""> Email </label>
				<input type="text" name="email" />
			</div>
			<div class="fieldPassword">
				<label class= "labelPassword" for=""> Password </label>
				<input type="password" name="password" />
			</div>
				<div class = "buttonLogin">
					<button type="submit">Login</button>
				</div>
		</form>
		<div class="forgotPassword">
			<a href="/forgot-password">Passwort vergessen</a>
		</div>
		
	
</main>

<style lang="scss">
	@import 'src/routes/(account)/accountpage-layout.scss';

</style>