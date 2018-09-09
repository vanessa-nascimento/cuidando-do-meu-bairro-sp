<template>
  <div class="map">

    <year-select/>

    <div class="input-group search-address">
        <input id="search-address-input"
               class="input-medium search-query form-control"
               type="text"
               onkeypress="{ ifEnter(locateAddress) }"
               placeholder="{ t('Search for an address') }">
        <span class="input-group-btn">
            <button onclick="{ locateAddress }"
                    class="btn btn-color-sec"
                    type="button">
                <img src="{ assets.lupa }">
            </button>
        </span>
    </div>

    <div id="bigmap-container">
        <div id="map-parent-container" class="{ map-big: opts.big }" if="{ opts.showmap }">
            <div v-if="show">
              <p v-if="pending">Looooding</p>
              <l-map ref="map" id="map-container" style="height: 600px" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <v-marker-cluster :options="markerClusterOptions">
                  <l-geo-json :key="geoJson.features[0].properties.uid" v-for="geoJson in geoJsons" :geojson="geoJson" :options="geoJsonOptions"></l-geo-json>
                </v-marker-cluster>
              </l-map>
            </div>
            <p v-else>...............</p>

            <div if="{ opts.big }" class="map-legend-container">
                <div class="map-legend">
                    <b class="darker-text">{ t("Map legend") }:</b>
                    <div each="{ cat, i in categories }"
                        class="capitalize map-category">
                        <img src="{ assets[cat] }">
                        { t(cat) }
                    </div>
                </div>
            </div>
            <div class="map-attribution">
                <a target="_blank" href="https://www.openstreetmap.org/copyright/pt-BR">© contribuidores do OpenStreetMap</a>
                <a target="_blank" href="http://mapbox.com">MB</a>
            </div>
            <div if="{ opts.big }"
                 class="map-update-time">
                { t('source') }: <a target="_blank" href="http://orcamento.sf.prefeitura.sp.gov.br/orcamento/execucao.php">Secretaria de Finanças</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import YearSelect from '@/components/YearSelect.vue'

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
      show: false,
      zoom: 12,
      center: L.latLng(-23.58098, -46.61293),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markerClusterOptions: {
        maxClusterRadius: 100,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      },
      geoJsonOptions: {
        onEachFeature (feature, layer) {
          layer.on('click', self.pointClicked)
        }
      }
    }
  },
  async mounted () {
    await this.getYearPoints({ params: { year: this.year } })
    this.show = true
  },
  computed: {
    geoJsons () {
      return [this.yearPoints]
    },
    ...mapState({
      yearPoints: state => state.money.yearPoints,
      pending: state => state.money.pending.yearPoints,
      year: state => state.route.params.year
    })
  },
  methods: {
    pointClicked (event) {
      let code = event.target.feature.properties.uid
      this.$refs.map.mapObject.panTo(event.latlng)
      this.$router.push({ name: 'despesa', params: { code } })
    },
    ...mapActions([
      'getYearPoints'
    ])
  }
}
</script>
