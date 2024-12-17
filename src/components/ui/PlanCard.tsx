import Image from "next/image";

interface PlanCardProps {
  name: string;
  price: string;
  icon: string;
  isSelected: boolean;
  yearlyBonus?: boolean;
  onClick: () => void;
}

export function PlanCard({
  name,
  price,
  icon,
  isSelected,
  yearlyBonus,
  onClick,
}: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-row md:flex-col items-start xs:gap-2 p-4 border rounded-lg cursor-pointer
        hover:border-purplish-blue transition-colors duration-200
        md:flex-1 md:min-w-[138px]
        ${
          isSelected ? "border-purplish-blue bg-alabaster" : "border-light-gray"
        }
      `}
    >
      <Image src={icon} alt={name} width={40} height={40} />
      <div className="md:mt-8">
        <h3 className="font-medium text-marine-blue">{name}</h3>
        <p className="text-cool-gray text-sm">{price}</p>
        {yearlyBonus && (
          <p className="text-marine-blue text-sm mt-1">2 months free</p>
        )}
      </div>
    </div>
  );
}
