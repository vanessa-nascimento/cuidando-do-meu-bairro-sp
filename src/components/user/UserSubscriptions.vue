<template>
  <div v-if="Object.keys(subscriptions).length && viewingUser === username">
    <h2>Itens Acompanhados</h2>
    <transition-group tag="ul" name="fade">
      <li v-for="subscription in subscriptions" :key="subscription.tag">
        <a :href="subscription.template_data.link">{{ subscription.tag }}</a>
        <button-spinner
          type="submit" @click.prevent.native="unsubscribe({ tag: subscription.tag })"
          :condition="pending.unsubscribe[subscription.tag]"
          class="block-right relative margin-bottom">
          {{ $t("Unfollow") }}
        </button-spinner>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user-subscriptions',
  computed: {
    ...mapState({
      subscriptions: state => state.subscriptions.subscriptions,
      pending: state => state.subscriptions.pending,
      viewingUser: state => state.route.params.viewingUser,
      username: state => state.auth.username
    })
  },
  methods: {
    ...mapActions(['unsubscribe'])
  }
}
</script>
