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
                                       :for="`comment-edit-textarea-${id}`">
                                    { t('Edit comment') }
                                </label>
                                <textarea id="`comment-edit-textarea-${this.id}`"
                                        class="form-control"
                                        maxlength="500"
                                        v-model="text"
                                        rows="3"></textarea>
                            </div>
                            <button type="submit"
                                    @click="sendEdit"
                                    class="btn btn-color-sec">
                                {{ $t('Save') }}
                                <!-- <span v-if="sendEditWaiting" class="loading"/> -->
                            </button>
                        </form>

                        <p v-if="comment.hidden">{{ $t('Comment removed.') }}</p>
                    </div>

                    <!-- Comment date/votes -->
                    <div class="text-center comment-dates">
                        <span>{{ formatDate(comment.created) }}</span>
                        <br>
                        <span v-if="comment.created.getTime() !== comment.modified.getTime()">
                            ({{ formatDate(modified) }})
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
                    <a onclick="{ openReplyArea }">
                        {{ $t("reply") }}</a>

                    <!-- Author buttons -->
                    <div v-if="isAuthor && !comment.hidden"
                        class="inline">
                        <a if="{ !isEditting }"
                            onclick="{ openEditArea }">
                            { t("edit") }</a>
                        <a if="{ isEditting }"
                            onclick="{ closeEditArea }">
                            { t("Cancel") }</a>
                        <a onclick="{ sendDelete }">
                            { t("Delete") }
                            <span if="{ sendDeleteWaiting }" class="loading"/>
                        </a>
                    </div>

                    <!-- Not Author buttons -->
                    <div v-if="!isAuthor"
                        class="inline">
                        <a data-vote="up"
                            @click="sendVote">
                            +1
                            <!-- <span if="{ sendVoteWaiting && upvotting }" -->
                            <!--     class="loading"/> -->
                        </a>
                        <a data-vote="down"
                                onclick="{ sendVote }">
                            -1
                            <!-- <span if="{ sendVoteWaiting && !upvotting }" -->
                            <!--     class="loading"/> -->
                        </a>
                        <a class="dangerous-link"
                                v-if="!comment.hidden"
                                :title="$t('Report comment as inappropriate')"
                                onclick="{ sendReport }">
                            {{ $t('Report') }}
                            <!-- <span if="{ sendReportWaiting }" class="loading"/> -->
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <!-- Reply form -->
            <form class="form"
                  if="{ isReplying }">
                <div class="form-group">
                    <label class="sr-only"
                           for="comment-reply-textarea-{this.id}">
                        {{ $t('Reply Comment') }}
                    </label>
                    <textarea id="comment-reply-textarea-{this.id}"
                              class="form-control"
                              maxlength="500"
                              rows="3"/>
                </div>
                <button type="submit"
                        onclick="{ sendReply }"
                        class="btn btn-color-sec">
                    {{ $t('Send') }}
                    <!-- <span if="{ sendReplyWaiting }" class="loading"/> -->
                </button>
                <button class="btn btn-warning"
                        onclick="{ closeReplyArea }">
                    {{ $t('Cancel') }}
                </button>
            </form>
        </div>

        <!-- Replies list -->
        <comment v-for="(reply, i) in comment.replies" :key="i" style="margin: 20px;"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  components: {
  },
  data () {
    return {
      isEditting: false,
      text: ''
    }
  },
  computed: {
    isAuthor () {
      return this.comment.author === this.username
    },
    ...mapState({
      username: state => state.auth.username
    })
  },
  methods: {
    formatDate,
    // TODO
    sendVote () {}
  }
}
</script>
