<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardActions :tasks="tasks" @sendMessage="sendMessage($event)" @gettask="gettask($event)"/>
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardEditTask />
      </div>
    </div>
    <div class="chat-popup" id="myForm">
      Chat
    </div>
  </div>
</template>
<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import CardActions from "@/components/Cards/CardActions";
import CardEditTask from "@/components/Cards/CardEditTask";
export default {
  name: "dashboard-page",
  components: {
    CardEditTask,
    CardLineChart,
    CardBarChart,
    CardPageVisits,
    CardSocialTraffic,
    CardActions,
  },
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
};
</script>
