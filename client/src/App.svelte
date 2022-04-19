<script>
	import { Router, Link, Route } from "svelte-navigator";
	import About from "./pages/About.svelte"
	import Home from "./pages/Home.svelte"
	import { SvelteToast } from '@zerodevx/svelte-toast'
  import PrivateRoute from "./routes/PrivateRoutes.svelte";
	const options = {
    theme: {
      "--toastBackground": "#2fff00",
      "--toastBarBackground": "#2fff00"
    },
  };
	
</script>
<Router>
	<nav>
		<Link to="/" class='link' >Home</Link>
		<Link to="/about">About</Link>
	</nav>

  <main>


	<SvelteToast {options} />
	<Route path="/" component={Home} />
  <PrivateRoute path="/about" let:location>
		<About />
	</PrivateRoute>
	</main>
</Router>

<footer>
	@ {new Date().getFullYear()}
	Contact
	About
</footer>

<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}
nav {
    background-color: rgb(132, 40, 9);
    overflow: hidden;
  }

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>