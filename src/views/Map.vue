<template>
  <div :class="{ map: true, 'map-big': big }">

    <year-select v-if="big"/>

    <div v-if="big" class="input-group search-address">
        <input id="search-address-input"
               class="input-medium search-query form-control"
               type="text"
               v-model="searchAddress"
               @keypress.enter="locateAddress"
               :placeholder="$t('Search for an address')">
        <span class="input-group-btn">
            <button @click="locateAddress"
                    class="btn btn-color-sec"
                    type="button">
                <img :src="$assets.lupa">
            </button>
        </span>
    </div>

    <div id="map-parent-container" :class="{ 'map-big': big }">
        <l-map ref="map" id="map-container" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution" :id="id" :accessToken="accessToken"></l-tile-layer>
          <v-marker-cluster :options="markerClusterOptions">
            <l-geo-json v-if="geoJson.features" :key="geoJson.features[0].properties.uid" v-for="geoJson in geoJsons" :geojson="geoJson" :options="geoJsonOptions"></l-geo-json>
          </v-marker-cluster>
        </l-map>

        <div v-if="big" class="map-legend-container">
            <div class="map-legend">
                <b class="darker-text">{{ $t("Map legend") }}:</b>
                <div v-for="(cat, i) in categories" :key="i"
                    class="capitalize map-category">
                    <img :src="$assets[cat]">
                    {{ $t(cat) }}
                </div>
            </div>
        </div>
        <div class="map-attribution">
            <a target="_blank" href="https://www.openstreetmap.org/copyright/pt-BR">© contribuidores do OpenStreetMap</a>
            <a target="_blank" href="http://mapbox.com">MB</a>
        </div>
        <div v-if="big" class="map-update-time">
            {{ $t('source') }}: <a target="_blank" href="http://orcamento.sf.prefeitura.sp.gov.br/orcamento/execucao.php">Secretaria de Finanças</a>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import L from 'leaflet'
import axios from 'axios'
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import YearSelect from '@/components/YearSelect.vue'
import { assets } from '@/assets'

var greenIcon = L.icon({
  iconUrl: assets.empenhado,
  iconSize: [25, 41],
  popupAnchor: [0, -10]
})
var blueIcon = L.icon({
  iconUrl: assets.liquidado,
  iconSize: [25, 41],
  popupAnchor: [0, -10]
})
var redIcon = L.icon({
  iconUrl: assets.planejado,
  iconSize: [25, 41],
  popupAnchor: [0, -10]
})
var icons = {
  orcado: redIcon,
  atualizado: redIcon,
  empenhado: greenIcon,
  liquidado: blueIcon
}

export default {
  name: 'map-despesas',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    YearSelect
  },
  data () {
    var self = this
    return {
      searchAddress: '',
      categories: ['planejado', 'empenhado', 'liquidado'],
      zoom: 12,
      center: L.latLng(-23.58098, -46.61293),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      // url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      id: 'cuidando.nlj83mlb',
      accessToken: 'pk.eyJ1IjoiY3VpZGFuZG8iLCJhIjoiY2lmandrYmEzNDBqbml1bHhlZzZtbWc0MSJ9.TZYl7sV3NHwSx5fk8JHqQg',
      markerClusterOptions: {
        maxClusterRadius: 100,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      },
      geoJsonOptions: {
        pointToLayer (feature, latlng) {
          return L.marker(latlng, { icon: icons[feature.properties.state] })
        },
        onEachFeature (feature, layer) {
          layer.on('click', self.pointClicked)
        }
      }
    }
  },
  mounted () {
    // let self = this
    // setInterval(
    //   function () {
    //     if (self.$refs && self.$refs.map) {
    //       window.m = self.$refs.map.mapObject
    //       self.$refs.map.mapObject.invalidateSize()
    //       // this.$refs.map.mapObject.layerBase.redraw()
    //     }
    //   }, 10)
  },
  computed: {
    // if the map should display big or not
    big () {
      return this.$route.name === 'home'
    },
    geoJsons () {
      return [this.yearPoints]
    },
    ...mapState({
      yearPoints: state => state.money.yearPoints,
      pending: state => state.money.pending.yearPoints
    })
  },
  methods: {
    pointClicked (event) {
      let code = event.target.feature.properties.uid
      this.$refs.map.mapObject.panTo(event.latlng)
      this.$router.push({ name: 'despesa', params: { code } })
    },
    async locateAddress () {
      let base = 'https://nominatim.openstreetmap.org/search/'
      let query = '?format=json&limit=1&countrycodes=br&viewbox=-47.16,-23.36,-45.97,-23.98&bounded=1'
      let url = base + this.searchAddress + query
      let json = (await axios.get(url)).data

      if (json) {
        if (json.length) this.$refs.map.mapObject.setView([json[0].lat, json[0].lon], 16)
        // TODO erro
        // else msgs.addError('address_not_found')
      }
    }
  }
}
</script>
