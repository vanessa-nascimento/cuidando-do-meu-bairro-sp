<template>
  <ul class="list-bare">
    <li v-for="(msg, i) in msgs" :key="i">
      <div :class="['msg', `${msg.type}-msg`]">
          {{ $t(msg.text) }}

          <button type="button"
                  class="btn"
                  @click="removeMsg(msg)"
                  aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'msg-shower',
  components: {
  },
  computed: {
    // msgList () {
    //   return this.msgs.map((msg, i) => { msg, index: i })
    // },
    ...mapState({
      msgs: state => state.msgs.msgs
    })
  },
  methods: {
    ...mapMutations(['removeMsgs'])
  }
}
</script>
