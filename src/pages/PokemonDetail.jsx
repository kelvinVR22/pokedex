import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { bgByType, colorByType } from "../constants/pokemon"

const PokemonDetail = () => {
    const {pokemonId} = useParams()
    const [pokemon, setPokemon]  = useState(null)
    const MAX_STAT_VALUE = 150
    const bgColor = bgByType[pokemon?.types[0].type.name]
    

    const getPercentStat = (statValue)=>{
        const percentStat = (statValue * 100 / MAX_STAT_VALUE).toFixed(1)
        return `${percentStat}%`
    }

    useEffect(()=>{
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(({data})=> setPokemon(data))
            .catch((err)=> console.log(err))
    },[])

    return (
    <main className="text-center capitalize">
        <HeaderPokeball/>

        <article className="max-w-[1100px] mx-auto px-4 mt-[150px]">
            <div className={`h-[150px] w-full ${bgColor} relative`}>
                <div className="absolute h-[250px] w-[250px] left-1/2 -translate-x-1/2 top-[-80%]">
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
            </div>

            <h3 className="mt-10 text-4xl font-medium font-[Roboto]">#{pokemon?.id}</h3>
            <h2 className="mt-4 text-4xl font-semibold font-[Roboto]">{pokemon?.name}</h2>
            
            <section className="grid grid-cols-[repeat(auto-fit,_80px)] justify-center gap-4 mt-2">
                <div>
                    <h3 className="font-[Roboto] text-sm font-normal text-[#0F0F2D]">Weight</h3>
                    <h3 className="font-[Roboto] text-xl font-semibold text-[#0F0F2D]">{pokemon?.weight}</h3>
                </div>
                <div>
                    <h3 className="font-[Roboto] text-sm font-normal text-[#0F0F2D]">Height</h3>
                    <h3 className="font-[Roboto] text-xl font-semibold text-[#0F0F2D]">{pokemon?.height}</h3>
                </div>
            </section>

            <section className="mt-2 grid grid-cols-2 ">
                <div>
                    <h3 className="font-[Roboto] text-2xl font-medium text-[#302F2F]">Types</h3>
                    <div className='grid grid-cols-[repeat(auto-fit,_150px)] justify-center gap-4 mt-2 '>
                        {
                            pokemon?.types.map(type => <div className='h-[40px] flex justify-center items-center rounded-sm' key={type.type.url} style={{background: colorByType[type.type.name]}}><span className="font-[Roboto] text-xl font-medium text-[#FFF]">{type.type.name}</span></div>)
                        }
                    </div>
                </div>
                <div>
                    <h3 className="font-[Roboto] text-2xl font-medium text-[#302F2F]">Abilities</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,_150px)] justify-center gap-4 mt-2">
                        {
                            pokemon?.abilities.map(ability => <div className='h-[40px] border rounded-sm border-[#D3D3D3] flex justify-center items-center ' key={ability.ability.url} ><span className="font-[Roboto] text-xl font-medium text-[#302F2F]">{ability.ability.name}</span></div>)
                        }
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-start font-[Roboto] text-3xl font-semibold text-[#302F2F]">Stats</h3>
                    <div className="h-[2px] w-[84%] border-t-2 borer-[#D3D3D3]"></div>
                    <div className="h-[89px] w-[89px] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="103" height="103" viewBox="0 0 103 103" fill="none">
                            <circle cx="51.4997" cy="51.5" r="43" transform="rotate(-9.48737 51.4997 51.5)" stroke="#D3D3D3" strokeWidth="3"/>
                            <path d="M7.85547 60.3144L40.4041 54.875" stroke="#D3D3D3" strokeWidth="3"/>
                            <path d="M63.0898 51.084L95.6385 45.6446" stroke="#D3D3D3" strokeWidth="3"/>
                            <circle cx="52.2392" cy="52.8971" r="12.5" transform="rotate(-9.48737 52.2392 52.8971)" stroke="#D3D3D3" strokeWidth="3"/>
                            <circle cx="52.2405" cy="52.8971" r="6.5" transform="rotate(-9.48737 52.2405 52.8971)" stroke="#D3D3D3" strokeWidth="3"/>
                        </svg>
                    </div>
                </div> 

                <ul className="grid gap-4 mt-6">
                    {
                        pokemon?.stats.map(stat => <li key={stat.stat.name} className="capitalize">
                            <div className="flex justify-between items-center">
                                <h5 className="text-[#302F2F] font-[Roboto] text-xl font-semibold">{stat.stat.name}</h5>
                                <span className="text-[#302F2F] font-[Roboto] text-xl font-semibold">{stat.base_stat}/{MAX_STAT_VALUE}</span>
                            </div>
                            <div className="bg-slate-200 h-10 rounded-md">
                                <div className="[background:_linear-gradient(90deg,_#FCD676_-2.25%,_#E6901E_133.18%)] h-full w" style={{width: getPercentStat(stat.base_stat)}}></div>
                            </div>
                        </li>)
                    }
                </ul>
            </section>

            <section className="mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-start font-[Roboto] text-3xl font-semibold text-[#302F2F]">Movements</h3>
                    <div className="h-[2px] w-[84%] border-t-2 borer-[#D3D3D3]"></div>
                    <div className="h-[89px] w-[89px] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="103" height="103" viewBox="0 0 103 103" fill="none">
                            <circle cx="51.4997" cy="51.5" r="43" transform="rotate(-9.48737 51.4997 51.5)" stroke="#D3D3D3" strokeWidth="3"/>
                            <path d="M7.85547 60.3144L40.4041 54.875" stroke="#D3D3D3" strokeWidth="3"/>
                            <path d="M63.0898 51.084L95.6385 45.6446" stroke="#D3D3D3" strokeWidth="3"/>
                            <circle cx="52.2392" cy="52.8971" r="12.5" transform="rotate(-9.48737 52.2392 52.8971)" stroke="#D3D3D3" strokeWidth="3"/>
                            <circle cx="52.2405" cy="52.8971" r="6.5" transform="rotate(-9.48737 52.2405 52.8971)" stroke="#D3D3D3" strokeWidth="3"/>
                        </svg>
                    </div>
                </div> 

                <ul className="flex flex-wrap justify-normal gap-4 mt-6">
                    {
                        pokemon?.moves.map(move => <li key={move.move.name} className="capitalize">
                            <div className='h-[60px] w-auto px-8 py-4 flex justify-center items-center rounded-[50px] bg-[#E5E5E5]'><span className="font-[Roboto] text-2xl font-normal text-[#302F2F]">{move.move.name}</span></div>
                        </li>)
                    }
                </ul>
            </section>
        </article>
    </main>
    )
}

export default PokemonDetail
