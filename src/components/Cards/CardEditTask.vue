<template>
  <div v-if="tasks !== {} && selected !== -1"
       class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-base text-blueGray-700">
          Modifications
        </h3>
      </div>
      <br>
      <v-btn class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150"
             type="button" v-on:click="updateSelected(-1)"
             color="primary"
             elevation="5"
      > GET TASKS </v-btn>
  <form>
    <div class="relative w-full mb-3 px-4">
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
        Nom
      </label>
      <input :value="tasks[selected].profil.name" id="p-name"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="text"
      />

      <br><br>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
        Email
      </label>

      <input :value="tasks[selected].profil.user" id="p-user"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="text"
      />
      <br><br>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
        mot de passe
      </label>

      <input :value="tasks[selected].profil.password" id="p-password"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="password"
      />

      <br><br>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
        Text publication principal (vélo route)
      </label>

      <textarea onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"' :value="tasks[selected].profil.textToPubli" id="p-texttopubli"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="textarea">
      </textarea>

      <br><br>
      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
        Text publication secondaire (VTT)
      </label>

      <textarea onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"' :value="tasks[selected].profil.textToPubli2" id="p-texttopubli2"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="textarea">
      </textarea>

      <br><br>
      <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
      >
        lien image principal
      </label>
      <input  :value="tasks[selected].profil.imgExeFilePath" id="p-image"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="text"
      />

      <br><br>
      <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
      >
        lien image secondaire
      </label>
      <input  :value="tasks[selected].profil.imgExeFilePath2" id="p-image2"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              type="text"
      />

      <br><br>
      <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
      >
        Temps entre chaque publication en minute
      </label>
      <input :value="tasks[selected].timer" id="timer"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          type="number" min="0" max="1000"
      />

      <br><br>
      <label class="inline-flex items-center cursor-pointer">
        <input :checked='(String(tasks[selected].checkKeyWord).toLowerCase() == "true")'
            id="checkKeyWord"
            type="checkbox"
            class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
        />
        <span class="ml-2 text-sm font-semibold text-blueGray-600">
                   Analiseur anti-Doublon
                  </span>
      </label>
      <br><br>
      <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
      >
        Nombre de publication par jours (10 recommandé)
      </label>
      <input :value="tasks[selected].nbPubli"
             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
             type="number" min="0" max="100"
      />
    </div>
    <div class="text-center mt-6">
      <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
  name: "CardEditTask",
  props: ['tasks','selected'],
  data() {
    return {
    };
  },
  methods: {
    settasks :  function (tasks) {
      this.$emit('settasks', tasks)
    },
    updateSelected: function (selected) {
      this.$emit('updateSelected', selected)
    }
  }

}
</script>

<style scoped>

</style>