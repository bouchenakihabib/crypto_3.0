import {BsShieldFillCheck,BsSpeedometer2} from 'react-icons/bs';

import { MdOutlinePriceCheck } from "react-icons/md";

const ServiceCard = ({color, title, icon, subtitle}) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className='mt-2 text-white text-lg'>{title}</h1>
            <p className='mt-2 text-white text-sm md:=w-9/12'>{subtitle}</p>
        </div>
    </div>
)

const Services = () => {
    return (
        < div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services" >
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className="flex-1 flex flex-col justify-start items-start"> 
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient"> 
                        Services that we 
                        <br/>
                        continue to improve
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex-col justify-start items-center">
                <ServiceCard
                    color="bg-[#2952E3]"
                    title="Security Guarenteed"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                    subtitle="Security is guarenteed. We will never sell your data and maintain the quality of our services." 
                />
                <ServiceCard
                    color="bg-[#8945F8]"
                    title="Best Prices"
                    icon={<MdOutlinePriceCheck fontSize={21} className="text-white"/>}
                    subtitle="Cheapest exchange rates guarenteed." 
                />
                <ServiceCard
                    color="bg-[#F84550]"
                    title="Fastest Transactions"
                    icon={<BsSpeedometer2 fontSize={21} className="text-white"/>}
                    subtitle="Get the quickest transaction's speed on the market." 
                />
            </div>
        </div>
    );
}

export default Services;  