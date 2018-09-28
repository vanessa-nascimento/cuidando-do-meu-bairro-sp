<template>
  <div v-if="userInfo">
    <div class="top-bar relative margin-top">
      <span class="block-decorator"/>
      <h1>{{ userInfo.username }}</h1>

      <!-- Description -->
      <div v-if="isEditting !== 'description'">
        <p v-if="userInfo.description">
          {{ userInfo.description }}
        </p>
        <p v-else>
          {{ $t('No user description...') }}
        </p>
        <div v-if="isUser && !isEditting">
          <button class="btn btn-color-sec small-all-margin" @click="openEdit('description')">
            {{ $t('edit') }}
          </button>
        </div>
      </div>
      <!-- Edit Description -->
      <form class="form" v-else>
        <div class="form-group">
          <label class="sr-only" for="user-edit-description">
            {{ $t('Description') }}
          </label>
          <textarea class="form-control"
                    rows="3"
                    id="user-edit-description"
                    maxlength="500"
                    v-model="description"
                    :placeholder="$t('Description')"/>
          <div class="control-buttons">
            <button-spinner
              type="submit"
              :disabled="!description.length"
              :condition="pending.sendEdit"
              @click.prevent.native="sendEdit"
              class="btn btn-color-sec">
                {{ $t('Save') }}
            </button-spinner>
            <button class="btn btn-warning"
                    @click.prevent="isEditting = null">
                {{ $t('Cancel') }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="top-bar bottom-bar private-info" v-if="isUser">

        <p>{{ $t('private_data') }}:</p>

        <!-- Email -->
        <div v-if="isEditting !== 'email'">
            <b>{{ $t('Email') }}:</b> {{ userInfo.email }}
            <button
              v-if="!isEditting"
              @click="openEdit('email')"
              class="btn btn-color-sec small-all-margin">
              {{ $t('edit') }}
            </button>
        </div>
        <!-- Edit Email -->
        <div v-else>
            <div class="form-group form">
                <label class="sr-only"
                        for="user-edit-email">
                    {{ $t('E-mail') }}
                </label>
                <input type="text"
                       class="form-control"
                       id="user-edit-email"
                       v-model="email"
                       :placeholder="$t('E-mail')">
                <div class="control-buttons">
                    <button-spinner type="submit"
                      :condition="pending.sendEdit"
                            @click.prevent.native="sendEdit"
                            class="btn btn-color-sec">
                        {{ $t('Save') }}
                    </button-spinner>
                    <button class="btn btn-color-sec"
                            @click.prevent="isEditting = null">
                        {{ $t('Cancel') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Password -->
        <div v-if="isEditting !== 'password'">
            <b>{{ $t('Password') }}</b>
            <button
              v-if="!isEditting"
              @click="openEdit('password')"
              class="btn btn-color-sec small-all-margin">
              {{ $t('edit') }}
            </button>
        </div>
        <!-- Edit Password -->
        <div v-else>
            <form class="form pessoa-edit-password-form">
                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-curr-password">
                        {{ $t('Current password') }}
                    </label>
                    <input type="password"
                        class="form-control { checkFieldError('password') }"
                        id="user-edit-curr-password"
                        v-model="oldPassword"
                        :placeholder="$t('Current password')">
                </div>

                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-new-password">
                        {{ $t('New password') }}
                    </label>
                    <input type="password"
                            class="form-control { checkFieldError('new_password') }"
                            id="user-edit-new-password"
                        v-model="newPassword"
                            :placeholder="$t('New password')">
                </div>

                <div class="form-group form-inline">
                    <label class="sr-only"
                            for="user-edit-confirm-password">
                        {{ $t("Confirm new password") }}
                    </label>
                    <input type="password"
                            class="form-control { checkFieldError('confirm-password') }"
                            id="user-edit-confirm-password"
                        v-model="newPasswordConfirm"
                            :placeholder="$t('Confirm new password')">
                </div>

                <button-spinner type="submit"
                      :condition="pending.sendEdit"
                        @click.prevent.native="sendEdit"
                        class="btn btn-color-sec">
                    {{ $t('Save') }}
                </button-spinner>
                <button class="btn btn-warning"
                        @click.prevent="isEditting = null">
                    {{ $t('Cancel') }}
                </button>
            </form>
        </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user-info',
  data () {
    return {
      email: '',
      description: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      isEditting: null
    }
  },
  computed: {
    isUser () {
      return this.username === this.userInfo.username
    },
    ...mapState({
      userInfo: state => state.auth.userInfo,
      username: state => state.auth.username,
      pending: state => state.auth.pending
    })
  },
  methods: {
    openEdit (field) {
      // Populate field value before openning
      if (field !== 'password') {
        this[field] = this.userInfo[field]
      }
      this.isEditting = field
    },
    async sendEdit () {
      let data = { username: this.userInfo.username }
      if (this.isEditting === 'email') {
        data.email = this.email
      } else if (this.isEditting === 'description') {
        data.description = this.description
      } else if (this.isEditting === 'password') {
        // Trying to change password
        if (this.newPassword !== this.newPasswordConfirm) {
          this.addError('Different passwords')
          return false
        } else {
          data.password = this.oldPassword
          data['new_password'] = this.newPassword
        }
      }
      await this.sendEditMyUserInfo(data)
      this.isEditting = null
    },
    ...mapActions(['sendEditMyUserInfo', 'addError'])
  }
}
</script>
