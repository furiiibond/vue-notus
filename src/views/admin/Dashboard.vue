<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardActions :tasks="tasks" @sendMessage="sendMessage($event)" @gettask="gettask($event)" @updateSelected="updateSelected($event)" @startTasksByName="startTasksByName($event)"/>
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <CardEditSettings :settings="settings" @saveSettings="this.saveSettings()" />
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
        <CardEditTask ref="cartEdit" @saveTasks="this.saveTasks()" :tasks="tasks" :selected="selected" @sendMessage="sendMessage($event)" @enableLoading="enableLoading($event)" @settasks="settasks($event)"  @deleteTask="deleteTask($event)" @updateSelected="updateSelected($event)"/>
        <Toast ref = "toast"/>
      </div>
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardMultipleEditTask ref="CardMultipleEditTask" @saveTasks="this.saveTasks()" :tasks="tasks" :selected="selected" @sendMessage="sendMessage($event)" @enableLoading="enableLoading($event)" @settasks="settasks($event)" @deleteTask="deleteTask($event)" @updateSelected="updateSelected($event)"/>
        <Toast ref = "toast"/>
      </div>
    </div>
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage"></loading>
  </div>
</template>
<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
import CardActions from "@/components/Cards/CardActions";
import CardEditTask from "@/components/Cards/CardEditTask";
import CardEditSettings from "@/components/Cards/CardEditSettings";
import Toast from "@/components/Toast";
import {createToast} from "mosha-vue-toastify";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import CardMultipleEditTask from "@/components/Cards/CardMultipleEditTask";
export default {
  name: "dashboard-page",
  components: {
    CardEditTask,
    CardLineChart,
    CardSocialTraffic,
    CardActions,
    Toast,
    Loading,
    CardEditSettings,
    CardMultipleEditTask
  },
  data: function() {
    return {
      connection: null,
      tasks: {},
      history: {},
      settings: {},
      tasksFull: {},
      graphOverTime: [],
      selected: -1,
      isLoading: false,
      fullPage: true,
      currentImageEditNumber: -1
    }
  },

  methods: {
    sendMessage: function (message) {
      console.log("sending:" + message)
      console.log(this.connection);
      this.connection.send(message);
    },
    saveTasks: function () {
      this.tasksFull.tasks = this.tasks;
      this.sendMessage('saveTasks '+ JSON.stringify(this.tasksFull));
    },
    deleteTask: function (task) {
      this.sendMessage('deleteTask '+ JSON.stringify(task))
    },
    startTasksByName: function (tasksNames) {
      console.log(tasksNames)
      let tasksNameString = tasksNames.toString().replaceAll(',', ' ');
      this.sendMessage('startTasksByName '+ tasksNameString);
    },
    saveSettings: function () {
      this.sendMessage('saveSettings '+ JSON.stringify(this.settings));
    },
    gettask: function () {
      this.sendMessage("gettasks");
    },
    getHistory: function () {
      this.sendMessage("getHistory");
    },
    getSettings: function () {
      this.sendMessage("getSettings");
    },
    settasks :  function (tasks) {
      this.tasks = tasks;
    },
    setHistory:  function (history) {
      this.history = history;
      this.$refs.lineChart.computeResults();
    },
    setSettings: function (settings) {
      this.settings = settings;
      this.$refs.settings.computeResults();
    },
    updateSelected: function (selected) {
      this.selected = selected;
      this.getHistory();
    },
    enableLoading(number) {
      this.currentImageEditNumber = number;
      this.isLoading = true;
    },
    disableLoading() {
      this.isLoading = false;
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    askForceStart(tasksNames) {
      if ( confirm( "Des Robot sont en cours d'execution, forcer le lancement?" ) ) {
        this.sendMessage("startTasksByName "+tasksNames+" @force")
      }
    },

    interpreteur: function (event) {
      switch (JSON.parse(event.data).type) {
        case 'history':
          this.setHistory(JSON.parse(event.data).message);
          break;
        case 'settings':
          this.setSettings(JSON.parse(event.data).message);
          break;
        case 'notify':
          createToast(JSON.parse(event.data).message)
          break;
        case 'tasks':
          console.log(JSON.parse(event.data).message.tasks)
          this.settasks(JSON.parse(event.data).message.tasks);
          this.tasksFull = JSON.parse(event.data).message;
          break;
        case 'success':
          createToast(JSON.parse(event.data).message,{type: 'success'});
          break;
        case 'warning':
          createToast(JSON.parse(event.data).message,{type: 'warning'});
          break;
        case 'error':
          createToast(JSON.parse(event.data).message,{type: 'danger'});
          break;
        case 'imageSaved':
          this.disableLoading();
          this.$refs.cartEdit.fillImgUrl(this.currentImageEditNumber, JSON.parse(event.data).message);
          createToast(JSON.parse(event.data).message,{type: 'success'});
          break;
        case 'forceTasksStart':
          this.askForceStart(JSON.parse(event.data).message);
          break;
        case 'countries':
          this.$refs.cartEdit.setCountries(JSON.parse(event.data).message.split('|'));
          break;
        default:
          console.log(`Received from Back : ${JSON.parse(event.data).type}.`);
          createToast("ERROR",{type: 'danger'})
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
      createToast("Bienvenue");
      this.gettask();
      this.getSettings();
    }.bind(this);
  }
};
</script>
