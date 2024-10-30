import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('helloWorld', () => {
  it('displays message', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello world',
      },
    })
    expect(wrapper.text()).contain('Hello world')
  })
})
