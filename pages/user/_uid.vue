<template>
  <div>
    {{ this.uid }}
  </div>
</template>

<script>
export default {

  computed: {
    uid() {
      return this.$route.params.uid
    }
  }
}
</script>

