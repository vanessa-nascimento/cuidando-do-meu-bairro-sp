<template>
    <nav class="navbar navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button"
                        class="navbar-toggle collapsed"
                        @click="isExpanded = !isExpanded"
                        data-toggle="collapse"
                        data-target="#navbar"
                        :aria-expanded="isExpanded"
                        aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link id="home-button"
                   class="navbar-brand"
                   to="{ name: 'home' }">
                    <img :src="$assets.logo">
                    <span class="beta-mark">BETA</span>
                </router-link>
            </div>

            <div id="navbar"
                 :class="{ collapse: true, 'navbar-collapse': true, in: isExpanded }">
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <router-link :to="{ name: 'about'}">About</router-link>
                  </li>

                  <li><a href="http://blog.cuidando.vc" target="_blank">Blog</a></li>

                    <li>
                        <a :href="shareLink">
                            {{ $t('Share') }}
                        </a>
                    </li>

                    <li v-if="username">
                        <router-link :to="{ name: 'pessoa', params: { username } }">
                        {{ username }}
                        </router-link>
                    </li>
                    <li v-if="!username">
                        <a @click="openLoginModal">
                        {{ $t("Login") }}
                        </a>
                    </li>
                    <li v-if="username"><a @click="sendLogout">
                        {{ $t("Logout") }}
                    </a></li>

                    <li>
                        <styled-select :options="langs" :selected-value="lang" @change="selectedLang"/>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'
import StyledSelect from '@/components/StyledSelect.vue'
export default {
  name: 'main-menu',
  components: {
    StyledSelect
  },
  data () {
    return {
      langs: [
        { key: 'pt-br', value: 'Português' },
        { key: 'en', value: 'English' }
      ],
      isExpanded: false
    }
  },
  computed: {
    shareLink () {
      let page = encodeURIComponent(location.origin + this.$route.fullPath)
      return `http://www.facebook.com/sharer.php?u=${page}`
    },
    ...mapState({
      lang: state => state.route.query.lang
    })
  },
  methods: {
    closeExpanded () {
      this.isExpanded = false
    },
    openLoginModal (event) {
      this.closeExpanded()
      // TODO
      // this['modal-login']._tag.openModal(event)
    },
    selectedLang (lang) {
      this.closeExpanded()
      // TODO route?
      // this.triggerChange('lang', lang)
    },
    sendLogout () {
      this.closeExpanded()
      // TODO
      // this.triggerChange('logout')
    }
  }
}
</script>
