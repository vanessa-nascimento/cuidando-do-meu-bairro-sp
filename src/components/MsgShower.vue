<template>
  <transition-group tag="ul" name="fade" class="list-bare msg-shower">
    <li v-for="msg in msgs" :key="msg.id">
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
  </transition-group>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'msg-shower',
  computed: mapState({
    msgs: state => state.msgs.msgs
  }),
  methods: mapMutations(['removeMsg'])
}
</script>
