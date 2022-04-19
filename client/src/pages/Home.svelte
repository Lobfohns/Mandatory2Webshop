<script>
  import { navigate } from "svelte-navigator";
  import { toast } from "@zerodevx/svelte-toast";
  import { baseURL } from "../store/generalStore.js"
  import { user } from "../store/generalStore.js";

  let chosenUser = {};
  let responseMessage = "";
  let errorMessage = "";
  async function signup() {
    if (
      chosenUser?.email &&
      chosenUser?.password
    ) {
      const res = await fetch($baseURL + "/auth/signup", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(chosenUser),
      });

      responseMessage = await res.text();
      if (res.status === 200) {
        errorMessage = "";
        toast.push("Signup was a success. You can now login");
        }
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
    } else {
      toast.push("Something went wrong, try again", {
        theme: {
          "--toastBackground": "#cd0d4a",
          "--toastBarBackground": "#cd0d4a",
        },
      });
    }
  }

  async function login() {
      const res = await fetch($baseURL + "/auth/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(chosenUser),
    });
    responseMessage = await res.text();
    if (res.status === 200) {
      console.log("success");
      user.set({ loggedIn: true});
      navigate("/beers", { replace: true });
    } else {
      toast.push("Something went wrong, try again", {
        theme: {
          "--toastBackground": "#cd0d4a",
          "--toastBarBackground": "#cd0d4a",
        },
      });
    }
  }
</script>
<head>
  <link
    href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    rel="stylesheet"
    id="bootstrap-css"
  />
  <script
    src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
</head>
<main>
  <h1>Register or login to be redirected and see beers</h1>
  <h3>If you try to go to beers without logging in you will be redirected back here</h3>
  <div class="main">
    <div class="col-md-6 col-sm-12">
      <div class="login-form">
        <form>
          <div class="form-group">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              bind:value={chosenUser.email}
            />
          </div>
          <div class="form-group">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              bind:value={chosenUser.password}
            />
          </div>
          <button type="button" class="btn btn-black" on:click={() => login()}
            >Login</button
          >
          <button
            type="button"
            class="btn btn-secondary"
            on:click={() => signup()}>Register</button
          >
      </div>
    </div>
  </div>
</main>
<style>
  .main {
    padding: 0px 5px;
    
  }
  @media screen and (max-width: 450px) {
    .login-form {
      margin-top: 20%;
    }
    
  }
  @media screen and (min-width: 768px) {
    .main {
      margin-left: 40%;
    }
    .login-form {
      margin-top: 0%;
    }
  }
  .btn-black {
    background-color: #000 !important;
    color: #fff;
  }
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>

