<template>
  <div v-if="userPerguntas.length">
    <h2>Perguntas Feitas</h2>
    <li v-for="pergunta in userPerguntas" :key="pergunta.protocolo">
      <router-link :to="routeToDespesa(pergunta.keywords[0])">
        {{ pergunta.protocolo }} - {{ pergunta.orgao }} - {{ pergunta.situacao }}
      </router-link>
    </li>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-perguntas',
  computed: {
    ...mapState({
      userPerguntas: state => state.esic.userPerguntas
    })
  },
  methods: {
    routeToDespesa (keyword) {
      return {
        name: 'despesa',
        params: {
          year: keyword.slice(0, 4),
          code: keyword
        }
      }
    }
  }
}
</script>
