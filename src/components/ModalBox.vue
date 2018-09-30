<template>
  <transition name="fade">
    <div v-if="isOpen">
      <div class="modal-backdrop"/>
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        style="display:block;">
        <div
          id="modal-dialog"
          v-click-outside="closeModal"
          class="modal-dialog"
          role="document">
          <div class="modal-content">
            <button
              type="button"
              class="btn btn-color-sec close"
              @click="closeModal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'modal-box',
  props: {
    modalId: String
  },
  computed: {
    ...mapState({
      isOpen (state) { return state.modal.current === this.modalId }
    })
  },
  methods: {
    ...mapMutations(['closeModal'])
  }
}
</script>
