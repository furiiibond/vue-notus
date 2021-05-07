<template xmlns:src="http://www.w3.org/1999/xhtml">
  <div>
    <img src:this.previewImage class="uploading-image" />
    <input type="file" accept="image/jpeg" @change=uploadImage>
  </div>
</template>

<script>
export default {
  name:'ImageUpload',
  data(){
    return{
      previewImage:null
    }
  },
  methods:{
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
        console.log(this.previewImage);
        this.$emit('enableLoading');
        this.$emit('sendMessage', 'imageSave ' + this.previewImage);
      };
    }
  }
}  // missing closure added
</script>



<style>
.uploading-image{
  display:flex;
}
</style>