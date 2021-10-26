import { mount ,shallowMount} from "@vue/test-utils";
import Search from "@/components/PokemonSearch.vue";
import Types from "@/components/PokemonTypes.vue";
describe("PokemonSearch.vue", () => {
  it("find pokemon tag", () => {
   
    const wrapper = mount(Search, {
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("find pokemon tag", () => {
   
    const wrapper = shallowMount(Search, {
    });
    const inputSearch = wrapper.find('input');
    expect(inputSearch.isEmpty());
  });

  it("find pokemon tag", () => {
   
    const wrapper = mount(Types, {
    });
    let inputSearch = wrapper.find('select');
    //inputSearch.simulate('change',{
      //target:{value: 'Grass'}
   // });
   // inputSearch = wrapper.find('select');
   // expect(inputSearch.props.value).toEqual('');
  });
});
