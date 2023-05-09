<script lang="ts">
</script>

<main>
	<h1 class="headline">Login</h1>
	<form action="?/login" method="POST" class="auth-form">

		<label class= "labelMail" for=""> Email </label>
		<input type="text" name="email" />


		<label class= "labelPassword" for=""> Password </label>
		<input type="password" name="password" />


		<input type="submit" value="Login" />

	</form>

	<a href="/forgot-password">Passwort vergessen</a>
</main>

<style lang="scss">
	@import '../accountpage-layout.scss';
</style>