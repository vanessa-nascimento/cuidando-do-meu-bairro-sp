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
                @focus="checkIsLogged"
                :placeholder="$t('Your comment')"/>
        </div>
        <button type="submit"
                @click="sendComment"
                class="btn btn-color-sec block-right relative">
          <!-- <spinneror condition="sendCommentWaiting" scale="0.15"> -->
            {{ $t("Send comment") }}
          <!-- </spinneror> -->
        </button>
    </form>

    <div class="comments-block">
      <comment-item v-for="(comment, i) in page.comments"
                    :key="i" :top="true" :comment="comment"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      page: state => state.comments.commentsPage
    })
  },
  methods: {
    // TODO
    checkIsLogged () {},
    sendComment () {}
  }
}
</script>
