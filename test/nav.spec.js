import { mount } from '@vue/test-utils'
import Nav from '@/components/Nav.vue'

describe('Nav', () => {
  it('renders correctly', () => {
    const wrapper = mount(Nav)
    expect(wrapper.element).toMatchSnapshot()
  })
})
