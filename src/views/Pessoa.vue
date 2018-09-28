<template>
  <div class="container">
    <user-info/>
    <user-subscriptions/>
    <user-perguntas/>
  </div>
</template>

<script>
import UserInfo from '@/components/user/UserInfo.vue'
import UserPerguntas from '@/components/user/UserPerguntas.vue'
import UserSubscriptions from '@/components/user/UserSubscriptions.vue'
export default {
  name: 'pessoa-view',
  components: {
    UserInfo,
    UserPerguntas,
    UserSubscriptions
  }
}
</script>
