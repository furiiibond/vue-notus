<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardActions :tasks="tasks" @sendMessage="sendMessage($event)" @gettask="gettask($event)" @updateSelected="updateSelected($event)"/>
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart :history="history" :tasks="tasks" :selected="selected" :graphOverTime="graphOverTime" ref = "lineChart"/>
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardEditTask :tasks="tasks" :selected="selected" @settasks="settasks($event)" @updateSelected="updateSelected($event)"/>
      </div>
    </div>
  </div>
</template>
<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import CardActions from "@/components/Cards/CardActions";
import CardEditTask from "@/components/Cards/CardEditTask";
export default {
  name: "dashboard-page",
  components: {
    CardEditTask,
    CardLineChart,
    CardBarChart,
    CardSocialTraffic,
    CardActions,
  },
  data: function() {
    return {
      connection: null,
      tasks: {},
      history: {},
      graphOverTime: [],
      selected: -1,
    }
  },

  methods: {
    sendMessage: function (message) {
      console.log("sending:" + message)
      console.log(this.connection);
      this.connection.send(message);
    },
    gettask: function () {
      this.sendMessage("gettasks");
    },
    getHistory: function () {
      this.sendMessage("getHistory");
    },
    settasks :  function (tasks) {
      this.tasks = tasks;
    },
    setHistory:  function (history) {
      this.history = history;
      this. $refs.lineChart.computeResults()
    },
    updateSelected: function (selected) {
      this.selected = selected;
      this.getHistory();
    },

    interpreteur: function (event) {
      switch (JSON.parse(event.data).type) {
        case 'history':
          this.setHistory(JSON.parse(event.data).message);
          break;
        case 'toConsole':
          console.log(JSON.parse(event.data).message);
          // this.$notify({
          //   group: 'foo',
          //   title: 'Important message',
          //   text: JSON.parse(event.data).message
          // });
          break;
        case 'tasks':
          console.log(JSON.parse(event.data).message.tasks)
          this.settasks(JSON.parse(event.data).message.tasks);
          break;
        default:
          console.log(`Received from Back : ${JSON.parse(event.data).type}.`);
      }
    },
  },

  created: function () {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://192.168.0.70:2607")

    this.connection.onmessage = function (event) {
      this.interpreteur(event);
    }.bind(this);

    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the gripsperfect websocket server...")
    }
  }
};
</script>
