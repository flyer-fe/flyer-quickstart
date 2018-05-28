<template>
  <div style="height:300px;text-align:center;line-height:100px;font-size:30px;">
    <!-- <p>对不起，您无权查看。</p> -->
    <img :src="url" alt="">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        url: require('assets/no.jpg')
      }
    }
  }
</script>
