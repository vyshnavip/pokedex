import { mount ,shallowMount} from "@vue/test-utils";
import List from "@/components/PokemonListView.vue";

describe("PokemonSearch.vue", () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
window.IntersectionObserver = jest.fn(() => ({
   observe,
   unobserve,
}));
    //expect(IntersectionObserver.observe).toHaveBeenCalled();
  });
  
  it("find pokemon tag", () => {
   
    const wrapper = mount(List, {
      props:{
        pokemon:{
          classification: "Seed Pokémon",
          height: {minimum: "0.61m", maximum: "0.79m"},
          id: "001",
          image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          isFavorite: true,
          maxCP: 951,
          maxHP: 1071,
          name: "Bulbasaur",
          sound: "http://localhost:4000/sounds/1",
          types: ["Grass", "Poison"],
          weight: {minimum: "6.04kg", maximum: "7.76kg"},
        },
        limit:10,
        isGridView:true
      
      }
    });
console.log(wrapper);
    expect(wrapper.find('PokemonCard'));
  });

 
});
