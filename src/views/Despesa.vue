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
                        <!-- <div v-if="!this.pointInfo.geometry" -->
                        <!--      class="not-mapped-msg-container"> -->
                        <!--     <div class="not-mapped-msg"> -->
                        <!--         {{ $t('Not mapped') }} -->
                        <!--     </div> -->
                        <!-- </div> -->
                    </div>

                </div>

                <despesa-main/>

                <!-- <button type="submit" -->
                <!--         if="{ !checkSubscribed(pointinfo.notification_id) }" -->
                <!--         onclick="{ subscribeExpense }" -->
                <!--         class="btn btn-color-sec block-right relative margin-bottom"> -->
                <!--   <spinneror condition="subscribeWaiting" scale="0.15">{ t("Follow expense") }</spinneror> -->
                <!-- </button> -->
                <!-- <button type="submit" -->
                <!--         if="{ checkSubscribed(pointinfo.notification_id) }" -->
                <!--         onclick="{ unsubscribeExpense }" -->
                <!--         class="btn btn-color-sec block-right relative margin-bottom"> -->
                <!--   <spinneror condition="unsubscribeWaiting" scale="0.15">{ t("Unfollow expense") }</spinneror> -->
                <!-- </button> -->

                <despesa-details/>

            </div>
        </div>
    </div>

    <perg-com-tabs/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      code: state => state.route.params.code
    })
  }
}
</script>
