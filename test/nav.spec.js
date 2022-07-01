import { mount } from '@vue/test-utils'

describe('Nav', () => {
  it('renders correctly', () => {
    const wrapper = mount(Nav)
    expect(wrapper.element).toMatchSnapshot()
  })
})
