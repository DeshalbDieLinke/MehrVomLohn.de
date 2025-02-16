import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface IncomeGroupsForInput {
    value: number;
    label: string;
}

export function FirstInput(props: { input: IncomeGroupsForInput[]; children: string; setUserData: (value: { income: number; children: string }) => void }) {
    return (
        <RadioGroup
            style={{ outline: "none" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2"
            tabIndex={0}
            aria-required="false"
            dir="ltr"
            role="radiogroup"
            onValueChange={(e: any) => {
                console.log("onchange called", e);
                props.setUserData({ income: e, children: props.children });
            }}
        >
            {props.input.map((item, i) => (
                <div className="flex items-center border-gray-500" key={i}>
                    <Label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group relative p-4 sm:p-5 rounded-lg border-2 block cursor-pointer border-gray-200 hover:border-gray-200 transition-colors"
                        htmlFor={item.value}
                    >
                        <RadioGroupItem
                            className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 absolute left-4 top-4 sm:left-5 sm:top-5"
                            value={item.value}
                            id={item.value}
                        />
                        <div className="pl-8 sm:pl-9">{item.label}</div>
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
}
