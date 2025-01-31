import {type ReactNode } from "react";

interface TwoChildrenProps {
    children: [ReactNode, ReactNode];
}

const Callout: React.FC<TwoChildrenProps> = ({ children }) => {
    const [Title, Body] = children; // Destructure the two children
    
    return (
        <div className="p-6 bg-red-200 text-2xl flex border-l-4 border-red-600">
        <div className=" w-fit flex mr-4 mt-3">
            <div className="border-4 border-red-600 rounded-full flex justify-center place-items-center w-8 h-8">     
                <h1 className="text-2xl translate-y-1 text-red-600">!</h1>
            </div>
        </div>
        <div>
            {Title}
            {Body}
        </div>

        </div>
    );
};

export default Callout;
