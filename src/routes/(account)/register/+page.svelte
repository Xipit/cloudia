<script lang="ts">
</script>

<main>
	<h1>Register</h1>
	<form action="?/register" method="POST" class="auth-form">
		<label class= "labelMail" for=""> Email </label>
		<input type="text" name="email" required/>

		<label class= "labelPassword" for=""> Password </label>
		<input type="password" name="password" required/>

		<input type="submit" value="Register" />
	</form>

	<a href="/login">Login</a>
</main>

<style lang="scss">
	@import '../accountPages.scss';
</style>