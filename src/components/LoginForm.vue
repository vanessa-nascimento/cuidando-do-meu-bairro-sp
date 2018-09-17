<template>
  <div>
    <div class="modal-header">
        <img class="block-center" :src="$assets.logo">
    </div>

    <div class="text-center modal-body">

        <!-- Error messages -->
        <p v-if="errorData" class="text-center msg error-msg">
          {{ $t(errorData.message) }}
        </p>

        <p v-if="view === 'forgot2'">
            {{ $t('login_form_use_reset_code', { minutes: exp_reset_code }) }}
        </p>

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

            <!-- Reset Code -->
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
                        :placeholder="$t('Code')">
            </div>

            <!-- Password -->
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

            <!-- Confirm Password -->
            <div class="form-group"
                 v-if="view === 'register' || view === 'forgot2'">
                <label class="sr-only"
                        for="login-form-confirm-password">
                    {{ $t("Confirm Password") }}
                </label>
                <input type="password"
                        :class="['form-control', checkFieldError('confirm-password')]"
                        id="login-form-confirm-password"
                       v-model="passwordConf"
                        :placeholder="$t('Confirm Password')">
            </div>

            <!-- Request Login -->
            <button-spinner
              type="submit"
              :class="['btn btn-color-sec modal-button', disabledOnEmpty(username, password)]"
              @click.prevent.native="sendLogin"
              :condition="pending.username"
              v-if="view === 'login'">
                {{ $t('Login') }}
            </button-spinner>

            <!-- Request Register -->
            <button-spinner
              type="submit"
              :class="['btn btn-color-sec modal-button', disabledOnEmpty(username, password, passwordConf, email)]"
              @click.prevent.native="sendRegister"
              :condition="pending.username"
              v-if="view === 'register'">
                {{ $t("Register") }}
            </button-spinner>

            <!-- Request Reset Code -->
            <button-spinner
              type="submit"
              class="btn btn-color-sec modal-button"
              @click="forgotPassword"
              v-if="view === 'forgot1'">
              {{ $t("Request reset code") }}
            </button-spinner>

            <!-- Request Reset -->
            <button-spinner
              type="submit"
              class="btn btn-color-sec modal-button"
              @click="resetPassword"
              v-if="view === 'forgot2'">
              {{ $t("Change password and login") }}
            </button-spinner>
        </form>

        <div>
          <a class="modal-anchor" @click="view = 'register'" v-if="view === 'login'">
            {{ $t("Register") }}
          </a>
        </div>

        <div>
          <a class="modal-anchor" @click="view = 'forgot1'" v-if="view === 'login'">
            {{ $t("Forgot password") }}
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'login-form',
  components: {
  },
  data () {
    return {
      view: 'login',
      username: '',
      password: '',
      passwordConf: '',
      email: ''
    }
  },
  computed: {
    ...mapState({
      pending: state => state.auth.pending,
      errorData: state => state.auth.errorData
    })
  },
  mounted () {
    this.setAuthError(null)
    this.$refs.username.focus()
  },
  methods: {
    disabledOnEmpty (...args) {
      for (let arg of args) {
        if (!arg.length) return 'disabled'
      }
      return ''
    },
    changeView (view, event) {
      // this.clearError()
      this.view = {}
      this.view[view] = true
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
    async sendRegister () {
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
    ...mapActions([
      'resetPassword',
      'registerUser',
      'loginUser',
      'forgotPassword',
      'resetPassword'
    ]),
    ...mapMutations(['closeModal', 'setAuthError'])
  }
}
</script>
