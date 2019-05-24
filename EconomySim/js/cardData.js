var version = 4;
// character list
var characterList = [1, 2, 3, 4];
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

// rarities: normal 1, uncommon 2, rare 3, legendary 4

//abilities
cardData[1][1] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 1, name: "Brace for Impact", type: 2 };
cardData[1][2] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 1, name: "Ready for Round 2", type: 2 };
cardData[1][3] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 1, name: "Adrenaline Surge", type: 2 };
cardData[1][4] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 1, name: "Patch Yourself Up", type: 2 };
cardData[1][5] = { canDrop: true, canPurchase: true, rarity: 3, cost: 200, refund: 10, xp: 100, character: 1, name: "Fight Through the Pain", type: 2 };
cardData[1][6] = { canDrop: true, canPurchase: true, rarity: 4, cost: 200, refund: 10, xp: 100, character: 1, name: "Blaze of Glory", type: 2 };
cardData[1][7] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 2, name: "Called Shot", type: 2 };
cardData[1][8] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 2, name: "Overwatch", type: 2 };
cardData[1][9] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 2, name: "The Long Watch", type: 2 };
cardData[1][10] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 2, name: "Draw a Bead", type: 2 };
cardData[1][11] = { canDrop: true, canPurchase: true, rarity: 3, cost: 200, refund: 10, xp: 100, character: 2, name: "Know Your Enemy", type: 2 };
cardData[1][12] = { canDrop: true, canPurchase: true, rarity: 4, cost: 200, refund: 10, xp: 100, character: 2, name: "Saw You Coming", type: 2 };
cardData[1][13] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 3, name: "Scout Ahead", type: 2 };
cardData[1][14] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 3, name: "Animate Scrap", type: 2 };
cardData[1][15] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 3, name: "Jerry-Rig", type: 2 };
cardData[1][16] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 3, name: "We Have the Technology", type: 2 };
cardData[1][17] = { canDrop: true, canPurchase: true, rarity: 3, cost: 200, refund: 10, xp: 100, character: 3, name: "Resourceful", type: 2 };
cardData[1][18] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 4, name: "Backup Singer", type: 2 };
cardData[1][19] = { canDrop: true, canPurchase: true, rarity: 1, cost: 200, refund: 10, xp: 100, character: 4, name: "Tempo Shift", type: 2 };
cardData[1][20] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 4, name: "Up to Eleven", type: 2 };
cardData[1][21] = { canDrop: true, canPurchase: true, rarity: 2, cost: 200, refund: 10, xp: 100, character: 4, name: "Soothing Melody", type: 2 };
cardData[1][22] = { canDrop: true, canPurchase: true, rarity: 3, cost: 200, refund: 10, xp: 100, character: 4, name: "Presto", type: 2 };
cardData[1][23] = { canDrop: true, canPurchase: true, rarity: 4, cost: 200, refund: 10, xp: 100, character: 4, name: "On a Loop", type: 2 };

//augments
cardData[2][1] = { canDrop: true, canPurchase: true, rarity: 1, cost: 50, refund: 10, xp: 0, name: "+1 CP", type: 3 };
cardData[2][2] = { canDrop: true, canPurchase: true, rarity: 2, cost: 50, refund: 10, xp: 0, name: "+2 CP", type: 3 };
cardData[2][3] = { canDrop: true, canPurchase: true, rarity: 3, cost: 50, refund: 10, xp: 0, name: "+1 EP", type: 3 };
cardData[2][4] = { canDrop: true, canPurchase: true, rarity: 4, cost: 50, refund: 10, xp: 0, name: "+2 EP", type: 3 };

//blueprints
cardData[3][1] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 1, name: "Magnetic Coils", type: 4 };
cardData[3][2] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 1, name: "Legs-O-Skeleton", type: 4 };
cardData[3][3] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 1, name: "Homebrew Stims", type: 4 };
cardData[3][4] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 1, name: "Auto-Injector", type: 4 };
cardData[3][5] = { canDrop: true, canPurchase: true, rarity: 3, cost: 100, refund: 10, xp: 50, character: 1, name: "Trophy Bag", type: 4 };
cardData[3][6] = { canDrop: true, canPurchase: true, rarity: 3, cost: 100, refund: 10, xp: 50, character: 1, name: "Biohazard Suit", type: 4 };
cardData[3][7] = { canDrop: true, canPurchase: true, rarity: 4, cost: 100, refund: 10, xp: 50, character: 1, name: "Laced Syringes", type: 4 };
cardData[3][8] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 2, name: "Scope", type: 4 };
cardData[3][9] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 2, name: "Chameleon Suit", type: 4 };
cardData[3][10] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 2, name: "Laser Assisted Aim", type: 4 };
cardData[3][11] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 2, name: "Radioactive Ammo", type: 4 };
cardData[3][12] = { canDrop: true, canPurchase: true, rarity: 3, cost: 100, refund: 10, xp: 50, character: 2, name: "Explosive Shells", type: 4 };
cardData[3][13] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 3, name: "Build-a-Bomb Kit", type: 4 };
cardData[3][14] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 3, name: "Moon Boots", type: 4 };
cardData[3][15] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 3, name: "Rechargable Power Core", type: 4 };
cardData[3][16] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 3, name: "Shorter Fuses", type: 4 };
cardData[3][17] = { canDrop: true, canPurchase: true, rarity: 3, cost: 100, refund: 10, xp: 50, character: 3, name: "Supply Drone", type: 4 };
cardData[3][18] = { canDrop: true, canPurchase: true, rarity: 4, cost: 100, refund: 10, xp: 50, character: 3, name: "Hotwired Gear", type: 4 };
cardData[3][19] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 4, name: "Treble Amplifier", type: 4 };
cardData[3][20] = { canDrop: true, canPurchase: true, rarity: 1, cost: 100, refund: 10, xp: 50, character: 4, name: "Stereo Microphone", type: 4 };
cardData[3][21] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 4, name: "Echo Shielding", type: 4 };
cardData[3][22] = { canDrop: true, canPurchase: true, rarity: 2, cost: 100, refund: 10, xp: 50, character: 4, name: "Microphone Bolas", type: 4 };
cardData[3][23] = { canDrop: true, canPurchase: true, rarity: 3, cost: 100, refund: 10, xp: 50, character: 4, name: "Polysynth Soundtable", type: 4 };
cardData[3][24] = { canDrop: true, canPurchase: true, rarity: 4, cost: 100, refund: 10, xp: 50, character: 4, name: "Equalizer", type: 4 };

//monsters
cardData[4][1] = { canDrop: true, canPurchase: true, rarity: 1, cost: 50, refund: 10, xp: 0, name: "Flit", type: 5 };
cardData[4][2] = { canDrop: true, canPurchase: true, rarity: 1, cost: 50, refund: 10, xp: 0, name: "Scrapper", type: 5 };
cardData[4][3] = { canDrop: true, canPurchase: true, rarity: 2, cost: 50, refund: 10, xp: 0, name: "Scav Party", type: 5 };
cardData[4][4] = { canDrop: true, canPurchase: true, rarity: 2, cost: 50, refund: 10, xp: 0, name: "Crackler", type: 5 };
cardData[4][5] = { canDrop: true, canPurchase: true, rarity: 4, cost: 50, refund: 10, xp: 0, name: "Behemoth", type: 5 };
cardData[4][6] = { canDrop: true, canPurchase: true, rarity: 3, cost: 50, refund: 10, xp: 0, name: "Claw Worm", type: 5 };
cardData[4][7] = { canDrop: true, canPurchase: true, rarity: 3, cost: 50, refund: 10, xp: 0, name: "Booby-Trapped Weather Sensor", type: 5 };
cardData[4][8] = { canDrop: true, canPurchase: true, rarity: 1, cost: 50, refund: 10, xp: 0, name: "Sand Skimmer", type: 5 };
cardData[4][9] = { canDrop: true, canPurchase: true, rarity: 1, cost: 50, refund: 10, xp: 0, name: "Land Mine", type: 5 };
cardData[4][10] = { canDrop: true, canPurchase: true, rarity: 2, cost: 50, refund: 10, xp: 0, name: "Scav Diviner", type: 5 };
cardData[4][11] = { canDrop: true, canPurchase: true, rarity: 3, cost: 50, refund: 10, xp: 0, name: "Camel", type: 5 };
cardData[4][12] = { canDrop: true, canPurchase: true, rarity: 4, cost: 50, refund: 10, xp: 0, name: "Shrapnel Whirlwind", type: 5 };

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
function getCardIDs(type, character, forPurchase, forDrop)
{
	var keys = [];
	for(var card in cardData[type])
	{
		if(forPurchase && !cardData[type][card].canPurchase) { continue; }
		if(forDrop && !cardData[type][card].canDrop) { continue; }
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

function getCost(type, id)
{
  return cardData[type][id].cost;
}

function getRefund(type, id)
{
  return cardData[type][id].refund;
}

function getName(type, id)
{
	return cardData[type][id].name;
}

function getTypeAndId(name)
{
	var ret = {};
	for(var x = 0; x < totalCardsInPool; x++)
	{
		var card = cardData[allTypes[x]][allIds[x]];
		if(card.name == name)
		{
			ret.type = allTypes[x];
			ret.id = allIds[x];
			break;
		}
	}

	return ret;
}

function getCardByName(name)
{
	for(var x = 0; x < totalCardsInPool; x++)
	{
		var card = cardData[allTypes[x]][allIds[x]];
		if(card.name == name)
		{
			return card;
		}
	}
}

// populate the card settings tab using cardData so that i only have to put new cards in one spot
// also so i don't have to type so damn much
function populateCardSettings()
{
	var abilityRow = document.getElementById("cardSettingsAbilityRow");
	var blueprintRow = document.getElementById("cardSettingsBlueprintRow");
	var augmentRow = document.getElementById("cardSettingsAugmentRow");
	var monsterRow = document.getElementById("cardSettingsMonsterRow");

	while(abilityRow.hasChildNodes()) { abilityRow.removeChild(abilityRow.lastChild); }
	while(blueprintRow.hasChildNodes()) { blueprintRow.removeChild(blueprintRow.lastChild); }
	while(augmentRow.hasChildNodes()) { augmentRow.removeChild(augmentRow.lastChild); }
	while(monsterRow.hasChildNodes()) { monsterRow.removeChild(monsterRow.lastChild); }

	for(var x = 0; x < totalCardsInPool; x++)
	{
		var id = allIds[x];
		var type = allTypes[x];

		var newRow;
		if(type == 1) // ability
		{
			newRow = abilityRow.insertRow();
		}

		if(type == 2)
		{
			newRow = augmentRow.insertRow();
		}

		if(type == 3) // blueprint
		{
			newRow = blueprintRow.insertRow();
		}

		if(type == 4)
		{
			newRow = monsterRow.insertRow();
		}

		var newCell = newRow.insertCell(0);
		var nameText = document.createTextNode(cardData[type][id].name);
		newCell.appendChild(nameText);

		var newInput = document.createElement("input");
		newInput.setAttribute("type", "text");
		newInput.setAttribute("id", "cardCost" + (x+1));
		newInput.value = cardData[type][id].cost;
		newCell = newRow.insertCell(1);
		newCell.appendChild(newInput);

		newInput = document.createElement("input");
		newInput.setAttribute("type", "text");
		newInput.setAttribute("id", "cardRefund" + (x+1));
		newInput.value = cardData[type][id].refund;
		newCell = newRow.insertCell(2);
		newCell.appendChild(newInput);

		newInput = document.createElement("input");
		newInput.setAttribute("type", "text");
		newInput.setAttribute("id", "cardXP" + (x+1));
		newInput.value = cardData[type][id].xp;
		newCell = newRow.insertCell(3);
		newCell.appendChild(newInput);

		newInput = document.createElement("select");
		newInput.setAttribute("id", "cardRarity" + (x+1));
		// this is a pain but we have to add all the options to every select box. womp womp
		var optCommon = document.createElement("option");
		optCommon.value = 1;
		optCommon.appendChild(document.createTextNode("Common"));
		newInput.appendChild(optCommon);
		var optUncommon = document.createElement("option");
		optUncommon.value = 2;
		optUncommon.appendChild(document.createTextNode("Uncommon"));
		newInput.appendChild(optUncommon);
		var optRare = document.createElement("option");
		optRare.value = 3;
		optRare.appendChild(document.createTextNode("Rare"));
		newInput.appendChild(optRare);
		var optLegendary = document.createElement("option");
		optLegendary.value = 4;
		optLegendary.appendChild(document.createTextNode("Legendary"));
		newInput.appendChild(optLegendary);

		newInput.value = cardData[type][id].rarity;
		newCell = newRow.insertCell(4);
		newCell.appendChild(newInput);

		// checkboxes for can purchase / can drop
		newInput = document.createElement("input");
		newInput.setAttribute("type", "checkbox");
		newInput.setAttribute("id", "cardCanPurchase" + (x+1));
		newInput.checked = cardData[type][id].canPurchase;
		newCell = newRow.insertCell(5);
		newCell.appendChild(newInput);

		newInput = document.createElement("input");
		newInput.setAttribute("type", "checkbox");
		newInput.setAttribute("id", "cardCanDrop" + (x+1));
		newInput.checked = cardData[type][id].canDrop;
		newCell = newRow.insertCell(6);
		newCell.appendChild(newInput);
	}
}

function resetSettings()
{
	window.localStorage.setItem('fromRustDevSettings', '');
	window.localStorage.setItem('fromRustDevCollection', '');
}