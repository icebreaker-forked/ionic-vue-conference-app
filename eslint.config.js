import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    vue: true,
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },
)
