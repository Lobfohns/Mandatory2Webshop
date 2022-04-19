<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../store/generalStore.js";

    const navigate = useNavigate();
    const location = useLocation();

    $: if (!$user.loggedIn) {
      navigate("/", {
        state: { from: $location.pathname },
        replace: true,
      });
    }
  </script>

  {#if $user}
    <slot />
  {/if}