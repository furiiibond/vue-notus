<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Bots
          </h3>
        </div>
        <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
        </div>
        <br><br>
        <br>
        <input class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none ease-linear transition-all duration-150" type="text" v-model="message" placeholder="send command" id="cmd" v-on:keyup.enter="sendMessage(message)">
        <v-btn class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150"
               type="button" v-on:click="gettask()"
               color="primary"
               elevation="5"
        > Voir les tâches </v-btn>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                nom
              </th>
              <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                état
              </th>
              <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                progression
              </th>
            </tr>
            </thead>
            <tbody id='table'>
            <tr v-for="(element,index) in tasks" :key="element" v-on:click="updateSelected(index)">
              <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                {{element.profil.name}}
              </th>

              <td v-if="element.profil.state == 'completed' || element.profil.published == element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-green-500 mr-2"></i> Terminé </td>
              <td v-if="element.profil.state == 'error' && element.profil.published == 0" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-red-500 mr-2"></i> Erreur </td>
              <td v-if="element.profil.state == 'error' && element.profil.published != 0" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-orange-500 mr-2"></i> Partiellement terminé </td>
              <td v-if="element.profil.state == 'initialized' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-blueGray-500 mr-2"></i> Initialiser </td>
              <td v-if="element.profil.state == 'pending' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-lightBlue-600 mr-2"></i> En Attente </td>
              <td v-if="element.profil.state == 'running' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="clignote fas fa-arrow-alt-circle-right text-green-500 mr-2"></i> En cours d'éxecution </td>

              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex items-center">
                  <span class="mr-2">
                  {{element.profil.published}}/{{element.nbPubli}}</span>
                  <div class="relative w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200">
                      <div :style="'width:'+(element.profil.published/element.nbPubli)*100+'%;'" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"></div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['tasks'],
  methods: {
    sendMessage: function (message) {
      this.$emit('sendMessage', message)
      document.getElementById('cmd').value = '';
    },
    gettask: function () {
      this.$emit('gettask')
    },
    updateSelected: function (selected) {
      this.$emit('updateSelected', selected)
    },
  },
}
</script>


<style scoped>

</style>