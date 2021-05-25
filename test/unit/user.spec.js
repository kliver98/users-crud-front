import User from "@/components/User.vue";
import {mount } from "@vue/test-utils";

describe ("User.vue", () =>{
    it('renders a div', () => {
        const wrapper = mount(User)
        expect(wrapper.contains('div')).toBe(true)
      })
})