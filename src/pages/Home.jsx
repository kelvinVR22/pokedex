import { useDispatch } from "react-redux"
import { setTrainerName } from "../store/slices/TrainerName.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(setTrainerName(event.target.trainerName.value))
        navigate('/pokedex')
    }

    return (
        <main className="w-full h-screen grid grid-rows-[1fr_auto]">
            <section className="flex justify-center items-center max-w-[1100px] mx-auto px-4">
                <div className="grid gap-6">
                    <div>
                        <img src="/images/logo.png" alt="Pokemon logo" />
                    </div>
                    <div className="text-center flex flex-col gap-2">
                        <h3 className="text-[#FE1936] text-5xl font-bold">¡Hi trainer!</h3>
                        <p className="text-[#302F2F] text-xl font-medium">Place your name and we can start</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex justify-center items-center">
                        <input className='bg-[#FFF] [box-shadow:_0px_3px_6px_0px_rgba(0,0,0,0.15)] h-[40px] placeholder:text-[#D3D3D3] placeholder:text-xl placeholder:font-medium placeholder:px-2 text-xl font-medium px-2 min-w-[200px] w-[45%] rounded-l-md' name='trainerName' type="text" placeholder="Your name.." autoComplete="off"/>
                        <button className="bg-red-500 text-white h-[40px] min-w-[100px] w-[22.5%] text-l font-medium rounded-r-md border-[#D93F3F] border-2 hover:bg-red-700">Click to Start!</button>
                    </form>
                </div>
            </section>

            <footer className="w-full ">
                <div className="bg-[#DD1A1A] h-[100px] w-full"></div>
                <div className="bg-[#0C0C0C] h-[50px] w-full relative">
                    <div className="w-[117px] h-[117px] absolute left-1/2 top-[-120%] -translate-x-1/2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="117" height="117" viewBox="0 0 117 117" fill="none">
                            <circle cx="58.5" cy="58.5" r="52.5" fill="white" stroke="black" strokeWidth="12"/>
                            <circle cx="58.5" cy="58.5" r="25.5" fill="#212121" stroke="black" strokeWidth="12"/>
                        </svg>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default Home
