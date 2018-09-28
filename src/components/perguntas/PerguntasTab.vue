<template>
  <div class="perguntas">

    <div class="row">
        <div class="col-sm-8">
            <h2>{{ $t('want_to_question?') }}</h2>
        </div>

        <div class="col-sm-4 new-perg-button">
            <button @click="openModal('pergunta')"
                    @focus="requireLogin"
                    class="btn btn-color-sec block-right">
                {{ $t('Make a question') }}
                <span class="right-arrow"/>
            </button>
        </div>
    </div>

    <!-- Prepedidos -->
    <ul class="list-bare">
      <li class="top-bar" v-for="(prepedido, i) in pedidos.prepedidos" :key="i">
        <p><b>Pergunta enviada:</b> {{ prepedido.text }}</p>
      </li>
    </ul>

    <!-- Perguntas -->
    <ul class="list-bare">
      <pergunta-item v-for="(pedido, i) in pedidos" :key="i" :pedido="pedido"/>
    </ul>

    <modal-box modal-id="pergunta">
        <pergunta-form/>
    </modal-box>

    <modal-box modal-id="recurso">
        <recurso-form/>
    </modal-box>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import PerguntaItem from '@/components/perguntas/PerguntaItem.vue'
import PerguntaForm from '@/components/perguntas/PerguntaForm.vue'
import RecursoForm from '@/components/perguntas/RecursoForm.vue'

export default {
  name: 'perguntas-tab',
  components: {
    PerguntaItem,
    PerguntaForm,
    RecursoForm
  },
  computed: {
    ...mapState({
      pedidos: state => state.esic.pedidos,
      prepedidos: state => state.esic.prepedidos
    })
  },
  methods: {
    // TODO
    checkSubscribed () {
    },
    subscribe () {
    },
    ...mapActions(['requireLogin']),
    ...mapMutations(['openModal'])
  }
}
</script>
