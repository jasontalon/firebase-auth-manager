<template>
  <user @on-save="onSave"></user>
</template>

<script>
import User from '~/components/User'
export default {
  head() {
    return {
      title: 'Create User'
    }
  },
  components: { User },
  methods: {
    onSave(uid) {
      console.log(uid)
    }
  }
}
</script>
