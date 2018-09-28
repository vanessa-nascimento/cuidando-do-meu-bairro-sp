<template>
    <div class="modal-body">
        <h2>Recorrer</h2>

        <p>Aqui você tem como enviar seu recurso a respeito do gasto. Lembre-se que tanto sua pergunta como a resposta que vai receber do órgão público responsável serão compartilhadas aqui nesse site para todas as pessoas que estiverem interessadas. Para aumentar as chances de receber uma resposta satisfatória, elabore sua recurso levando em conta algumas dicas, veja <a href="http://cafehacker.prefeitura.sp.gov.br/wp-content/uploads/2014/09/cartilha_acessoainfosp.pdf" target="_blank">aqui</a> algumas delas.

        <form class="form">
            <div class="form-group">
                <label class="sr-only" for="new-recurso-textarea">
                    {{ $t('Question') }}
                </label>
                <textarea id="new-recurso-textarea"
                    class="form-control"
                    :maxlength="maxPedidoLength"
                    rows="5"/>
                    <p>{{ $t('Remaining characters') }}: {{ remainingChars }}</p>
            </div>
            <button-spinner type="submit"
                    @click.prevent.native="sendRecurso({ key: $route.params.code, orgao, text })"
                    class="btn btn-color-sec float-right relative">
                {{ $t("Send") }}
            </button-spinner>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'recurso-form',
  data () {
    return {
      text: '',
      maxPedidoLength: 5000
    }
  },
  computed: {
    remainingChars () {
      return this.maxPedidoLength - this.text.length
    },
    ...mapState({
      pointInfo: state => state.money.pointInfo
    })
  },
  methods: {
    ...mapActions([
      'sendRecurso'
    ])
  }
}
</script>
