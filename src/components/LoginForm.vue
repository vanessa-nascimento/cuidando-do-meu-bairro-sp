<template>
  <div>
    <div class="modal-header">
        <img class="block-center" :src="$assets.logo">
    </div>

    <div class="text-center modal-body">

      <transition name="fade" mode="out-in">
        <!-- Error messages -->
        <p v-if="errorData" class="text-center msg error-msg">
          {{ $t(errorData.message) }}
        </p>
      </transition>

      <transition name="fade" mode="out-in">
        <p v-if="view === 'forgot2'">
            {{ $t('login_form_use_reset_code', { minutes: expResetCode / 60 }) }}
        </p>
      </transition>

        <form class="form">

          <!-- Username -->
          <div class="form-group">
              <label class="sr-only"
                      for="login-form-username">
                  {{ $t('Username') }}
              </label>
              <input type="text"
                      :class="['form-control', checkFieldError('username')]"
                      id="login-form-username"
                      ref="username"
                      v-model="username"
                      :placeholder="$t('Username')">
          </div>

          <!-- Email -->
          <transition name="fade" mode="out-in">
            <div class="form-group"
                 v-if="view !== 'login'">
                <label class="sr-only" for="login-form-email">
                    {{ $t('E-mail') }}
                </label>
                <input type="email"
                    :class="['form-control', checkFieldError('email')]"
                    id="login-form-email"
                       v-model="email"
                    :placeholder="$t('E-mail')">
            </div>
          </transition>

          <!-- Reset Code -->
          <transition name="fade" mode="out-in">
            <div class="form-group"
                 v-if="view === 'forgot2'">
                <label class="sr-only"
                    for="login-form-code">
                    {{ $t("Code") }}
                </label>
                <input type="text"
                        :class="['form-control', checkFieldError('code')]"
                        id="login-form-code"
                        autocomplete="off"
                       v-model="code"
                        :placeholder="$t('Code')">
            </div>
          </transition>

          <!-- Password -->
          <transition name="fade" mode="out-in">
            <div class="form-group"
                 v-if="view !== 'forgot1'">
                <label class="sr-only"
                        for="login-form-password">
                    {{ $t('Password') }}
                </label>
                <input type="password"
                        :class="['form-control', checkFieldError('password')]"
                        id="login-form-password"
                       v-model="password"
                        :placeholder="$t('Password')">
            </div>
          </transition>

          <!-- Confirm Password -->
          <transition name="fade" mode="out-in">
            <div class="form-group"
                 v-if="view === 'register' || view === 'forgot2'">
                <label class="sr-only"
                        for="login-form-confirm-password">
                    {{ $t('Confirm Password') }}
                </label>
                <input type="password"
                        :class="['form-control', checkFieldError('confirm-password')]"
                        id="login-form-confirm-password"
                       v-model="passwordConf"
                        :placeholder="$t('Confirm Password')">
            </div>
          </transition>

          <!-- Request Login -->
          <transition name="fade" mode="out-in">
            <button-spinner
              v-if="view === 'login'"
              type="submit"
              class="modal-button"
              @click.prevent.native="sendLogin"
              :condition="pending.username"
              :disabled="anyEmpty(username, password)">
                {{ $t('Login') }}
            </button-spinner>

            <!-- Request Register -->
            <button-spinner
              v-if="view === 'register'"
              type="submit"
              class="modal-button"
              @click.prevent.native="sendRegister"
              :condition="pending.username"
              :disabled="anyEmpty(username, password, passwordConf, email)">
                {{ $t('Register') }}
            </button-spinner>

            <!-- Request Reset Code -->
            <button-spinner
              v-if="view === 'forgot1'"
              type="submit"
              class="modal-button"
              @click.prevent.native="sendForgot"
              :condition="pending.expResetCode"
              :disabled="anyEmpty(username, email)">
              {{ $t('Request reset code') }}
            </button-spinner>

            <!-- Request Reset -->
            <button-spinner
              v-if="view === 'forgot2'"
              type="submit"
              class="modal-button"
              @click.prevent.native="sendReset"
              :disabled="anyEmpty(username, password, passwordConf, email, code)">
              {{ $t('Change password and login') }}
            </button-spinner>
          </transition>
        </form>

        <div>
          <a class="modal-anchor" @click="view = 'register'" v-if="view === 'login'">
            {{ $t('Register') }}
          </a>
        </div>

        <div>
          <a class="modal-anchor" @click="view = 'forgot1'" v-if="view === 'login'">
            {{ $t('Forgot password') }}
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'login-form',
  data () {
    return {
      view: 'login',
      username: '',
      password: '',
      passwordConf: '',
      code: '',
      email: ''
    }
  },
  computed: {
    ...mapState({
      pending: state => state.auth.pending,
      expResetCode: state => state.auth.expResetCode,
      errorData: state => state.auth.errorData
    })
  },
  mounted () {
    this.clearError()
    this.$refs.username.focus()
  },
  methods: {
    anyEmpty (...args) {
      for (let arg of args) {
        if (!arg.length) return true
      }
      return false
    },
    clearError () {
      this.setAuthError(null)
    },
    changeView (view, event) {
      this.clearError()
      this.view = {}
      this.view[view] = true
      // TODO precisa?
      // acme to avoid closing modal
      // if (event) event.ignoreEvent = true
    },
    checkFieldError (field) {
      if (this.errorData && this.errorData.fields.includes(field)) {
        return 'incorrect-field'
      } else return ''
    },
    async sendLogin () {
      try {
        await this.loginUser({ data: { username: this.username, password: this.password } })
        this.closeModal()
      } catch (e) {}
    },
    async sendRegister (e) {
      if (this.password !== this.passwordConf) {
        this.setAuthError({ message: 'Different passwords', fields: ['password', 'confirm-password'] })
        return false
      }
      try {
        await this.registerUser({
          data: {
            username: this.username,
            password: this.password,
            email: this.email
          }
        })
        this.closeModal()
      } catch (e) {}
    },
    async sendForgot () {
      try {
        await this.forgotPassword({ data: { username: this.username, email: this.email } })
        this.view = 'forgot2'
        this.clearError()
      } catch (e) {}
    },
    async sendReset () {
      if (this.password !== this.passwordConf) {
        this.setAuthError({ message: 'Different passwords', fields: ['password', 'confirm-password'] })
        return false
      }
      try {
        await this.resetPassword({
          data: {
            username: this.username,
            password: this.password,
            email: this.email,
            code: this.code
          }
        })
        this.closeModal()
      } catch (e) {}
    },
    ...mapActions([
      'resetPassword',
      'registerUser',
      'loginUser',
      'forgotPassword'
    ]),
    ...mapMutations(['closeModal', 'setAuthError'])
  }
}
</script>
