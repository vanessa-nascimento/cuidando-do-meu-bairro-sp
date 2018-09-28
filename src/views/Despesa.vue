<template>
  <div>
    <div class="container-fluid light-dark-bg">
      <div class="row">
        <div class="container">
          <div class="row">
              <div class="col-sm-12 padded-col">
                  <router-link class="back-to-year" to="/">
                      <span class="left-arrow"/>
                      {{ $t('back to year') }}
                  </router-link>
              </div>
          </div>
          <div class="row relative">
              <slot name="map"/>
              <div id="minimap-container" class="col-md-4">
                <div v-if="!pointInfo.geometry" class="not-mapped-msg-container">
                  <div class="not-mapped-msg">
                    {{ $t('Not mapped') }}
                  </div>
                </div>
              </div>

          </div>

          <despesa-main/>

          <!-- (un)follow expense -->
          <button-spinner
            type="submit" v-if="!subscriptions[pointInfo.notification_id]"
            @click.prevent.native="subscribe({ tag: pointInfo.notification_id, author: pointInfo.notification_author })"
            :condition="pending.subscribe[pointInfo.notification_id]"
            class="block-right relative margin-bottom">
            {{ $t("Follow expense") }}
          </button-spinner>
          <button-spinner
            type="submit" v-else
            @click.prevent.native="unsubscribe({ tag: pointInfo.notification_id })"
            :condition="pending.unsubscribe[pointInfo.notification_id]"
            class="block-right relative margin-bottom">
            {{ $t("Unfollow expense") }}
          </button-spinner>

          <despesa-details/>

        </div>
      </div>
    </div>

    <perg-com-tabs/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DespesaDetails from '@/components/DespesaDetails.vue'
import DespesaMain from '@/components/DespesaMain.vue'
import PergComTabs from '@/components/PergComTabs.vue'
export default {
  name: 'despesa-view',
  components: {
    DespesaMain,
    DespesaDetails,
    PergComTabs
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      subscriptions: state => state.subscriptions.subscriptions,
      pending: state => state.subscriptions.pending,
      pointInfo: state => state.money.pointInfo,
      code: state => state.route.params.code
    })
  },
  methods: {
    ...mapActions(['unsubscribe', 'subscribe'])
  }
}
</script>
