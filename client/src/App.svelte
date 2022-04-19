<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Beers from "./pages/Beers.svelte"
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
		<Link to="/beers">Beers</Link>
	</nav>

  <main>
	<SvelteToast {options} />
	<Route path="/" component={Home} />
  <PrivateRoute path="/beers" let:location>
		<Beers />
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
  min-height: calc(100vh - 95px);
}

footer {
		background-color: grey;
	}

nav {
    background-color: rgb(240, 172, 150);
    overflow: hidden;
  }

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>