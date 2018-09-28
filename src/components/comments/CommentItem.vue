<template>
  <div>
    <div class="top-bar">
        <div class="comment-outer-row">
            <!-- Icon for top most comments -->
            <div v-if="top" class="comment-icon">
                <img class="icon" :src="$assets.aComTop">
            </div>
            <!-- Icon for replies to top most comments -->
            <div v-if="!top" class="comment-icon not-comment-top">
                <div class="dot-bar"/>
                <img class="icon vertical-center" :src="$assets.aCom">
            </div>

            <div class="comment-row">
                <div class="comment-flex">
                    <div class="comment-text">
                        <!-- Comment content -->
                        <p v-if="!comment.hidden && !isEditting">
                            {{ comment.text }}
                        </p>

                        <!-- Edit form -->
                        <form class="form" v-if="isEditting">
                            <div class="form-group">
                                <label class="sr-only"
                                       :for="`comment-edit-textarea-${comment.id}`">
                                    {{ $t('Edit comment') }}
                                </label>
                                <textarea
                                  :id="`comment-edit-textarea-${comment.id}`"
                                  class="form-control"
                                  maxlength="500"
                                  v-model="edit"
                                  rows="3"/>
                            </div>
                            <button-spinner
                              type="submit"
                              @click.prevent.native="sendEditAndClose"
                              :condition="pending.edit[comment.id]">
                                {{ $t('Save') }}
                            </button-spinner>
                        </form>

                        <p v-if="comment.hidden">{{ $t('Comment removed.') }}</p>
                    </div>

                    <!-- Comment date/votes -->
                    <div class="text-center comment-dates">
                        <span>{{ formatDate(comment.created) }}</span>
                        <br>
                        <span v-if="comment.created.getTime() !== comment.modified.getTime()">
                            ({{ formatDate(comment.modified) }})
                            <br>
                        </span>
                        <span>+{{comment.upvotes}}/-{{comment.downvotes}}</span>
                    </div>

                    <!-- Comment Author -->
                    <div class="comment-author">
                        <router-link :to="{ name: 'pessoa', params: { username: comment.author} }">
                            {{ comment.author }}
                        </router-link>
                    </div>
                </div>

                <!-- Control buttons -->
                <div class="text-right control-buttons">
                  <button class="btn btn-color-sec"
                          @click="isReplying = true"
                          @focus="requireLogin">
                      {{ $t("reply") }}
                    </button>

                    <!-- Author buttons -->
                    <div v-if="isAuthor && !comment.hidden"
                        class="inline">
                        <button v-if="!isEditting"
                           class="btn btn-color-sec"
                            @click="isEditting = true">
                          {{ $t("edit") }}
                        </button>
                        <button v-if="isEditting"
                           class="btn btn-warning"
                            @click="isEditting = false">
                          {{ $t("Cancel") }}
                        </button>
                        <button-spinner
                          @click.prevent.native="sendDelete({ url: comment.url, id: comment.id })"
                          :condition="pending.delete[comment.id]">
                            {{ $t("Delete") }}
                        </button-spinner>
                    </div>

                    <!-- Not Author buttons -->
                    <div v-if="!isAuthor"
                        class="inline">
                      <button-spinner
                        @focus.native="requireLogin"
                        :condition="pending.voteup[comment.id]"
                        @click.prevent.native="sendVote({ url: comment.vote_url, id: comment.id, vote: true })">
                          +1
                      </button-spinner>
                      <button-spinner
                        @focus.native="requireLogin"
                        :condition="pending.votedown[comment.id]"
                        @click.prevent.native="sendVote({ url: comment.vote_url, id: comment.id, vote: false })">
                          -1
                      </button-spinner>
                      <button-spinner
                        class="dangerous-link"
                        v-if="!comment.hidden"
                        :title="$t('Report comment as inappropriate')"
                        :condition="pending.report[comment.id]"
                        @click.prevent.native="sendReport({ url: comment.report_url, id: comment.id })">
                          {{ $t('Report') }}
                      </button-spinner>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <!-- Reply form -->
            <form class="form" v-if="isReplying">
                <div class="form-group">
                    <label class="sr-only"
                           for="comment-reply-textarea-{comment.id}">
                        {{ $t('Reply Comment') }}
                    </label>
                    <textarea
                      id="comment-reply-textarea-{comment.id}"
                      class="form-control"
                      maxlength="500"
                      v-model="reply"
                      rows="3"/>
                </div>
                <button-spinner type="submit"
                        @click.prevent.native="sendReply({ url: comment.url, text: reply, id: comment.id })"
                        :condition="pending.reply[comment.id]"
                        :disabled="!reply.length">
                    {{ $t('Send') }}
                </button-spinner>
                <button class="btn btn-warning" @click.prevent.native="isReplying = false">
                    {{ $t('Cancel') }}
                </button>
            </form>
        </div>

        <!-- Replies list -->
        <comment-item v-for="(reply, i) in comment.replies" :key="i" style="margin: 20px;" :comment="reply"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '@/utils'
export default {
  name: 'comment-item',
  props: {
    comment: Object,
    top: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isEditting: false,
      isReplying: false,
      edit: this.comment.text,
      reply: ''
    }
  },
  computed: {
    isAuthor () {
      return this.comment.author === this.username
    },
    ...mapState({
      username: state => state.auth.username,
      pending: state => state.comments.pending
    })
  },
  methods: {
    formatDate,
    async sendEditAndClose () {
      await this.sendEdit({ url: this.comment.url, text: this.edit, id: this.comment.id })
      this.isEditting = false
    },
    ...mapActions([
      'requireLogin',
      'sendDelete',
      'sendVote',
      'sendEdit',
      'sendReport',
      'sendReply'
    ])
  }
}
</script>
