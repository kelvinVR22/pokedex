/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from 'axios'
import PokemonList from "../components/pokedex/PokemonList"
import HeaderPokeball from "../components/layouts/HeaderPokeball"
import { paginationData } from "../utils/pagination"

const Pokedex = () => {
    const trainerName = useSelector((store)=>store.trainerName)
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [currentType, setCurrentType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    
    const [types, setTypes] = useState([])
    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName) )

    const {itemsInCurrentPage, pagesInCurrentBlock, lastPage, totalBlock, actualBlock } = paginationData(pokemonsByName, currentPage)


    useEffect(()=>{
        if(currentType === ""){
            axios
                .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
                .then(({data})=> setPokemons(data.results))
                .catch((err)=> console.log(err))
        }
    },[currentType])
    
    useEffect(()=>{
        axios
            .get("https://pokeapi.co/api/v2/type")
            .then(({data})=> setTypes(data.results))
            .catch((err)=> console.log(err))
    },[])
    
    useEffect(()=>{
        if(currentType !== ""){
            axios
                .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
                .then(({data})=> setPokemons(data.pokemon.map(pokemon => pokemon.pokemon)))
                .catch((err)=> console.log(err))
        }
    },[currentType])
    
    useEffect(()=>{
        setCurrentPage(1)
    },[currentType])

    const handleSubmit = (event)=>{
        event.preventDefault()
        setPokemonName(event.target.pokemonName.value.toLowerCase().trim())
    }

    const handleChangeType = (event)=>{
        setCurrentType(event.target.value)
    }
    
    const handlePreviusPage = ()=>{
        const newCurrentPage = currentPage - 1
        if (newCurrentPage >= 1){
            setCurrentPage(newCurrentPage)
        }
    }

    const handleNextPage = ()=>{
        const newCurrentPage = currentPage + 1
        if (newCurrentPage <= lastPage){
            setCurrentPage(newCurrentPage)
        }
    }
 
    return (
        <main>
            <HeaderPokeball/>

            <section className="grid my-10 gap-4 max-w-[1150px] mx-auto px-4">
                <p className="text-[#333] font-normal text-xl">
                    <span className="text-[#FE1936] font-bold text-xl">Welcome {trainerName}, </span>
                    Here you can see all the information about all the types of Pokemos in the world.
                </p>
                
                <form className="flex justify-between flex-wrap gap-4" onSubmit={handleSubmit}>
                    <div>
                        <input className='bg-[#FFF] [box-shadow:_0px_3px_6px_0px_rgba(0,0,0,0.15)] h-[40px] placeholder:text-[#D3D3D3] placeholder:text-xl placeholder:font-medium placeholder:px-2 text-xl font-medium px-2 min-w-[200px] rounded-l-md' name="pokemonName" type="text" placeholder="Looking for a pokemon" autoComplete="off"/>
                        <button className="bg-red-500 text-white h-[40px] min-w-[100px] text-l font-medium rounded-r-md border-[#D93F3F] border-2 hover:bg-red-700">Search</button>
                    </div>
                    <div className="relative w-[300px] after:content-[''] after:absolute after:right-[8px] after:top-1/2 after:mt-[-4px] after:border-t-[8px] after:border-t-[#ccc] after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:pointer-events-none">
                        <select onChange={handleChangeType} className="capitalize h-[40px] bg-[#FFF] w-full outline-none text-lg font-normal text-[#0F0F2D] px-2 rounded-md appearance-none [box-shadow:_0px_3px_6px_0px_rgba(0,0,0,0.15)] border-none" >
                            <option value="" className="hover:bg-[#ED8F8F] hover:text-[#FFF]">All pokemons</option>
                            {types?.map(type => <option className="hover:bg-[#ED8F8F] hover:text-[#FFF]" value={type.name} key={type.url}>{type.name}</option>)}
                        </select>
                      
                    </div>
                </form>
  
                <PokemonList pokemons={itemsInCurrentPage}/> 
              
                <ul className="flex justify-center gap-2 flex-wrap mt-4">
                    {
                        currentPage!==1 && 
                        <li>
                            <button className='h-[45px] w-[45px] p-2 text-white font-bold rounded-md hover:bg-red-400 bg-[#DD1A1A]' onClick={handlePreviusPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 17L8 12L13 7" stroke="#FBFBFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </li>
                    }
                    {
                        actualBlock!==1 && 
                        <>
                            <li>
                                <button className='h-[45px] w-[45px] p-2 text-black font-bold rounded-md hover:bg-red-400 bg-white' onClick={()=> setCurrentPage(1)}>1</button>
                                <span >...</span>
                            </li>
                        </>
                    }
                    
                    {
                        pagesInCurrentBlock.map(page => (
                            <li key={page}>
                                <button onClick={()=> setCurrentPage(page)} className={`h-[45px] w-[45px] p-2 font-bold rounded-md hover:bg-red-400 ${currentPage === page ? 'bg-[#DD1A1A] text-white' : 'bg-white text-black' }`}>{page}</button>
                            </li>
                        ))
                    }
                    {
                        actualBlock!==totalBlock && 
                        <>
                            <li className="flex justify-center items-center">
                                <span>...</span>
                            </li>
                            <li>
                                <button className='h-[45px] w-[45px] p-2 text-black font-bold rounded-md hover:bg-red-400 bg-white' onClick={()=> setCurrentPage(lastPage)}>{lastPage}</button>
                            </li>
                        </>
                    
                    }
                    
                    {
                        currentPage!==lastPage &&
                        <li>
                            <button className='h-[45px] w-[45px] p-2 text-white font-bold rounded-md hover:bg-red-400 bg-[#DD1A1A] text-center' onClick={handleNextPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 17L18 12L13 7" stroke="#FBFBFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </li>
                    }
                </ul>
            </section> 
           
        </main>
    )
}

export default Pokedex
