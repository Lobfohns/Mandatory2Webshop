<script>
    import { navigate } from "svelte-navigator";
    import { toast } from "@zerodevx/svelte-toast"
    import { baseURL } from "../store/generalStore.js"
    import { user } from "../store/generalStore.js";

    let responseMessage = "";


    async function logout() {
        const res = await fetch($baseURL + "/auth/logout");
        responseMessage = await res.text();
        setTimeout(() => {
        navigate("/", { replace: true });
        user.set({ loggedIn: false});
        console.log("youve been logged out");
    }, 1500);
    }


</script>

<button on:click="{logout}">Logout</button>