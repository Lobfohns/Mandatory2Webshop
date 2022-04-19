<script>
    import { navigate } from "svelte-navigator";
    import { baseURL } from "../store/generalStore.js"
    import { user } from "../store/generalStore.js";
    import { onMount } from "svelte";

    let responseMessage = "";
    let ipas = "";
    let nonipas = "";


    async function logout() {
        const res = await fetch($baseURL + "/auth/logout");
        responseMessage = await res.text();
        setTimeout(() => {
        navigate("/", { replace: true });
        user.set({ loggedIn: false});
        console.log("youve been logged out");
    }, 1500);
    }

    onMount(async () => {
		 const response = await fetch($baseURL + "/api/ipas");
		 const { data:ipasArray } = await response.json();
		 ipas = ipasArray;
	});
    
    onMount(async () => {
		 const response = await fetch($baseURL + "/api/nonipas");
		 const { data:nonipasArray } = await response.json();
		 nonipas = nonipasArray;
	});

</script>

<h1>Click this to logout and be redirected back to home page</h1>
<button on:click="{logout}">Logout</button>

<h1>IPA's</h1>
<h1>{JSON.stringify(ipas)}</h1>

<h1>non-IPA's</h1>
<h1>{JSON.stringify(nonipas)}</h1>
