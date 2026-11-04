// Photo set. All Unsplash License (free to use), credited in the footer.
// Pulled 2026-11-04. Chosen by description; swap any that don't earn their place.

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
  // Beaches
  kaafu: {
    id: "gzMBvmSl95U",
    src: cdn("1751237422072-a6564c97a90a", 2400),
    alt: "A pale sandbar curving through turquoise water at sunrise, seen from above",
    place: "Kaafu Atoll, Maldives",
    photographer: "Ken Cheung",
    profile: "https://unsplash.com/@kencheungphoto",
  },
  thoddoo: {
    id: "j2INaFJ1dLc",
    src: cdn("1759674950524-4dd2aaec63ee", 1600),
    alt: "Clear water over sand on an empty beach",
    place: "Thoddoo, Maldives",
    photographer: "Adam Juman",
    profile: "https://unsplash.com/@jumanjiphotos",
  },
  capoCaccia: {
    id: "DAqdn4zjZeU",
    src: cdn("1654107359538-1808d2abc260", 2400),
    alt: "The sea seen from inside a cave mouth",
    place: "Capo Caccia, Sardinia",
    photographer: "Jürgen Scheeff",
    profile: "https://unsplash.com/@sardinien_blog",
  },
  // Buildings in nature
  beloHorizonte: {
    id: "CLf251DBZjc",
    src: cdn("1762279938701-9840da78ee95", 1600),
    alt: "A brutalist building on concrete columns behind trees",
    place: "Belo Horizonte, Brazil",
    photographer: "Gustavo Hvenegaard",
    profile: "https://unsplash.com/@gustavohvenegaard",
  },
  lauterbrunnen: {
    id: "epblpi1Dvmw",
    src: cdn("1612178010892-205e565c4c5d", 1600),
    alt: "Grey buildings below a waterfall and mountains",
    place: "Lauterbrunnen, Switzerland",
    photographer: "Maximilian Jaenicke",
    profile: "https://unsplash.com/@maxican",
  },
  zurich: {
    id: "iwsH-7Nzh2U",
    src: cdn("1747574172799-5ef1d0fcd8f4", 2400),
    alt: "Modern buildings by a lake with the Alps behind",
    place: "Zürich, Switzerland",
    photographer: "Henrique Ferreira",
    profile: "https://unsplash.com/@rickpsd",
  },
  gruyeres: {
    id: "Pls81nsj800",
    src: cdn("1590186087488-2c8e86653106", 1600),
    alt: "A white and black concrete building near trees and snow-covered mountains",
    place: "Gruyères, Switzerland",
    photographer: "Simon Champagne",
    profile: "https://unsplash.com/@a_little_haitian",
  },
  // Landscapes and remote places
  sognefjord: {
    id: "yt73hFOpqFU",
    src: cdn("1740847553171-cb8d23455e44", 2400),
    alt: "A mountain reflected in the still water of a Norwegian fjord at first light",
    place: "Sognefjord, Norway",
    photographer: "Georg Eiermann",
    profile: "https://unsplash.com/@georgeiermann",
  },
  oia: {
    id: "MdTtpxGlrz8",
    src: cdn("1563789031959-4c02bcb41319", 2000),
    alt: "Blue-domed white chapels on the cliff at Oia",
    place: "Oia, Santorini",
    photographer: "Dan",
    profile: "https://unsplash.com/@dgw_unsplash",
  },
  meteora: {
    id: "qutq1V5SGu4",
    src: cdn("1759668559298-0839fa96c68d", 1600),
    alt: "A monastery perched on a rock pillar above the valley",
    place: "Meteora, Greece",
    photographer: "Gábor Kárpáti",
    profile: "https://unsplash.com/@gaborfromhungary",
  },
  deathValley: {
    id: "BEwwvdpbar4",
    src: cdn("1766487484329-c76860d9460d", 2400),
    alt: "A road winding through empty desert",
    place: "Death Valley, USA",
    photographer: "Simon Schwyter",
    profile: "https://unsplash.com/@saimens",
  },
  uyuni: {
    id: "pSrhno1DL30",
    src: cdn("1734793809541-1442c17c17e7", 1600),
    alt: "A white salt flat running to the horizon under a blue sky",
    place: "Salar de Uyuni, Bolivia",
    photographer: "Mark Kuiper",
    profile: "https://unsplash.com/@markkuiper",
  },
  mykines: {
    id: "v56o1Zteats",
    src: cdn("1662553358475-de976742fa0d", 2400),
    alt: "A handful of houses on a green hillside above the sea",
    place: "Mykines, Faroe Islands",
    photographer: "Jessica Pamp",
    profile: "https://unsplash.com/@yessijes",
  },
  tjornuvik: {
    id: "zL2Pv7I1Qy8",
    src: cdn("1610703227591-d252c6202d1f", 1600),
    alt: "Grey sea stacks off a cliff under low cloud",
    place: "Tjørnuvík, Faroe Islands",
    photographer: "Polina Kuzovkova",
    profile: "https://unsplash.com/@p_kuzovkova",
  },
};

export const credits = Object.values(photos).filter(
  (p, i, all) => all.findIndex((q) => q.photographer === p.photographer) === i,
);
