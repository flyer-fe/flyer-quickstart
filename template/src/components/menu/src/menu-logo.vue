<template>
  <li class="x-menu-logo"
    @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'x-menu-logo',
    componentName: 'menu-logo',
    props: {
      index: {
        type: String,
        required: true
      }
    },
    methods: {
      handleClick () {
        window.location.href = this.index
      }
    }
  }
</script>
