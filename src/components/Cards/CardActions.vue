<template>
  <div id="example-3">

    <button v-on:click="sendMessage('hello')">Send Message</button>

    <a
        class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
        href="../Maps"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown($event)"
    />
  </div>

</template>
<script>

// eslint-disable-next-line no-unused-vars
// const app = new Vue({
//   el: '#app',
//   data: {
//     apiResponse: [
//       { name: 'GitHub', url: 'https://www.github.com' },
//       { name: 'Twitter', url: 'https://www.twitter.com' },
//       { name: 'Netlify', url: 'https://www.netlify.com' }
//     ]
//   }
// })

export default {
  data: function() {
    return {
      connection: null
    }
  },
  methods: {
    sendMessage: function(message) {
      console.log("Hello")
      console.log(this.connection);
      this.connection.send(message);
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://127.0.0.1:4444")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

}
}

</script>


<style scoped>

</style>