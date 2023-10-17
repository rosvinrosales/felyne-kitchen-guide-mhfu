import { CardFooter } from "@/components/ui/card";

const text = {
  offensive: {
    "Felyne Aim": "Increases the damage of Bowgun's Normal S 1.1 times.",
    "Felyne Blunt Force": "Bowgun melee damage is multiplied by 5.",
    "Felyne Constructor":
      "The large grey boulders that sometime block an entrance can be destroyed much easier.",
    "Felyne Fighter": "Punches from Taunt deal 5 damage instead of 1.",
    "Felyne Great Break": "	Normal sharpness loss from weapon bounces.",
    "Felyne Gunpowder": '	Upgrades all bombs into their "+" version',
    "Felyne Kickboxer": "Attack Power of Kick gesture increases from 2 to 10.",
    "Felyne Special Attack": "Weapon's ailment value multiplied by 1.125.",
    "Felyne Temper":
      "Increases Bow and Bowgun damage; range distance decreases and deviation of shells increases.",
    "Felyne Throw":
      "Throwing distance increases for items such as paintballs. Throwing knife and stone damage increased by x2.",
    "Felyne Heroics":
      "Attack increases by x1.35 and defense by x1.5 when health is below 10 HP.",
    "Felyne KO": "KO values multiplied by 1.1.",
    "Felyne Dance": "+25 True Raw when the Dance Gesture is used.",
    "Felyne Bulldozer":
      "After a bounce, the next attack has increased sharpness.",
  },
  defensive: {
    "Felyne Defense (Lo/Hi)":
      "1/8 (Lo) 1/4 (Hi) chance of reducing damage taken by 1/3.",
    "Felyne Escape":
      "Stamina decrease rate is lessened when the Hunter is running from a boss monster.",
    "Felyne Fear Factor": "Increases chances of boss monsters being weaker.",
    "Felyne Medicine":
      "Healing item effectiveness boosted by 10%. This includes Herbs, Potions, Mega Potions, Lifepowder, and First Aid Medicines. Antidote Herb chance to heal Poison becomes 100%.",
    "Felyne Resilience (Lo/Hi)":
      "Increases invulnerability when the Hunter rises from the ground.",
    "Felyne Bonus Skills":
      "Kitchen skills continue to be effective after hunter falls in battle.",
    "Felyne Martial Arts":
      "Stamina usage for rolls, back hops, and blocking decreases.",
    "Felyne Courage":
      "Prevents the Hunter from flinching when spotted by Boss Monster.",
  },
  rewards: {
    "Felyne Dismantle (Lo/Hi)":
      "25% (Lo) 50% (Hi) chance of getting one extra carve.",
    "Felyne Ultra Lucky Cat":
      "50% chance to give one extra reward if less than 10 slots in the rewards screen.",
    "Felyne Mega Lucky Cat":
      "Gives one extra reward if less than 10 slots in the rewards screen.",
    "Crazy Lucky Cat": "Doubles money rewards.",
    "Felyne Charisma":
      "Guarantees the maximum amount of trades with the Veggie Elder (6 times).",
    "Felyne Negotiation":
      "Increases the chance to obtain rare items from the Veggie Elder. Increases the chance to obtain stolen items at the Melynx Den.",
    "Felyne Exchanger": "Pokke Points obtained after quest multiplied by 1.15.",
    "Felyne Explorer": "Guarantees spawning in secret area if possible.",
    "Felyne Supercarver":
      "The Hunter is not interrupted by minor attacks during carving.",
    "Felyne Scavenger":
      "Guarantees getting a shiny from a monster on the first try.",
  },
  other: {
    "Felyne Ballooner":
      "Guarantees the hot air balloon will appear on the quest.",
    "Felyne Combine": "Increases the combine success rate by 10%.",
    "Felyne Gastronomy":
      "Chance to increase Stamina by 25 when a Fish is consumed.",
    "Felyne Scavenger":
      "Chance to get 25 stamina after consuming a healing item.",
    "Felyne Culinary Arts": "BBQ Spit behaves like a Gourmet Spit.",
    "Felyne Gathering":
      "Increases the chance to gather more times from a gathering point.",
    "Felyne Frugality":
      "25% chance a tool will not break if it otherwise would.",
    "Felyne Woodwinds":
      "25% chance a horn will not break if it otherwise would.",
    "Felyne Vine Master":
      "Prevents the Hunter from falling against weak attack while climbing vines.",
    "Felyne Vine Climber":
      "Reduces stamina reduction by half when climbing vines.",
    "Felyne Strongcat":
      "Prevents the Hunter from dropping transported objects from weak attacks.",
    "Felyne Landing":
      "Allows jumping from any height while transporting objects without breaking them.",
    "Felyne Supercat":
      "Stamina consumption halved when running while transporting an object.",
  },
};

export const Footer = () => {
  return (
    <CardFooter>
      <div>
        <h2 className="font-semibold text-center mb-2">WHIM SKILLS LIST</h2>
        <div>
          {Object.entries(text).map(([key, value]) => (
            <div className="rounded-lg border p-2 mb-2">
              <h6 className="capitalize mb-3">{key}</h6>
              <div className="pl-2">
                {Object.entries(value).map(([key, value]) => (
                  <div key={key} className="p-1 text-sm">
                    <p>{key}</p>
                    <p className="text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardFooter>
  );
};
