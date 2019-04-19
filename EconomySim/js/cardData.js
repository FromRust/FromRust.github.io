// card data
// structure: {id (XYZ): { name: "xyz", type: XYZ }}
var cardData = {};
//cardData[1] = {}; // characters
cardData[1] = {}; // abilities
cardData[2] = {}; // augments
cardData[3] = {}; // blueprints
cardData[4] = {}; // monsters

// characters
//cardData[1][1] = { name: "Lucky Jack", type: 1 };
//cardData[1][2] = { name: "Buster", type: 1 };
//cardData[1][3] = { name: "Andrea", type: 1 };
//cardData[1][4] = { name: "Lena", type: 1 };

//abilities
cardData[1][1] = { xp: 100, character: 1, name: "Brace for Impact", type: 2 };
cardData[1][2] = { xp: 100, character: 1, name: "Ready for Round 2", type: 2 };
cardData[1][3] = { xp: 100, character: 1, name: "Adrenaline Surge", type: 2 };
cardData[1][4] = { xp: 100, character: 1, name: "Patch Yourself Up", type: 2 };
cardData[1][5] = { xp: 100, character: 1, name: "Fight Through the Pain", type: 2 };
cardData[1][6] = { xp: 100, character: 1, name: "Blaze of Glory", type: 2 };
cardData[1][7] = { xp: 100, character: 2, name: "Called Shot", type: 2 };
cardData[1][8] = { xp: 100, character: 2, name: "Overwatch", type: 2 };
cardData[1][9] = { xp: 100, character: 2, name: "The Long Watch", type: 2 };
cardData[1][10] = { xp: 100, character: 2, name: "Draw a Bead", type: 2 };
cardData[1][11] = { xp: 100, character: 2, name: "Know Your Enemy", type: 2 };
cardData[1][12] = { xp: 100, character: 2, name: "Saw You Coming", type: 2 };
cardData[1][13] = { xp: 100, character: 3, name: "Scout Ahead", type: 2 };
cardData[1][14] = { xp: 100, character: 3, name: "Animate Scrap", type: 2 };
cardData[1][15] = { xp: 100, character: 3, name: "Jerry-Rig", type: 2 };
cardData[1][16] = { xp: 100, character: 3, name: "We Have the Technology", type: 2 };
cardData[1][17] = { xp: 100, character: 3, name: "Resourceful", type: 2 };
cardData[1][18] = { xp: 100, character: 4, name: "Backup Singer", type: 2 };
cardData[1][19] = { xp: 100, character: 4, name: "Tempo Shift", type: 2 };
cardData[1][20] = { xp: 100, character: 4, name: "Up to Eleven", type: 2 };
cardData[1][21] = { xp: 100, character: 4, name: "Soothing Melody", type: 2 };
cardData[1][22] = { xp: 100, character: 4, name: "Presto", type: 2 };
cardData[1][23] = { xp: 100, character: 4, name: "On a Loop", type: 2 };

//augments
cardData[2][1] = { xp: 0, name: "+1 CP", type: 3 };
cardData[2][2] = { xp: 0, name: "+2 CP", type: 3 };
cardData[2][3] = { xp: 0, name: "+1 EP", type: 3 };
cardData[2][4] = { xp: 0, name: "+2 EP", type: 3 };

//blueprints
cardData[3][1] = { xp: 50, character: 1, name: "Magnetic Coils", type: 4 };
cardData[3][2] = { xp: 50, character: 1, name: "Legs-O-Skeleton", type: 4 };
cardData[3][3] = { xp: 50, character: 1, name: "Homebrew Stims", type: 4 };
cardData[3][4] = { xp: 50, character: 1, name: "Auto-Injector", type: 4 };
cardData[3][5] = { xp: 50, character: 1, name: "Trophy Bag", type: 4 };
cardData[3][6] = { xp: 50, character: 1, name: "Biohazard Suit", type: 4 };
cardData[3][7] = { xp: 50, character: 1, name: "Laced Syringes", type: 4 };
cardData[3][8] = { xp: 50, character: 2, name: "Scope", type: 4 };
cardData[3][9] = { xp: 50, character: 2, name: "Chameleon Suit", type: 4 };
cardData[3][10] = { xp: 50, character: 2, name: "Laser Assisted Aim", type: 4 };
cardData[3][11] = { xp: 50, character: 2, name: "Radioactive Ammo", type: 4 };
cardData[3][12] = { xp: 50, character: 2, name: "Explosive Shells", type: 4 };
cardData[3][13] = { xp: 50, character: 3, name: "Build-a-Bomb Kit", type: 4 };
cardData[3][14] = { xp: 50, character: 3, name: "Moon Boots", type: 4 };
cardData[3][15] = { xp: 50, character: 3, name: "Rechargable Power Core", type: 4 };
cardData[3][16] = { xp: 50, character: 3, name: "Shorter Fuses", type: 4 };
cardData[3][17] = { xp: 50, character: 3, name: "Supply Drone", type: 4 };
cardData[3][18] = { xp: 50, character: 3, name: "Hotwired Gear", type: 4 };
cardData[3][19] = { xp: 50, character: 4, name: "Treble Amplifier", type: 4 };
cardData[3][20] = { xp: 50, character: 4, name: "Stereo Microphone", type: 4 };
cardData[3][21] = { xp: 50, character: 4, name: "Echo Shielding", type: 4 };
cardData[3][22] = { xp: 50, character: 4, name: "Microphone Bolas", type: 4 };
cardData[3][23] = { xp: 50, character: 4, name: "Polysynth Soundtable", type: 4 };
cardData[3][24] = { xp: 50, character: 4, name: "Equalizer", type: 4 };

//monsters
//TBD - don't need these yet
cardData[4][1] = { xp: 0, name: "TestMonsterCard", type: 5 };
cardData[4][2] = { xp: 0, name: "TestMonsterCard", type: 5 };
cardData[4][3] = { xp: 0, name: "TestMonsterCard", type: 5 };
cardData[4][4] = { xp: 0, name: "TestMonsterCard", type: 5 };
cardData[4][5] = { xp: 0, name: "TestMonsterCard", type: 5 };

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

// helper function to get all IDs for a type/character
function getCardIDs(type, character)
{
	var keys = [];
	for(var card in cardData[type])
	{
		if(type == 1 || type == 3)
		{
			if(cardData[type][card].character == character)
			{
				keys.push(card);
			}
		}
		else
		{
			keys.push(card);
		}
	}
	return keys;
}