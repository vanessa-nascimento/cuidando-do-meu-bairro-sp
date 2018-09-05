<template>
  <div class="about">
    <h1>Despesa</h1>
    <despesa-details/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DespesaDetails from '@/components/DespesaDetails.vue'
export default {
  name: 'despesa',
  components: {
    DespesaDetails
  },
  mounted () {
    this.getPointInfo({ params: { code: this.code } })
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      code: state => state.route.params.code
    })
  },
  methods: {
    ...mapActions([
      'getPointInfo'
    ])
  }
}
</script>
