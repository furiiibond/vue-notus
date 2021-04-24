<template>
  <form v-if="tasks !== {} && selected !== -1" >

    <div v-for="(element, name) in tasks[selected]" :key="element" class="relative w-full mb-3">
      <label
          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
      >
        {{name}}
      </label>
      <input :value="element"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Email"
          type="text"
      />
    </div>
    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input
            id="customCheckLogin"
            type="checkbox"
            class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
        />
        <span class="ml-2 text-sm font-semibold text-blueGray-600">
                  </span>
      </label>
    </div>

    <div class="text-center mt-6">
      <button
          class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="button"
      >
        Sign In
      </button>
    </div>
  </form>
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
    }
  }

}
</script>

<style scoped>

</style>