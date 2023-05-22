<script lang="ts">
</script>

<main>
	<h1 class="headline">Login</h1>
	<form action="?/login" method="POST" class="auth-form">

		<label class= "labelMail" for=""> Email </label>
		<input type="text" name="email" required/>


		<label class= "labelPassword" for=""> Password </label>
		<input type="password" name="password" required/>


		<input type="submit" value="Login" />

	</form>

	<a href="/register">Registrieren</a>
	<a href="/forgot-password">Passwort vergessen</a>
</main>

<style lang="scss">
	@import '../accountPages.scss';
</style>