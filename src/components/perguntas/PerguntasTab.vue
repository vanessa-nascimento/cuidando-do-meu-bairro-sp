<template>
  <div class="perguntas">
    <div class="row">
        <div class="col-sm-8">
            <h2>{{ $t('want_to_question?') }}</h2>
        </div>

        <div class="col-sm-4 new-perg-button">
            <button @click="openModal('pergunta')"
                    class="btn btn-color-sec block-right">
                {{ $t('Make a question') }}
                <span class="right-arrow"/>
            </button>
        </div>
    </div>

    <!-- <modal> -->
    <!--     <new-pergunta-form/> -->
    <!-- </modal> -->

    <!-- <modal> -->
    <!--   <new-recurso-form/> -->
    <!-- </modal> -->

    <ul class="list-bare">
      <li class="top-bar" v-for="(prepedido, i) in pedidos.prepedidos" :key="i">
        <p><b>Pergunta enviada:</b> {{ prepedido.text }}</p>
      </li>
    </ul>
    <ul class="list-bare">
      <pergunta-item v-for="(pedido, i) in pedidos" :key="i" :pedido="pedido"/>
    </ul>

    <modal-box modal-id="pergunta">
        <pergunta-form/>
    </modal-box>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PerguntaItem from '@/components/perguntas/PerguntaItem.vue'
import PerguntaForm from '@/components/perguntas/PerguntaForm.vue'

export default {
  name: 'perguntas-tab',
  components: {
    PerguntaItem,
    PerguntaForm
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
    ...mapMutations(['openModal'])
  }
}
</script>
