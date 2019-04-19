// card data
// structure: {id (XYZ): { name: "xyz", type: XYZ }}
var cardData = {};
cardData[1] = {}; // characters
cardData[2] = {}; // abilities
cardData[3] = {}; // augments
cardData[4] = {}; // blueprints
cardData[5] = {}; // monsters

// characters
cardData[1][1] = { name: "Lucky Jack", type: 1 };
cardData[1][2] = { name: "Buster", type: 1 };
cardData[1][3] = { name: "Andrea", type: 1 };
cardData[1][4] = { name: "Lena", type: 1 };

//abilities
cardData[2][1] = { character: 1, name: "Brace for Impact", type: 2 };
cardData[2][2] = { character: 1, name: "Ready for Round 2", type: 2 };
cardData[2][3] = { character: 1, name: "Adrenaline Surge", type: 2 };
cardData[2][4] = { character: 1, name: "Patch Yourself Up", type: 2 };
cardData[2][5] = { character: 1, name: "Fight Through the Pain", type: 2 };
cardData[2][6] = { character: 1, name: "Blaze of Glory", type: 2 };
cardData[2][7] = { character: 2, name: "Called Shot", type: 2 };
cardData[2][8] = { character: 2, name: "Overwatch", type: 2 };
cardData[2][9] = { character: 2, name: "The Long Watch", type: 2 };
cardData[2][10] = { character: 2, name: "Draw a Bead", type: 2 };
cardData[2][11] = { character: 2, name: "Know Your Enemy", type: 2 };
cardData[2][12] = { character: 2, name: "Saw You Coming", type: 2 };
cardData[2][13] = { character: 3, name: "Scout Ahead", type: 2 };
cardData[2][14] = { character: 3, name: "Animate Scrap", type: 2 };
cardData[2][15] = { character: 3, name: "Jerry-Rig", type: 2 };
cardData[2][16] = { character: 3, name: "We Have the Technology", type: 2 };
cardData[2][17] = { character: 3, name: "Resourceful", type: 2 };
cardData[2][18] = { character: 4, name: "Backup Singer", type: 2 };
cardData[2][19] = { character: 4, name: "Tempo Shift", type: 2 };
cardData[2][20] = { character: 4, name: "Up to Eleven", type: 2 };
cardData[2][21] = { character: 4, name: "Soothing Melody", type: 2 };
cardData[2][22] = { character: 4, name: "Presto", type: 2 };
cardData[2][23] = { character: 4, name: "On a Loop", type: 2 };

//augments
cardData[3][1] = { name: "+1 CP", type: 3 };
cardData[3][2] = { name: "+2 CP", type: 3 };
cardData[3][3] = { name: "+1 EP", type: 3 };
cardData[3][4] = { name: "+2 EP", type: 3 };

//blueprints
cardData[4][1] = { character: 1, name: "Magnetic Coils", type: 4 };
cardData[4][2] = { character: 1, name: "Legs-O-Skeleton", type: 4 };
cardData[4][3] = { character: 1, name: "Homebrew Stims", type: 4 };
cardData[4][4] = { character: 1, name: "Auto-Injector", type: 4 };
cardData[4][5] = { character: 1, name: "Trophy Bag", type: 4 };
cardData[4][6] = { character: 1, name: "Biohazard Suit", type: 4 };
cardData[4][7] = { character: 1, name: "Laced Syringes", type: 4 };
cardData[4][8] = { character: 2, name: "Scope", type: 4 };
cardData[4][9] = { character: 2, name: "Chameleon Suit", type: 4 };
cardData[4][10] = { character: 2, name: "Laser Assisted Aim", type: 4 };
cardData[4][11] = { character: 2, name: "Radioactive Ammo", type: 4 };
cardData[4][12] = { character: 2, name: "Explosive Shells", type: 4 };
cardData[4][13] = { character: 3, name: "Build-a-Bomb Kit", type: 4 };
cardData[4][14] = { character: 3, name: "Moon Boots", type: 4 };
cardData[4][15] = { character: 3, name: "Rechargable Power Core", type: 4 };
cardData[4][16] = { character: 3, name: "Shorter Fuses", type: 4 };
cardData[4][17] = { character: 3, name: "Supply Drone", type: 4 };
cardData[4][18] = { character: 3, name: "Hotwired Gear", type: 4 };
cardData[4][19] = { character: 4, name: "Treble Amplifier", type: 4 };
cardData[4][20] = { character: 4, name: "Stereo Microphone", type: 4 };
cardData[4][21] = { character: 4, name: "Echo Shielding", type: 4 };
cardData[4][22] = { character: 4, name: "Microphone Bolas", type: 4 };
cardData[4][23] = { character: 4, name: "Polysynth Soundtable", type: 4 };
cardData[4][24] = { character: 4, name: "Equalizer", type: 4 };

//monsters
//TBD - don't need these yet
cardData[5][1] = { name: "TestMonsterCard", type: 5 };
cardData[5][2] = { name: "TestMonsterCard", type: 5 };
cardData[5][3] = { name: "TestMonsterCard", type: 5 };
cardData[5][4] = { name: "TestMonsterCard", type: 5 };
cardData[5][5] = { name: "TestMonsterCard", type: 5 };

// this is a real hacky way to create a static lookup table so we can do things like
// "give me a random card from the entire pool"
var totalCardsInPool = 0;
var keys = Object.keys(cardData);
var allIds = [];
var allTypes = [];
for(var x = 0; x < keys.length; x++)
{
	var cardsForThisType = Object.keys(cardData[keys[x]]);
	totalCardsInPool += cardsForThisType.length;
	for(var y = 0; y < cardsForThisType.length; y++)
	{
		allIds.push(cardsForThisType[y]);
		allTypes.push(keys[x]);
	}
}