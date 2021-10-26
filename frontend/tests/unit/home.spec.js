import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("find pokemon tag", () => {
   
    const wrapper = shallowMount(Home, {
    });
    expect(wrapper
      .find('Pokemon')
      
      );
  });
});
