<template>
  <div class="container">
    <user-info/>
    <!-- Subscriptions -------------------- -->
    <!-- <div if={listUserSubscriptions().length}> -->
    <!--   <h2>Itens Acompanhados</h2> -->
    <!--   <li each={el in listUserSubscriptions()}> -->
    <!--     <a href="{el.template_data.link}">{el.tag}</a> -->

    <!--     <button type="submit" -->
    <!--             onclick="{ unsubscribe }" -->
    <!--             class="btn btn-color-sec block-right relative margin-bottom"> -->
    <!--       <spinneror condition="{ waitings[el.tag] && waitings[el.tag]['unsubscribeWaiting'] }" scale="0.15">{ t("Unfollow") }</spinneror> -->
    <!--     </button> -->
    <!--   </li> -->
    <!-- </div> -->

    <!-- Perguntas -------------------- -->
    <!-- <div if={listUserPedidos().length}> -->
    <!--   <h2>Perguntas Feitas</h2> -->
    <!--   <li each={pedido in listUserPedidos()}> -->
    <!--     <a href="{ getRoute(pedido.keywords[0]) }"> -->
    <!--       {pedido.protocolo} - {pedido.orgao} - {pedido.situacao} -->
    <!--     </a> -->
    <!--   </li> -->
    <!-- </div> -->
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
export default {
  name: 'pessoa-view',
  components: {
    UserInfo
  }
}
</script>
