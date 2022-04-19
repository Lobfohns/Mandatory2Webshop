<script>
let email; let password; 
export let sdkoptions;

const handleSubmit=(e)=>{
       let loginFields={email,password};
	   console.log(loginFields)
    }
    const navigateToSignup=()=>{}
</script>


<h3>Login</h3>
<form on:submit|preventDefault="{handleSubmit}">
  <input
    class="form-field"
    bind:value="{email}"
    type="email"
    placeholder="Email"
  />
  <input
    class="form-field"
    bind:value="{password}"
    type="password"
    placeholder="Password"
  />
  <button class="form-field">
    Login
  </button>
</form>
<p>
  Don't have an account?
  <strong class="link" on:click="{navigateToSignup}">Sign up</strong>
</p>
