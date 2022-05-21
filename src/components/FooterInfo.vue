<template>
  <footer
    class="c-footer bottom-0 bg-gray-700"
  >
    <div class="container flex items-center justify-between w-full h-20">
      <router-link to="/" id="home-button" class="navbar-brand">
        <img :src="$assets.logo" class="w-56" alt="Cuidando do Meu Bairro" />
      </router-link>
      <div class="flex">
        <div>
          <router-link class="mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded" to="/termos-de-uso">
            Termos de Uso
          </router-link>
          <router-link class="mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded" to="/termos-de-uso">
            Gitlab
          </router-link>
          <router-link class="mr-5 underline text-white text-xs hover:text-secondary-light hover:bg-opacity-80 hover:rounded" to="/termos-de-uso">
            E-mail
          </router-link>
        </div>
        <div>
          <img :src="$assets.cc" class="w-20 inline-block" alt="Cuidando do Meu Bairro" />
        </div>
        
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
