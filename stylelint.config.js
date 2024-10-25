import { icebreaker } from '@icebreakers/stylelint-config'

export default icebreaker({
  rules: {
    'selector-type-no-unknown': [true, {
      ignoreTypes: ['/^ion-/'],
    }],
  },
})
