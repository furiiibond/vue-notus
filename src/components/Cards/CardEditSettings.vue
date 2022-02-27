<template>
  <div v-if="settings !== {} && display "
       class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
       id="CardEditTask"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-blueGray-700"> Paramètres </h3>
          </div>
          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <button v-on:click="removeMe()" class="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              x </button>
          </div>
        </div>
      </div>
      <br>
      <form>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.executionParallelTask).toLowerCase() == "true")'
                     id="executionParallelTask"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Execution parallel des tâches
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.autoAddLink).toLowerCase() == "true")'
                     id="autoAddLink"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Ajout de lien automatique
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.enableBackupDB).toLowerCase() == "true")'
                     id="enableBackupDB"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Sauvegarde de la base de données
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.enableTaskScheduler).toLowerCase() == "true")'
                     id="enableTaskScheduler"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Planificateur de tâches
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.chromeKillerEnable).toLowerCase() == "true")'
                     id="chromeKillerEnable"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Tueur de chrome
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.enableProxy).toLowerCase() == "true")'
                     id="enableProxy"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Proxy TOR
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.machineGunMode).toLowerCase() == "true")'
                     id="machineGunMode"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Machine Gun Mode
                  </span>
          </label>
        </div>
        <div class="relative w-full mb-3 px-4">
          <label class="inline-flex items-center cursor-pointer">
            <label class="switch">
              <input :checked='(String(settings.pushbullet).toLowerCase() == "true")'
                     id="pushbullet"
                     type="checkbox"
                     class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="slider round"></span>
            </label>
            <br><br>
            <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Notifications Pushbullet
                  </span>
          </label>
        </div>
        <div class="text-center mt-6">
          <button v-on:click="updateSettings(settings)"
                  class="bg-blueGray-800 on-over-green text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>

</template>
<script>

export default {
  name: "CardEditSettings",
  props: ['settings'],
  data() {
    return {
      display: true,
    };
  },
  methods: {
    setSettings:  function (settings) {
      this.$emit('setSettings', settings);
    },
    removeMe: function () {
      document.getElementById("CardEditTask").setAttribute("class","removed-item relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded")
      setTimeout(this.hideThis, 600);
    },
    hideThis: function () {
      this.display = false;
    },
    updateSettings: function (settings) {
      settings.autoAddLink = document.getElementById("autoAddLink").checked;
      settings.executionParallelTask = document.getElementById("executionParallelTask").checked;
      settings.enableBackupDB = document.getElementById("enableBackupDB").checked;
      settings.enableTaskScheduler = document.getElementById("enableTaskScheduler").checked;
      settings.chromeKillerEnable = document.getElementById("chromeKillerEnable").checked;
      settings.enableProxy = document.getElementById("enableProxy").checked;
      settings.machineGunMode = document.getElementById("machineGunMode").checked;
      settings.pushbullet = document.getElementById("pushbullet").checked;
      this.setSettings(settings);
      this.$emit('saveSettings')
    },
  }

}
</script>

<style scoped>

</style>