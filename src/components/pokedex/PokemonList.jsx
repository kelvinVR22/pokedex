import PokemonCard from "./PokemonCard"

const PokemonList = ({pokemons}) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_261px)] justify-center gap-4">
        {
            pokemons.map(pokemon => (<PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>))
        }
    </section>
  )
}

export default PokemonList
