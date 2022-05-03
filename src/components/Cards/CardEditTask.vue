<template>
  <div v-if="tasks !== {} && selected !== -1"
       class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
       id="CardEditTask"
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
            Groupe (utilise la même liste de lien temporaire)
          </label>
          <input :value="tasks[selected].filePath" id="p-group"
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
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
            Nombre de publication par jours (10 recommandé)
          </label>
          <input :value="tasks[selected].nbPubli"
                 id="nbPubli"
                 class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                 type="number" min="0" max="100"
          />
          <br><br>
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
            Pays Liés
          </label>
          <table>
            <tbody id="countriesList">
              <tr v-for="(country) in tasks[selected].profil.countries" :key="country">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {{country}}
                </th>
              </tr>
            </tbody>
          </table>
          <table>
          <tr>
            <th>
              <div class="autocomplete">
                <input v-on:focus="askForCountries()" v-on:keydown="setAutoCompletion('newCountry')"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                       id="newCountry" type="text" name="myCountry" placeholder="Ajouter une ville">
              </div>
            </th>
            <th>
              <p v-on:click="addCountryFromInput()" class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150">
                Ajouter
              </p>
            </th>
          </tr>
          </table>
        </div>
        <div class="text-center mt-6">
          <button v-on:click="updateTasks(tasks)"
                  class="bg-blueGray-800 on-over-green text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button">
            Save
          </button>
          <button v-on:click="deleteCurrentTask(tasks)"
                  class="bg-blueGray-800 on-over-red text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button">
            Supprimer la tâche
          </button>
        </div>
      </form>
    </div>
  </div>

</template>
<script>

import ImageUpload from "@/components/ImageUpload";
import {createToast} from "mosha-vue-toastify";

export default {
  /* eslint-disable */
  name: "CardEditTask",
  props: ['tasks','selected'],
  components: {
    ImageUpload
  },
  data() {
    return {
      countries: {}
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
    askForCountries: function () {
        this.$emit('sendMessage', 'getCountries');
    },
    setAutoCompletion: function (id) {
      autocomplete(document.getElementById(id), this.countries);
    },
    addCountryFromInput: function () {
      let newCountryName = document.getElementById('newCountry').value;
      console.log(this.countries);
      if (this.countries.includes(newCountryName)) {   //todo
        let p =document.createElement("p");
        p.className = 'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left';
        p.textContent = newCountryName
        document.getElementById('countriesList').append(p);
      } else {
        createToast("Pays inconnu",{type: 'danger'})
      }
    },
    updateTasks: function (tasks) {
      tasks[this.selected].profil.name = document.getElementById("p-name").value;
      tasks[this.selected].filePath = document.getElementById("p-group").value;
      tasks[this.selected].profil.user = document.getElementById("p-user").value;
      tasks[this.selected].profil.password = document.getElementById("p-password").value;
      tasks[this.selected].profil.textToPubli = document.getElementById("p-texttopubli").value;
      tasks[this.selected].profil.textToPubli2 = document.getElementById("p-texttopubli2").value;
      tasks[this.selected].profil.imgExeFilePath = document.getElementById("p-image").value;
      tasks[this.selected].profil.imgExeFilePath2 = document.getElementById("p-image2").value;
      tasks[this.selected].timer = parseInt(document.getElementById("timer").value);
      tasks[this.selected].checkKeyWord = document.getElementById("checkKeyWord").checked;
      tasks[this.selected].nbPubli = parseInt(document.getElementById("nbPubli").value);
      let elem = document.getElementById("countriesList");
      let ths = elem.getElementsByTagName("p");
      console.log(ths);
      for (let i = 0; i < ths.length; i++) {
        tasks[this.selected].profil.countries.push(ths[i].textContent);
      }
      //remove all p tag from dom
      for (let i = 0; i < ths.length; i++) {
        elem.removeChild(ths[i]);
      }
      console.log(tasks[this.selected].profil.countries);
      this.settasks(tasks);
      this.$emit('saveTasks')
    },
    deleteCurrentTask: function (tasks) {
      if ( confirm( "Etes-vous sûr de supprimer cette tâche : " + tasks[this.selected].profil.name) ) {
        this.$emit('deleteTask', tasks[this.selected])
      }
    },
    fillImgUrl: function (imageNumber, link) {
      console.log("number" + imageNumber + link)
      if (imageNumber === 1) {
        document.getElementById("p-image").value = link;
      } else if (imageNumber === 2){
        document.getElementById("p-image2").value = link;
      }
    },
    setCountries: function (countries) {
      this.countries = countries
    }
  }

}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function() {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
//autocomplete(document.getElementById("myInput"), this.countries);
/* eslint-disable */
</script>

<style scoped>

</style>