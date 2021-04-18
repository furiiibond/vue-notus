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
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><i class="fas fa-circle text-orange-500 mr-2"></i> pending </td>
              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                46,53%
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
      botsNames: []
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