<template>
  <li class="top-bar">
      <div class="row">
          <div class="col-xs-1">
              <img class="icon block-center" :src="$assets.aPer">
          </div>
          <div class="col-xs-11 col-sm-7">
              <div :class="{ 'full-width': true, 'hide-extra': !showRespostas }">
                  {{ pedido.description }}
              </div>
          </div>
          <div class="col-xs-12 col-sm-4">
              <div class="row text-center">
                  <div class="col-xs-6">
                    {{ pedido.request_date ? formatDate(pedido.request_date) : '' }}
                  </div>
                  <div class="col-xs-6">
                      <router-link :to="{ name: 'pessoa', params: { username: pedido.author } }">
                        {{ pedido.author }}
                      </router-link>
                  </div>
              </div>
          </div>
      </div>

        <button @click="openNewRecursoForm"
                v-if="pedido.allow_recurso && username == pedido.author"
                class="btn btn-color-sec block-right margin-bottom">
          {{ $t('Appeal') }}
          <span class="right-arrow"/>
        </button>

        <!-- <button type="submit" -->
        <!--         v-if="!checkSubscribed(pedido.notification_id)" -->
        <!--         @click="subscribe" -->
        <!--         class="btn btn-color-sec block-right relative margin-bottom"> -->
        <!--   <\!-- <spinneror condition="{ waitings[notification_id] && waitings[notification_id]['subscribeWaiting'] }" scale="0.15"> -\-> -->
        <!--     {{ $t("Follow question") }} -->
        <!--   <\!-- </spinneror> -\-> -->
        <!-- </button> -->
        <!-- <button type="submit" -->
        <!--         v-else -->
        <!--         @click="unsubscribe" -->
        <!--         class="btn btn-color-sec block-right relative margin-bottom"> -->
        <!--   <\!-- <spinneror condition="{ waitings[notification_id] && waitings[notification_id]['unsubscribeWaiting'] }" scale="0.15"> -\-> -->
        <!--     { {$ t("Unfollow question") }} -->
        <!--   <\!-- </spinneror> -\-> -->
        <!-- </button> -->

      <div class="text-right"
          v-if="!showRespostas">
          <a @click="showRespostas = true">
              {{ pedido.history.length }}
              {{ pedido.history.length-1 > 1 ? $t('respostas') : $t('resposta') }}
              <span class="down-arrow"></span>
          </a>
      </div>
      <div v-else>
          <p><b>Protocolo:</b> {{ pedido.protocol }}</p>
          <p><b>Órgão:</b> {{ pedido.orgao_name }}</p>
          <div v-if="pedido.attachments.length">
              <h3>Anexos</h3>
              <ul>
                  <li v-for="(attachment, i) in attachments" :key="i">
                      <a :href="attachment.ia_url" target="_blank">{{ attachment.name }}</a>
                  </li>
              </ul>
          </div>
          <h3>Respostas</h3>
          <ul class="list-bare">
              <li v-for="(item, i) in pedido.history" :key="i">
                  <div v-if="item.date">
                      <b>{{ $t('Date') }}:</b> {{ formatDate(item.date) }}
                  </div>
                  <div v-if="item.responsible">
                      <b>{{ $t('Responsible') }}:</b> {{ item.responsible }}
                  </div>
                  <div v-if="item.situation">
                      <b>{{ $t('State') }}:</b> {{ item.situation }}
                  </div>
                  <p>{{ item.justification }}</p>
              </li>
          </ul>
          <a @click="hideRespostas(pedido)">
              {{ $t('hide') }}
              <span class="up-arrow"></span>
          </a>
      </div>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate } from '@/utils'
export default {
  name: 'pergunta-pedido',
  props: {
    pedido: Object
  },
  components: {
  },
  data () {
    return {
      showRespostas: false
    }
  },
  computed: {
    ...mapState({
      username: state => state.auth.username
    })
  },
  methods: {
    formatDate
  }
}
</script>
