<template>
  <div class="imagePrevewArea">
    <img :src="this.previewImage" class="uploading-image" />
    <label for="file" class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all duration-150">Choisir une image</label>
    <input id="file" type="file" class="input-file" accept="image/*" @change=uploadImage>
  </div>
</template>

<script>
export default {
  name:'ImageUpload',
  props: ['number'],
  data(){
    return{
      previewImage: null,
      isWaitingForReturn: false
    }
  },
  methods:{
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
        this.$parent.$emit('enableLoading', this.number);
        this.isWaitingForReturn = true;
        this.$parent.$emit('sendMessage', 'imageSave ' + this.previewImage);
      };
    }
  }
}  // missing closure added
</script>