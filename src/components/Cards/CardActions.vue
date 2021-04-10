<template>
  <div id="example-3">
    <button v-on:click="say('hello')">Dire salut</button>

    <button v-on:click="rss('hello')"> RSS</button>

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
  methods: {
    say: function (text) {
      alert(text);
    },
    rss: function (url){
      $.get(url, function (data) {
        $(data).find("entry").each(function () {
          var el = $(this);
          console.log("------------------------");
          console.log("title : " + el.find("title").text());
          console.log("author : " + el.find("author").text());
          console.log("description: " + el.find("description").text());
        });
      });
    }

  },




  name: "CardActions",
  data () {
    return {
      title: 'Agidom',
      items: [
        {
          image: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
          name: 'Quentin'
        }
      ]
    }
}
}

</script>


<style scoped>

</style>