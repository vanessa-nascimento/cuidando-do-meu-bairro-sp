<template>
  <div>
    <h2>{{ $t('See the comments about this expense') }}</h2>

    <form class="form">
        <div class="form-group">
            <label class="sr-only" for="comment-textarea">
                {{ $t('Comment') }}
            </label>
            <textarea class="form-control"
                id="comment-textarea"
                rows="3"
                maxlength="500"
                v-model="text"
                @focus="requireLogin"
                :placeholder="$t('Your comment')"/>
        </div>
        <button-spinner type="submit"
                @click.prevent.native="_sendComment({ key: page.name, text })"
                :disabled="!text.length"
                :condition="pending.reply[page.name]"
                class="block-right relative">
            {{ $t("Send comment") }}
        </button-spinner>
    </form>

    <div class="comments-block">
      <comment-item v-for="(comment, i) in page.comments"
                    :key="i" :top="true" :comment="comment"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CommentItem from '@/components/comments/CommentItem.vue'

export default {
  name: 'comments-tab',
  components: {
    CommentItem
  },
  data () {
    return {
      text: ''
    }
  },
  computed: mapState({
    page: state => state.comments.commentsPage,
    pending: state => state.comments.pending
  }),
  methods: {
    async _sendComment (data) {
      await this.sendComment(data)
      // TODO: só remover o texto se não der erro
      this.text = ''
    },
    ...mapActions(['sendComment', 'requireLogin'])
  }
}
</script>
