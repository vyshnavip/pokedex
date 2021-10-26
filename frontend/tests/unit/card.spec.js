import { mount ,shallowMount} from "@vue/test-utils";
import Card from "@/components/PokemonCardInList.vue";

describe("PokemonCardInList.vue", () => {
  
  
  it("load Pokemon card", () => {
   
    const wrapper = mount(Card,{
      props:{
        pokemon:{
          'id':'001',
          'name': "babulsaur",
          'isFavorite': true
        },
        isFavoritePoke: true
        
      }
    });
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.classes('card')).toBe(true);
    //expect(wrapper.classes()).toContain('card')
    //expect(wrapper.props().name).toBe('Bulbasaur');
  });

 
});
