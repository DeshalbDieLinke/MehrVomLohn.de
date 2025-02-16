import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type UserData from "@/lib/UserData";
import { navigate } from "astro/virtual-modules/transitions-router.js";

export interface IncomeGroupsForInput {
    value: number;
    label: string;
}

export function FirstInput(props: {
    input: IncomeGroupsForInput[];
    status: "single" | "twochildren" | "paar";
    setUserData: (value: UserData) => void;
}) {
    return (
        <RadioGroup
            style={{ outline: "none" }}
            className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-sm sm:gap-8 bg-gray-200"}
            tabIndex={0}
            aria-required="false"
            dir="ltr"
            role="radiogroup"
            onValueChange={(e: any) => {
                props.setUserData({ income: e, status: props.status, isPercentage: false });
                console.log("onchange called", e);
            }}
        >
            {props.input.map((item, i) => (
                    <Label
                        key={i}
                        className="group relative p-4 sm:p-5 rounded-lg border-2 block cursor-pointer border-black hover:border-black hover:bg-gray-300 transition-colors grow"
                        htmlFor={item.value.toString()}
                    >   
                        <RadioGroupItem className="absolute left-4 top-4 sm:left-5 sm:top-5" value={item.value.toString()} id={item.value.toString()} />
                        <div className="pl-8 sm:pl-9">
                            <div className="font-medium">{item.label}</div>
                        </div>
                    </Label>
            ))}
        </RadioGroup>
    );
}
