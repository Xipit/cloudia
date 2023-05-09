<script lang="ts">
</script>

<main>
	<h1>Register</h1>
	<form action="?/register" method="POST" class="auth-form">

		<label class= "labelMail" for=""> Email </label>
		<input type="text" name="email" />


		<label class= "labelPassword" for=""> Password </label>
		<input type="password" name="password" />


		<input type="submit" value="Register" />
	</form>
</main>

<style lang="scss">
	@import '../accountpage-layout.scss';
</style>