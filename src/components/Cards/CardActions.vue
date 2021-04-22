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
        <ul>
          <li v-for="(element, index) in test" :key="index">
            <component :is="element.type" :element="element" />
          </li>
        </ul>
        <button v-on:click="sendMessage('hello')">Send Message</button>
        <br><br>
        <span>Message is: {{ message }}</span>
        <br>
        <input type="text" v-model="message" placeholder="send command"  v-on:keyup.enter="sendMessage(message)">
        <v-btn v-on:click="gettask()"
               color="primary"
               elevation="5"
        > GET TASKS </v-btn>
        <div id="terminal"></div>
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
                email
              </th>
              <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                état
              </th>
              <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                état
              </th>
            </tr>
            </thead>
            <tbody id='table'>
            <tr v-for="element in tasks" :key="element">
              <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
              >
                {{element.profil.name}}
              </th>
              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{element.profil.user}}
              </td>

              <td v-if="element.profil.state == 'completed' || element.profil.published == element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-green-500 mr-2"></i> Terminé </td>
              <td v-if="element.profil.state == 'error' && element.profil.published == 0" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-red-500 mr-2"></i> Erreur </td>
              <td v-if="element.profil.state == 'error' && element.profil.published != 0" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-orange-500 mr-2"></i> Partiellement terminé </td>
              <td v-if="element.profil.state == 'initialized' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-blueGray-500 mr-2"></i> Initialiser </td>
              <td v-if="element.profil.state == 'pending' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-lightBlue-600 mr-2"></i> En Attente </td>
              <td v-if="element.profil.state == 'running' && element.profil.published != element.nbPubli" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-arrow-alt-circle-right text-green-500 mr-2"></i> En cours d'éxecution </td>

              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{element.profil.published}}/{{element.nbPubli}}
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

  data: function() {
    return {
      connection: null,
      tasks: {},
      test : [{
        "type": "textInput",
        "name": "myTextinput1",
        "required": true
      }, {
        "type": "radioInput",
        "name": "unchecked radio input",
        "checked": false
      }, {
        "type": "textInput",
        "name": "myTextinput3",
        "required": true
      }],
    }
  },
  methods: {
    sendMessage: function (message) {
      console.log("sending:" + message)
      console.log(this.connection);
      this.connection.onmessage = function (event) {
        console.log(event);
      }
      this.connection.send(message);
    },
    gettask: function () {
      this.sendMessage("gettasks")
      this.connection.onmessage = function (event) {
        this.settasks(JSON.parse(event.data).tasks)
      }.bind(this)
    },
    settasks :  function (tasks) {
      this.tasks = tasks;
    }


  },
    created: function () {
      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket("ws://192.168.0.70:2607")

      this.connection.onmessage = function (event) {
        console.log(event);
      }

      this.connection.onopen = function (event) {
        console.log(event)
        console.log("Successfully connected to the gripsperfect websocket server...")
      }


    }

}
</script>


<style scoped>

</style>