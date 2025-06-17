import InputField from "../components/InputField"
import { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";
// import { Session} from "../context/SessionContext";
import { useNavigate } from "react-router-dom";


const login = () => {

    const navigate = useNavigate();
    const {session , setSession } = useSession()
   

    useEffect(() => {
      // Read token from cookies
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
      
      if (token) {
        navigate("/login"); // Redirect if token exists
      }
    }, [session]);




    const [islogin, setIslogin] = useState(1);

    const [user, setUser] = useState({
        'username': "Akash205Sharma",
        'name': '',
        'email': '',
        'password': '12345678',
    })


    async function handleSubmit() {
        let url = `${import.meta.env.VITE_API_URL}/auth/${islogin ? "login" : "signup"}`

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: "include",
                body: JSON.stringify(user),
            })

            const data = await res.json();
            console.log(data);
        
            if(data.status="logged"){
                setSession(data);
                navigate("/dashboard");
            }

            
            setUser({ 'username': "", 'name': '', 'email': "", 'password': '' });

        } catch (error) {
            console.error(error);
        }
    }



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))

    }

    return (
        <div className=" flex text-white">
            <div className="text-white text-[3vh] fixed left-0 m-[1vh] font-serif  ">TradeVirtuo</div>

            <div className="leftHalf bg-[#0a0a0a] h-dvh w-[100vw] lg:w-[35vw] flex items-center justify-center  ">

                {islogin ? (
                    <div>
                        <div className="flex gap-2">
                            <div className=" rounded-t-xl bg-gray-900 p-2 text-center w-[80px]"> Login </div>
                            <div onClick={() => setIslogin(0)} className=" cursor-pointer  rounded-xl bg-gray-700 p-2 text-center w-[80px]"> SignUp </div>
                        </div>
                        <div className=" loginContent w-full lg:w-[28vw] pt-2 flex flex-col items-center ">

                            <div className="flex w-full  gap-3">
                                <button className="flex hover:bg-gray-900 active:bg-gray-950 justify-around items-center border rounded-xl p-3 w-full bg-[#191919]" >Login with Google <img className="w-[20px] h-[20px]" src="google.png" alt="" /> </button>
                                <button className="flex hover:bg-gray-900 active:bg-gray-950 justify-around item-center border rounded-xl p-3 w-full bg-[#191919]" >Login with Facebook <img className="w-[20px] h-[20px]" src="facebook.png" width={10} alt="" /> </button>
                            </div>

                            {/*---------or---------*/}
                            <div className="flex mt-3 w-full items-center gap-3 ">
                                <div className="h-0 w-full border border-gray-500 "></div>
                                or
                                <div className="h-0 w-full border border-gray-500 "></div>
                            </div>

                            <div className="w-full">
                                <InputField label="User Name" value={user.username} name="username" placeholder="you@name" onChange={handleChange} />
                                <InputField label="Password" value={user.password} name="password" placeholder="••••••••" onChange={handleChange} />
                                <label className="text-sm font-medium text-gray-400 w-full">At least 8 characters, with number and symbols.</label>
                            </div>

                            <div className=" m-3 w-full">
                                <input type="checkbox" /> <label className="text-sm font-medium text-gray-300 w-full">Remember me</label>
                            </div>

                            <button onClick={handleSubmit} className="p-2 w-full hover:bg-[#6f98ff] active:bg-[#4ce0f3b1] bg-[#4cdff3] rounded-md text-xl text-black"> Login </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex gap-2">
                            <button onClick={() => setIslogin(1)} className=" cursor-pointer rounded-xl bg-gray-700 p-2 text-center w-[80px]"> Login </button>
                            <div className=" rounded-t-xl bg-gray-900 p-2 text-center w-[80px]"> SignUp </div>
                        </div>
                        <div className=" signupContent w-full lg:w-[28vw] pt-2 flex flex-col items-center ">

                            <div className="flex w-full  gap-3">
                                <button className="flex hover:bg-gray-900 active:bg-gray-950 justify-around items-center border rounded-xl p-3 w-full bg-[#191919]" >Sign up with Google <img className="w-[20px] h-[20px]" src="google.png" alt="" /> </button>
                                <button className="flex hover:bg-gray-900 active:bg-gray-950 justify-around item-center border rounded-xl p-3 w-full bg-[#191919]" >Sign up with Facebook <img className="w-[20px] h-[20px]" src="facebook.png" alt="" /> </button>
                            </div>
                            <div className="flex mt-3 w-full items-center gap-3 ">
                                <div className="h-0 w-full border border-gray-500 "></div>
                                or
                                <div className="h-0 w-full border border-gray-500 "></div>
                            </div>
                            <div className="lg:flex lg:justify-between w-full gap-3">
                                <InputField label="User Name" value={user.username} name="username" placeholder="you@name" onChange={handleChange} />
                                <InputField label="Full Name" value={user.name} name="name" placeholder="Full Name" onChange={handleChange} />
                            </div>
                            <div className="w-full">
                                <InputField label="Email Address" value={user.email} name="email" placeholder="you@gmail.com" onChange={handleChange} />
                                <InputField label="Password" value={user.password} name="password" placeholder="••••••••" onChange={handleChange} />
                                <label className="text-sm font-medium text-gray-400 w-full">At least 8 characters, with number and symbols.</label>
                            </div>
                            <div className=" m-3 w-full">
                                <input type="checkbox" /> <label className="text-sm font-medium text-gray-300 w-full">Remember me</label>
                            </div>

                            <button onClick={handleSubmit} className="p-2 w-full hover:bg-[#6f98ff] active:bg-[#4ce0f3b1] bg-[#4cdff3] rounded-md text-xl text-black"> Create Account</button>

                        </div>
                    </div>
                )}

            </div>



            <div className=" hidden lg:block lg:w-[65vw]">
                <img className=" fixed object-cover h-[100vh]" src="scn1.jpg" alt="" />
                <div className=" m-10 mb-0 relative text-[4vw] font-serif font-extrabold text-white"> Powering the Future of Algorithmic Trading</div>

                <div className="w-[50vw] flex ml-10 ">

                    <div className="mt-6 flex flex-wrap  gap-4 justif">
                        {[
                            "Advanced Technical Analysis/Charting Tools",
                            "Community Feeds",
                            "Customizable UI for Your Trading Style",
                            "Customer Support",
                        ].map((feature, index) => (
                            <button
                                key={index}
                                className="px-3 py-2 text-white text-[15px] font-medium rounded-full border border-gray-400 bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg backdrop-blur-md"
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>


                <div className=" w-full mt-[32vh] p-5 justify-center items-center flex flex-col relative text-white text-center" > Game changing trading simulator best for making strategy, backtest and learn <b className="text-xl">Tradevirtuo</b> </div>
            </div>





        </div>
    )
}

export default login


