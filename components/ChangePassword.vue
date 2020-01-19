<template>
  <div>
    <password :feedback="feedback"></password>
    <b-button block variant="primary" @click="save" :disabled="!isValid"
      >Save</b-button
    >
  </div>
</template>

<script>
import Password from '~/components/Password'
export default {
  data() {
    return {
      feedback: '',
      password: ''
    }
  },
  components: { Password },
  methods: {
    save() {}
  }
}
</script>
