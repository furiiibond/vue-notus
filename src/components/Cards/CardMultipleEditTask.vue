<template>
  <div v-if="tasks !== {} && selected !== -1"
       class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
       id="CardMultipleEditTask"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-blueGray-700"> Modifications </h3>
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
          <ImageUpload :number= 1 ></ImageUpload>
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
          <ImageUpload :number= 2 />
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
                 id="nbPubli"
                 class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                 type="number" min="0" max="100"
          />
        </div>
        <div class="text-center mt-6">
          <button v-on:click="updateTasks(tasks)"
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

import ImageUpload from "@/components/ImageUpload";

export default {
  name: "CardMultipleEditTask",
  props: ['tasks','selected'],
  components: {
    ImageUpload
  },
  data() {
    return {
    };
  },
  methods: {
    settasks :  function (tasks) {
      this.$emit('settasks', tasks)
    },
    updateSelected: function () {
      this.$emit('updateSelected', -1)
    },
    removeMe: function () {
      document.getElementById("CardEditTask").setAttribute("class","removed-item relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded")
      setTimeout(this.updateSelected, 600);
    },
    updateTasks: function (tasks) {
      tasks[this.selected].profil.name = document.getElementById("p-name").value;
      tasks[this.selected].profil.user = document.getElementById("p-user").value;
      tasks[this.selected].profil.password = document.getElementById("p-password").value;
      tasks[this.selected].profil.textToPubli = document.getElementById("p-texttopubli").value;
      tasks[this.selected].profil.textToPubli2 = document.getElementById("p-texttopubli2").value;
      tasks[this.selected].profil.imgExeFilePath = document.getElementById("p-image").value;
      tasks[this.selected].profil.imgExeFilePath2 = document.getElementById("p-image2").value;
      tasks[this.selected].timer = parseInt(document.getElementById("timer").value);
      tasks[this.selected].checkKeyWord = document.getElementById("checkKeyWord").checked;
      tasks[this.selected].nbPubli = parseInt(document.getElementById("nbPubli").value);
      this.settasks(tasks);
      this.$emit('saveTasks')
    },
    fillImgUrl: function (imageNumber, link) {
      console.log("number" + imageNumber + link)
      if (imageNumber === 1) {
        document.getElementById("p-image").value = link;
      } else if (imageNumber === 2){
        document.getElementById("p-image2").value = link;
      }
    },
    fillWithTasks: function (tasksNames) {
      console.log(tasksNames);
      // tasksNames.forEach(
      //     function (name) {
      //
      //     }, this)
    }
  }

}
</script>

<style scoped>

</style>