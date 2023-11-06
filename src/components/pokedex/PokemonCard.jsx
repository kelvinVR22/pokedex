import { useEffect, useState } from "react"
import axios from 'axios'
import {Link} from 'react-router-dom'
import { bgByType, colorByType } from "../../constants/pokemon"

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState(null)
    const types =  pokemon?.types.map((type) => type.type.name.replace(type.type.name[0],type.type.name[0].toUpperCase())).join(' / ')
    const bgColor = bgByType[pokemon?.types[0].type.name]
    const borderColor = 'border-[' + colorByType[pokemon?.types[0].type.name] +']'
    
    useEffect(()=>{
        axios
            .get(pokemonUrl)
            .then(({data})=> setPokemon(data))
            .catch((err)=> console.log(err))
    },[])

    

    return (
        <Link to={`/pokedex/${pokemon?.id}`}>
            <article className={`rounded-lg h-[383px] w-full ${borderColor} border-8 relative`}>
                <div className="absolute w-[102%] h-2 top-0 left-[-2px]" style={{background: colorByType[pokemon?.types[0].type.name]}}></div>  
                <header className={`w-full h-[128px] relative rounded-t-lg ${bgColor}`}>
                    <div className="w-[162px] h-[149px] absolute left-1/2 -translate-x-1/2 top-[10%] z-20">
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    </div>
                </header>
                <div className="mt-[45px] flex justify-center items-center flex-col">
                    <h3 className="text-2xl font-semibold capitalize px-1">{pokemon?.name.slice(0,17)}</h3>
                    <span className="text-base font-medium">{types}</span>
                    <h5 className="text-xs font-light text-[#9F9F9F]">Type</h5>
                    <ul className="w-full h-full border-t-2 border-t-[#E5E5E5] grid grid-cols-2 p-2 text-center mt-2 gap-1">
                        {
                            pokemon?.stats.slice(0,4).map(stat => (
                                <li key={stat.stat.name}>
                                    <h6 className="text-xs font-light font-[Inter] text-[#9F9F9F]">{stat.stat.name.toUpperCase()}</h6>
                                    <span className="text-base font-semibold font-[Inter]">{stat.base_stat}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </article>
        </Link>
    )
}

export default PokemonCard
