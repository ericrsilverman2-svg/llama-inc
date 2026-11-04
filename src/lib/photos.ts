// Starter photo set. All Unsplash License (free to use), credited in the footer.
// Pulled 2026-11-04. Swap freely; keep the subject rules from the brand book.

export type Photo = {
  id: string;
  src: string;
  alt: string;
  place: string;
  photographer: string;
  profile: string;
};

const cdn = (hash: string, w: number) =>
  `https://images.unsplash.com/photo-${hash}?auto=format&fit=crop&q=70&w=${w}`;

export const photos: Record<string, Photo> = {
  sognefjord: {
    id: "yt73hFOpqFU",
    src: cdn("1740847553171-cb8d23455e44", 2400),
    alt: "A mountain reflected in the still water of a Norwegian fjord at first light",
    place: "Sognefjord, Norway",
    photographer: "Georg Eiermann",
    profile: "https://unsplash.com/@georgeiermann",
  },
  sognefjordDark: {
    id: "ZywVqxmV7Rc",
    src: cdn("1740847553230-a1b4e0e41952", 1200),
    alt: "Green mountains rising from dark fjord water",
    place: "Sognefjord, Norway",
    photographer: "Georg Eiermann",
    profile: "https://unsplash.com/@georgeiermann",
  },
  oia: {
    id: "MdTtpxGlrz8",
    src: cdn("1563789031959-4c02bcb41319", 1200),
    alt: "Blue-domed white chapels on the cliff at Oia",
    place: "Oia, Santorini",
    photographer: "Dan",
    profile: "https://unsplash.com/@dgw_unsplash",
  },
  meteora: {
    id: "qutq1V5SGu4",
    src: cdn("1759668559298-0839fa96c68d", 1200),
    alt: "A monastery perched on a rock pillar above the valley",
    place: "Meteora, Greece",
    photographer: "Gábor Kárpáti",
    profile: "https://unsplash.com/@gaborfromhungary",
  },
  deathValley: {
    id: "BEwwvdpbar4",
    src: cdn("1766487484329-c76860d9460d", 1200),
    alt: "A road winding through empty desert",
    place: "Death Valley, USA",
    photographer: "Simon Schwyter",
    profile: "https://unsplash.com/@saimens",
  },
  uyuni: {
    id: "pSrhno1DL30",
    src: cdn("1734793809541-1442c17c17e7", 1200),
    alt: "A white salt flat running to the horizon under a blue sky",
    place: "Salar de Uyuni, Bolivia",
    photographer: "Mark Kuiper",
    profile: "https://unsplash.com/@markkuiper",
  },
  mykines: {
    id: "v56o1Zteats",
    src: cdn("1662553358475-de976742fa0d", 1200),
    alt: "A handful of houses on a green hillside above the sea",
    place: "Mykines, Faroe Islands",
    photographer: "Jessica Pamp",
    profile: "https://unsplash.com/@yessijes",
  },
  tjornuvik: {
    id: "zL2Pv7I1Qy8",
    src: cdn("1610703227591-d252c6202d1f", 1200),
    alt: "Grey sea stacks off a cliff under low cloud",
    place: "Tjørnuvík, Faroe Islands",
    photographer: "Polina Kuzovkova",
    profile: "https://unsplash.com/@p_kuzovkova",
  },
};

export const credits = Object.values(photos).filter(
  (p, i, all) => all.findIndex((q) => q.photographer === p.photographer) === i,
);
