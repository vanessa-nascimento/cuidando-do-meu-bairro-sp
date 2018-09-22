<template>
    <div class="modal-body">
        <h2>O que deseja perguntar?</h2>

        <p>Aqui você tem como enviar sua dúvida a respeito do gasto. Lembre-se que tanto sua pergunta como a resposta que vai receber do órgão público responsável serão compartilhadas aqui nesse site para todas as pessoas que estiverem interessadas. Para aumentar as chances de receber uma resposta satisfatória, elabore sua pergunta levando em conta algumas dicas, veja <a href="http://cafehacker.prefeitura.sp.gov.br/wp-content/uploads/2014/09/cartilha_acessoainfosp.pdf" target="_blank">aqui</a> algumas delas.
        </p>

        <p v-if="!bestFitOrgao"><b>Ops... Parece que não conseguimos achar, na lista do Esic, o órgão responsável por essa despesa. Por favor, escolha um na lista abaixo.</b></p>

        <styled-select class="separated-caret text-left" :options="orgaos" v-model="orgao"/>

        <p>{{ inicioPergunta }}</p>

        <form class="form">
            <div class="form-group">
                <label class="sr-only" for="new-pergunta-textarea">
                    {{ $t('Question') }}
                </label>
                <textarea id="new-pergunta-textarea"
                    class="form-control"
                    :maxlength="maxPedidoLength"
                    v-model="text"
                    rows="5"/>
                    <p>{{ $t('Remaining characters') }}: {{ remainingChars }}</p>
            </div>
            <button-spinner type="submit"
                    @click.prevent.native="sendPedido"
                    class="btn btn-color-sec float-right relative">
                {{ $t("Send") }}
            </button-spinner>
        </form>

        <p>Li e concordo com os <a>termos de uso</a>.</p>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'pergunta-form',
  async mounted () {
    await Promise.all([this.getOrgaos(), this.getPointInfo({ params: { code: this.$route.params.code } })])
    // Initialize orgao var based on orgao in data
    if (!this.orgao && this.bestFitOrgao) this.orgao = this.bestFitOrgao
  },
  data () {
    return {
      text: '',
      maxPedidoLength: 5000,
      orgao: null
    }
  },
  computed: {
    remainingChars () {
      return this.maxPedidoLength - this.text.length
    },
    bestFitOrgao () {
      // If has a orgaos list
      if (this.orgaos) {
        // Tries to find the correct orgao for this despesa
        if (this.pointInfo) {
          for (let orgao of this.orgaos) {
            if (orgao.key.includes(this.pointInfo.ds_orgao.trim())) {
              return orgao.key
            }
          }
        }
      }
      return null
    },
    inicioPergunta () {
      return `Referente ao gasto público "${this.pointInfo.ds_projeto_atividade}", de ${this.pointInfo.cd_anoexecucao}, cujo órgão responsável é "${this.pointInfo.ds_orgao}", solicito informações:`
    },
    ...mapState({
      pointInfo: state => state.money.pointInfo,
      orgaos: state => state.esic.orgaos
    })
  },
  methods: {
    // TODO
    sendPedido () {},
    ...mapActions([
      'getPointInfo',
      'getOrgaos'
    ])
  }
}
</script>
