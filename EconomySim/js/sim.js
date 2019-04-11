// setting up global vars

// settings - sim globals
var numSims = 10000;
var missionSuccessPercent = 50;
var desiredCard = 0;

// settings - behavior
var sellCards = false;
var onlySellDuplicates = false;
var desiredCardType = 0;

// settings - card costs
var characterCardCost = 2000;
var abilityCardCost = 500;
var augmentCardCost = 100;
var blueprintCardCost = 500;
var monsterCardCost = 250;

// settings - refunds
var characterCardRefund = 200;
var abilityCardRefund = 100;
var augmentCardRefund = 10;
var blueprintCardRefund = 100;
var monsterCardRefund = 25;

// settings - reward data
var numCardsOnMissionSuccess = 1;
var missionSuccessCrowns = 0;
var missionFailureCrowns = 0;

// settings - xp data
var abilityCardXP = 0;
var augmentCardXP = 0;
var blueprintCardXP = 0;
var xpPerLevel = 0;

// sim results data
var totalMissions = 0;
var totalMissionsWon = 0;
var totalArray = [];
var totalCrowns = 0;

// card collection data
// structure: {id: {numOwned}}
var cardCollection = {};

// card data
// structure: {id (XYZ): { name: "xyz", type: XYZ }}
var cardData = {};

// characters
cardData[1] = { name: "Lucky Jack", type: 1 };
cardData[2] = { name: "Buster", type: 1 };
cardData[3] = { name: "Andrea", type: 1 };
cardData[4] = { name: "Lena", type: 1 };

//abilities
cardData[5] = { name: "Brace for Impact", type: 2 };
cardData[6] = { name: "Ready for Round 2", type: 2 };
cardData[7] = { name: "Adrenaline Surge", type: 2 };
cardData[8] = { name: "Patch Yourself Up", type: 2 };
cardData[9] = { name: "Fight Through the Pain", type: 2 };
cardData[10] = { name: "Blaze of Glory", type: 2 };
cardData[11] = { name: "Called Shot", type: 2 };
cardData[12] = { name: "Overwatch", type: 2 };
cardData[13] = { name: "The Long Watch", type: 2 };
cardData[14] = { name: "Draw a Bead", type: 2 };
cardData[15] = { name: "Know Your Enemy", type: 2 };
cardData[16] = { name: "Saw You Coming", type: 2 };
cardData[17] = { name: "Scout Ahead", type: 2 };
cardData[18] = { name: "Animate Scrap", type: 2 };
cardData[19] = { name: "Jerry-Rig", type: 2 };
cardData[20] = { name: "We Have the Technology", type: 2 };
cardData[21] = { name: "Resourceful", type: 2 };
cardData[22] = { name: "Backup Singer", type: 2 };
cardData[23] = { name: "Tempo Shift", type: 2 };
cardData[24] = { name: "Up to Eleven", type: 2 };
cardData[25] = { name: "Soothing Melody", type: 2 };
cardData[26] = { name: "Presto", type: 2 };
cardData[27] = { name: "On a Loop", type: 2 };

//augments
cardData[28] = { name: "+1 CP", type: 3 };
cardData[29] = { name: "+2 CP", type: 3 };
cardData[30] = { name: "+1 EP", type: 3 };
cardData[31] = { name: "+2 EP", type: 3 };

//blueprints
cardData[32] = { name: "Magnetic Coils", type: 4 };
cardData[33] = { name: "Legs-O-Skeleton", type: 4 };
cardData[34] = { name: "Homebrew Stims", type: 4 };
cardData[35] = { name: "Auto-Injector", type: 4 };
cardData[36] = { name: "Trophy Bag", type: 4 };
cardData[37] = { name: "Biohazard Suit", type: 4 };
cardData[38] = { name: "Laced Syringes", type: 4 };
cardData[39] = { name: "Scope", type: 4 };
cardData[40] = { name: "Chameleon Suit", type: 4 };
cardData[41] = { name: "Laser Assisted Aim", type: 4 };
cardData[42] = { name: "Radioactive Ammo", type: 4 };
cardData[43] = { name: "Explosive Shells", type: 4 };
cardData[44] = { name: "Build-a-Bomb Kit", type: 4 };
cardData[45] = { name: "Moon Boots", type: 4 };
cardData[46] = { name: "Rechargable Power Core", type: 4 };
cardData[47] = { name: "Shorter Fuses", type: 4 };
cardData[48] = { name: "Supply Drone", type: 4 };
cardData[49] = { name: "Hotwired Gear", type: 4 };
cardData[50] = { name: "Treble Amplifier", type: 4 };
cardData[51] = { name: "Stereo Microphone", type: 4 };
cardData[52] = { name: "Echo Shielding", type: 4 };
cardData[53] = { name: "Microphone Bolas", type: 4 };
cardData[54] = { name: "Polysynth Soundtable", type: 4 };
cardData[55] = { name: "Equalizer", type: 4 };
cardData[56] = { name: "Canteen", type: 4 };
cardData[57] = { name: "Plate Armor", type: 4 };
cardData[58] = { name: "Makeshift Weapon", type: 4 };
cardData[59] = { name: "Treads", type: 4 };
cardData[60] = { name: "Large Rock", type: 4 };

//monsters
//TBD - don't need these yet
cardData[61] = { name: "TestMonsterCard", type: 5 };
cardData[62] = { name: "TestMonsterCard", type: 5 };
cardData[63] = { name: "TestMonsterCard", type: 5 };
cardData[64] = { name: "TestMonsterCard", type: 5 };
cardData[65] = { name: "TestMonsterCard", type: 5 };

// helper functions to grab costs and such
function getCost(type)
{
  if(type == 1)
  {
    return characterCardCost;
  }

  if(type == 2)
  {
    return abilityCardCost;
  }

  if(type == 3)
  {
    return augmentCardCost;
  }

  if(type == 4)
  {
    return blueprintCardCost;
  }

  if(type == 5)
  {
    return monsterCardCost;
  }

  return -1;
}

function getRefund(type)
{
  if(type == 1)
  {
    return characterCardRefund;
  }

  if(type == 2)
  {
    return abilityCardRefund;
  }

  if(type == 3)
  {
    return augmentCardRefund;
  }

  if(type == 4)
  {
    return blueprintCardRefund;
  }

  if(type == 5)
  {
    return monsterCardRefund;
  }

  return -1;
}

function getFormValue(id) {
  return parseInt((document.getElementById(id)).value);
}

function getNumCardsOwned(cardId) {
  if(cardCollection[cardId] != null)
  {
    return cardCollection[cardId].numOwned;
  }

  return 0;
}

function getIdsForType(type) {
  if(type < 1 || type > 5) {
    return null;
  }

  //todo: refactor this because holy fuck is it slowwwww
  var ids = [];
  for(var x = 1; x < Object.keys(cardData).length; x++)
  {
    if(cardData[x].type == type)
    {
      ids.push(x);
    }
  }

  return ids;
}

function gatherData() {
  missionSuccessPercent = getFormValue("missionSuccessPercent");

  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");
  missionSuccessCrowns = getFormValue("missionSuccessCrowns");
  missionFailureCrowns = getFormValue("missionFailureCrowns");

  sellCards = document.getElementById("sellCards").checked;
  onlySellDuplicates = document.getElementById("onlySellDuplicates").checked;
  desiredCardType = document.querySelector('input[name="desiredCardType"]:checked').value;

  characterCardCost = getFormValue("characterCardCost");
  characterCardRefund = getFormValue("characterCardRefund");
  abilityCardCost = getFormValue("abilityCardCost");
  abilityCardRefund = getFormValue("abilityCardRefund");
  augmentCardCost = getFormValue("augmentCardCost");
  augmentCardRefund = getFormValue("augmentCardRefund");
  blueprintCardCost = getFormValue("blueprintCardCost");
  blueprintCardRefund = getFormValue("blueprintCardRefund");
  monsterCardCost = getFormValue("monsterCardCost");
  monsterCardRefund = getFormValue("monsterCardRefund");

  abilityCardXP = getFormValue("abilityCardXP");
  augmentCardXP = getFormValue("augmentCardXP");
  blueprintCardXP = getFormValue("blueprintCardXP");
  xpPerLevel = getFormValue("xpPerLevel");
}

function runSims() {
  totalArray = [];

  // gather data from form
  gatherData();

  for(var s = 0; s < numSims; s++)
  {
    // for each sim, we...
    // reset values
    var safetyCheck = 10000; // we dont do more than this many runs
    var stopCondition = false;

    totalMissions = 0;
    totalMissionsWon = 0;
    totalCrowns = 0;
    cardCollection = {};

    // decide which card we want
    desiredCard = selectCardId(desiredCardType);

    // run the missions
    for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
    {
      stopCondition = runSingleSim();
      // if we didn't get the card we want, let's see if we can buy it here
      if(!stopCondition)
      {
        if(totalCrowns >= getCost(cardData[desiredCard].type))
        {
          // we can! we are done
          stopCondition = true;
        }
      }
    }

    var innerHTMLString = "";
    if(stopCondition)
    {
      // we hit our actual condition instead of a safety check, so
      // count this sim
      // not sure what to do with safety check sims but we'll figure that out later
      totalArray.push(totalMissions);
    }
    else
    {
      totalArray.push(safetyCheck);
    }
  }

  // display results
  displayResults();
}

function displayResults()
{
  var innerHTMLString = "";
  innerHTMLString += "Average missions to get 1 specific card: " + getAvgMissions() + "<br />";
  document.getElementById("result").innerHTML = innerHTMLString;
}

function getAvgMissions()
{
  var total = 0;
  for(var x = 0; x < totalArray.length; x++)
  {
    total += totalArray[x];
  }

  total /= numSims;
  return total;
}

function getCardCollectionString()
{
  var string = "";
  for(var x = 1; x < Object.keys(cardData).length; x++)
  {
    var numCards = getNumCardsOwned(x);
    if(numCards > 0)
    {
      string += "" + x + ": " + numCards + "<br />";
    }
  }

  return string;
}

function runSingleSim() {  
  // was the mission a success?
  if(runMission())
  {
    // it was! give 'em a card
    totalMissionsWon++;
    // and some crowns!
    totalCrowns += missionSuccessCrowns;
    for(var x = 0; x < numCardsOnMissionSuccess; x++)
    {
      getCard(selectCardId(0));
    }
  }
  else
  {
    // give 'em crowns on failure
    totalCrowns += missionFailureCrowns;
  }

  // see if we're good to go
  if(checkStopCondition()) { return true; }

  // if we aren't, try selling cards!
  if(sellCards)
  {
    trySellCards();
  }

  return checkStopCondition();
}

function checkStopCondition()
{
  return (getNumCardsOwned(desiredCard) > 0);
}

function runMission()
{
  totalMissions++;
  return (Math.floor(Math.random() * 101) <= missionSuccessPercent);
}

function selectCardId(type)
{
  if(type >= 1 && type <= 5)
  {
    var ids = getIdsForType(type);
    return ids[Math.floor(Math.random() * ids.length)];
  }

  return Math.floor((Math.random() * Object.keys(cardData).length) + 1);
}

function getCard(cardId)
{
  if(cardCollection[cardId] == null)
  {
    cardCollection[cardId] = {};
    cardCollection[cardId].numOwned = 1;
  }
  else
  {
    cardCollection[cardId].numOwned++;
  }
}

function trySellCards()
{
  var keys = Object.keys(cardCollection);
  for(var x = 0; x < keys; x++)
  {
    var key = keys[x];
    var numCards = getNumCardsOwned(key);
    if(onlySellDuplicates && numCards > 1)
    {
      cardCollection[key].numOwned--;
      totalCrowns += getRefund(cardData[key].type);
      return;
    }

    if(!onlySellDuplicates && numCards >= 1)
    {
      cardCollection[key].numOwned--;
      if(numCards == 1) { delete cardCollection[key]; }
      totalCrowns += getRefund(cardData[key].type);
    }
  }
}