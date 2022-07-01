import { shallowMount } from '@vue/test-utils'
import Nav from '@/components/Nav.vue'

describe('Nav', () => {
  const wrapper = shallowMount(Nav, {
    stubs: {
      'nuxt-link': true,
      'any-other-child': true,
    },
    mocks: {
      // Always returns the input
      $t: (i) => i,
      localePath: (i) => i,
    },
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('renders correctly with links', () => {
    wrapper.setProps({
      links: [
        {
          name: 'timer',
          path: '/',
        },
        {
          name: 'settings',
          path: '/settings',
        },
      ],
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
