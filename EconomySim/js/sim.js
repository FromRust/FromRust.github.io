// setting up global vars

// settings - leveling settings
var xpForFirstLevel = 400;
var levelExponent = 1;
var numPlayers = 1;
var xpForSuccess = 100;
var xpForFailure = 10;
var actualNumPlayers = 1; // we have to convert from the form value to the usable value

// settings - sim globals
var numSims = 10000;
var missionSuccessPercent = 50;

// settings - behavior
var sellCards = false;
var buyCards = false;
var onlySellDuplicates = false;
var desiredCardType = 0;
var desiredTarget = 0;
var desiredLevelingCharacter = 1; // defaults to lucky jack

// settings - reward data
var numCardsOnMissionSuccess = 1;
var missionSuccessCrowns = 0;
var missionFailureCrowns = 0;

// settings - drop rate data
var dropRateNormal = 0;
var dropRateUncommon = 0;
var dropRateRare = 0;
var dropRateLegendary = 0;
var dropRateAbility = 0;
var dropRateBlueprint = 0;
var dropRateAugment = 0;
var dropRateMonster = 0;

// drop rate forms for recalculation
var formDropRateNormal = Object;
var formDropRateUncommon = Object;
var formDropRateRare = Object;
var formDropRateLegendary = Object;
var formDropRateAbility = Object;
var formDropRateBlueprint = Object;
var formDropRateAugment = Object;
var formDropRateMonster = Object;
var formDropRateTotal = Object;
var formDropRateCategoryTotal = Object;

// drop rate tables for actual usage
var dropRateTierTable = [];
var dropRateCategoryTable = [];

// sim results data
var totalMissions = 0;
var totalMissionsWon = 0;
var totalArray = {};
var totalCrowns = 0;
var totalXP = 0;

// aggregates for convenient lookup later
var lowestCost = [99999, 99999, 99999, 99999, 99999]; // one for every type

// card collection data
// structure: {type: {id: {numOwned = 5} }}
// e.g. {1: {2: {numOwned = 1}, 3: {numOwned = 4}, etc} }}
var cardCollection = {};

// character collection data
// for now this is just an array of XPs
// 1 = LJ, 2 = Buster, 3 = Andrea, 4 = Lena
var characterCollection = [0, 0, 0, 0, 0];

// for sims, what card we try to target at any given time
// sometimes this is random, sometimes it's specific, like when we're
// going for level ups
var desiredCard = {type: 0, id: 0};

function getFormValue(id) {
  return parseInt((document.getElementById(id)).value);
}

function getFormValueFloat(id) {
  return parseFloat((document.getElementById(id)).value);
}

function gatherData() {
  xpForFirstLevel = getFormValue("xpForFirstLevel");
  levelExponent = getFormValueFloat("levelExponent");
  numPlayers = document.querySelector('input[name="numPlayers"]:checked').value;
  xpForSuccess = getFormValue("xpForSuccess");
  xpForFailure = getFormValue("xpForFailure");

  missionSuccessPercent = getFormValue("missionSuccessPercent");

  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");
  missionSuccessCrowns = getFormValue("missionSuccessCrowns");
  missionFailureCrowns = getFormValue("missionFailureCrowns");

  sellCards = document.getElementById("sellCards").checked;
  buyCards = document.getElementById("buyCards").checked;
  onlySellDuplicates = document.getElementById("onlySellDuplicates").checked;
  desiredCardType = document.querySelector('input[name="desiredCardType"]:checked').value;
  desiredTarget = document.querySelector('input[name="desiredTarget"]:checked').value;

  dropRateNormal = getFormValue("dropRateSettingsNormal");
  dropRateUncommon = getFormValue("dropRateSettingsUncommon");
  dropRateRare = getFormValue("dropRateSettingsRare");
  dropRateLegendary = getFormValue("dropRateSettingsLegendary");
  dropRateAbility = getFormValue("dropRateSettingsAbility");
  dropRateBlueprint = getFormValue("dropRateSettingsBlueprint");
  dropRateAugment = getFormValue("dropRateSettingsAugment");
  dropRateMonster = getFormValue("dropRateSettingsMonster");

  // cost and XP here we go
  for(var x = 0; x < totalCardsInPool; x++)
  {
    var type = allTypes[x];
    var id = allIds[x];

    cardData[type][id].cost = getFormValue("cardCost" + (x+1));
    cardData[type][id].refund = getFormValue("cardRefund" + (x+1));
    cardData[type][id].xp = getFormValue("cardXP" + (x+1));
    cardData[type][id].canPurchase = document.getElementById("cardCanPurchase" + (x+1)).checked;
    cardData[type][id].canDrop = document.getElementById("cardCanDrop" + (x+1)).checked;

    var rElement = document.getElementById("cardRarity" + (x+1));
    cardData[type][id].rarity = rElement.options[rElement.selectedIndex].value;

    if(cardData[type][id].cost < lowestCost[type])
    {
      lowestCost[type] = cardData[type][id];
    }
  }

  // save data to local storage
  saveData();
}

function saveData()
{
  resetSettings();

  window.localStorage.setItem('fromRustDevCollection', JSON.stringify(cardData));

  var settingsObj = {};
  settingsObj["xpForFirstLevel"] = xpForFirstLevel;
  settingsObj["levelExponent"] = levelExponent;
  settingsObj["numPlayers"] = numPlayers;
  settingsObj["xpForSuccess"] = xpForSuccess;
  settingsObj["xpForFailure"] = xpForFailure;

  settingsObj["missionSuccessPercent"] = missionSuccessPercent;
  settingsObj["numCardsOnMissionSuccess"] = numCardsOnMissionSuccess;
  settingsObj["missionSuccessCrowns"] = missionSuccessCrowns;
  settingsObj["missionFailureCrowns"] = missionFailureCrowns;
  settingsObj["sellCards"] = sellCards;
  settingsObj["buyCards"] = buyCards;
  settingsObj["onlySellDuplicates"] = onlySellDuplicates;
  settingsObj["desiredCardType"] = desiredCardType;
  settingsObj["desiredTarget"] = desiredTarget;

  settingsObj["dropRateNormal"] = dropRateNormal;
  settingsObj["dropRateUncommon"] = dropRateUncommon;
  settingsObj["dropRateRare"] = dropRateRare;
  settingsObj["dropRateLegendary"] = dropRateLegendary;
  settingsObj["dropRateAbility"] = dropRateAbility;
  settingsObj["dropRateBlueprint"] = dropRateBlueprint;
  settingsObj["dropRateAugment"] = dropRateAugment;
  settingsObj["dropRateMonster"] = dropRateMonster;

  window.localStorage.setItem('fromRustDevSettings', JSON.stringify(settingsObj));
  window.localStorage.setItem('fromRustDevVersion', version);
}

function prepDropRateTables()
{
  dropRateTierTable = [];
  dropRateCategoryTable = [];

  for(var r = 0; r < dropRateNormal; r++)
  {
    dropRateTierTable.push(1);
  }

  for(var r = 0; r < dropRateUncommon; r++)
  {
    dropRateTierTable.push(2);
  }

  for(var r = 0; r < dropRateRare; r++)
  {
    dropRateTierTable.push(3);
  }

  for(var r = 0; r < dropRateLegendary; r++)
  {
    dropRateTierTable.push(4);
  }

  for(var r = 0; r < dropRateAbility; r++)
  {
    dropRateCategoryTable.push(1);
  }

  for(var r = 0; r < dropRateAugment; r++)
  {
    dropRateCategoryTable.push(2);
  }

  for(var r = 0; r < dropRateBlueprint; r++)
  {
    dropRateCategoryTable.push(3);
  }

  for(var r = 0; r < dropRateMonster; r++)
  {
    dropRateCategoryTable.push(4);
  }
}

function runSims() {
  // gather data from form
  gatherData();

  if(numPlayers == 0) { actualNumPlayers = 1; }
  if(numPlayers == 1) { actualNumPlayers = 2; }
  if(numPlayers == 2) { actualNumPlayers = 4; }

  // prep total array var depending on sim type
  totalArray = [];
  if(desiredTarget == 2)
  {
    totalArray = {}; // need to use a map instead
  }

  // prep drop rate tables
  prepDropRateTables();

  // if we're just doing a drop rate sim, let's do that here instead of
  // doing the normal sim loop
  if(desiredTarget == 2)
  {
    performDropRateSims();
  }
  else
  {
    if(desiredTarget == 1) { numSims = 1; } // only need to run the gauntlet once for the leveling simulator
    for(var s = 0; s < numSims; s++)
    {
      // for each sim, we...
      // reset values
      var safetyCheck = 10000; // we dont do more than this many iterations per sim
      var stopCondition = false;

      totalMissions = 0;
      totalMissionsWon = 0;
      totalCrowns = 0;
      totalXP = 0;
      resetCardCollection();

      // decide which card we want
      desiredCard = selectRandomCard(desiredCardType);
      // for safety, make sure we can't choose a card we can't actually attain
      // jesus christ this logic is gnarly, but it's basically saying:
      // you can't buy cards and the card isn't droppable, OR
      // the card can't be bought or dropped
      if(((!buyCards && !cardData[desiredCard.type][desiredCard.id].canDrop)) || (!cardData[desiredCard.type][desiredCard.id].canPurchase && !cardData[desiredCard.type][desiredCard.id].canDrop))
      {
        var safetyChooseCheck = 10000;
        var foundGoodCard = false;
        while(!foundGoodCard && safetyChooseCheck > 0)
        {
          safetyChooseCheck--;
          desiredCard = selectRandomCard(desiredCardType);
          foundGoodCard = !(((!buyCards && !cardData[desiredCard.type][desiredCard.id].canDrop)) || (!cardData[desiredCard.type][desiredCard.id].canPurchase && !cardData[desiredCard.type][desiredCard.id].canDrop));
        }

        if(safetyChooseCheck <= 0)
        {
          console.log("ERROR: Couldn't find a valid card to target. This means that in 10,000 iterations, we couldn't find a card that was either droppable or purchasable. Check your settings.");
          break;
        }
      }

      //desiredLevelingCharacter = selectRandomCharacter();

      // run the missions
      for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
      {
        stopCondition = runSingleSim();
        // if we didn't get the card we want, let's see if we can buy it here
        if(!stopCondition)
        {
          if(buyCards && desiredTarget == 0 && totalCrowns >= getCost(desiredCard.type, desiredCard.id))
          {
            // we can! we are done
            stopCondition = true;
          }

          // for the leveling sim, check to see if this mission put us over a level threshold
          // if it did, we record the # missions that took us there
          if(desiredTarget == 1)
          {
            var currentLevel = totalArray.length;
            var xpNeeded = calculateXPRequiredForLevel(currentLevel + 1);
            if(totalXP >= xpNeeded)
            {
              totalArray.push(totalMissions);
            }

            stopCondition = checkStopCondition();
          }
        }
      }

      var innerHTMLString = "";
      if(stopCondition)
      {
        // we hit our actual condition instead of a safety check, so
        // count this sim
        // not sure what to do with safety check sims but we'll figure that out later
        if(desiredTarget == 0)
        {
          totalArray.push(totalMissions);
        }
        /*else
        {
          totalArray[desiredLevelingCharacter].push(totalMissions);
        }*/
      }
      else
      {
        if(desiredTarget == 0)
        {
          totalArray.push(safetyCheck);
        }
        /*else
        {
          totalArray[desiredLevelingCharacter].push(safetyCheck);
        }*/
      }
    }
  }

  // display results
  displayResults();
}

function resetCardCollection()
{
  cardCollection = {};
  for(var x = 1; x < Object.keys(cardData).length; x++)
  {
    cardCollection[x] = {};
  }

  characterCollection = [0, 0, 0, 0, 0];
}

function displayResults()
{
  var innerHTMLString = "Sim goal: ";
  if(desiredTarget == 0)
  {
    innerHTMLString += "Obtain a specific card.<br />";
  }
  else if(desiredTarget == 1)
  {
    innerHTMLString += "Level as high as possible.<br />";
  }
  else if(desiredTarget == 2)
  {
    innerHTMLString += "Drop Rate Simulation.<br />";
  }

  if(desiredTarget == 2)
  {
    var rawCardCollectionString = "";

    var rarityTotals = [0, 0, 0, 0, 0];
    var categoryTotals = [0, 0, 0, 0, 0];

    for(var cardName of Object.keys(totalArray))
    {
      var card = getCardByName(cardName);
      rarityTotals[card.rarity] += totalArray[cardName];
      categoryTotals[card.type - 1] += totalArray[cardName]; // TODO: that -1 is garbage and it's because of the old character card cruft.

      rawCardCollectionString += card.name + ": " + totalArray[card.name] + "<br />";
    }

    innerHTMLString += "TOTALS || AVERAGES <br />";
    innerHTMLString += "-- Normal: " + rarityTotals[1] + " || " + (rarityTotals[1] / numSims * 100) +  "% <br />";
    innerHTMLString += "-- Uncommon: " + rarityTotals[2] + " || " + (rarityTotals[2] / numSims * 100) + "% <br />";
    innerHTMLString += "-- Rare: " + rarityTotals[3] + " || " + (rarityTotals[3] / numSims * 100) + "% <br />";
    innerHTMLString += "-- Legendary: " + rarityTotals[4] + " || " + (rarityTotals[4] / numSims * 100) + "% <br />";
    innerHTMLString += "***" + "<br />";
    innerHTMLString += "-- Ability: " + categoryTotals[1] + " || " + (categoryTotals[1] / numSims * 100) + "% <br />";
    innerHTMLString += "-- Augment: " + categoryTotals[2] + " || " + (categoryTotals[2] / numSims * 100) + "% <br />";
    innerHTMLString += "-- Blueprint: " + categoryTotals[3] + " || " + (categoryTotals[3] / numSims * 100) + "% <br />";
    innerHTMLString += "-- Monster: " + categoryTotals[4] + " || " + (categoryTotals[4] / numSims * 100) + "% <br />";
    innerHTMLString += "<br />";
    innerHTMLString += "RAW COLLECTION DUMP: <br />";
    innerHTMLString += rawCardCollectionString;
  }
  else if(desiredTarget == 1)
  {
    innerHTMLString += "Missions to hit level thresholds: <br />";
    for(var x = 0; x < totalArray.length; x++)
    {
      innerHTMLString += (x + 1) + ": " + totalArray[x] + "<br />";
    }
  }
  else {
    innerHTMLString += "Average missions ran: " + getAvgMissions() + "<br />";
    innerHTMLString += "-- SAMPLE DATA (FINAL ITERATION) -- <br />";
    if(desiredTarget == 0)
    {
      innerHTMLString += "Desired card: " + getName(desiredCard.type, desiredCard.id) + "<br />";
    }

    innerHTMLString += "Total crowns: " + totalCrowns + "<br />";

    innerHTMLString += "Card collection: <br />";
    for(var type of Object.keys(cardCollection))
    {
      for(var id of Object.keys(cardCollection[type]))
      {
        innerHTMLString += getName(type, id) + ": " + cardCollection[type][id].numOwned + " || ";
      }
    }
  }

  document.getElementById("result").innerHTML = innerHTMLString;

  document.getElementById("resultsTab").click();
}

function getAvgMissions()
{
  if(desiredTarget == 0)
  {
    var total = 0;
    for(var x = 0; x < totalArray.length; x++)
    {
      total += totalArray[x];
    }

    total /= numSims;
    return total;
  }
  else
  {
    var totalString = "<br />";
    for(var character of Object.keys(totalArray))
    {
      if(character == 1) { totalString += "LUCKY JACK: "; }
      else if(character == 2) { totalString += "BUSTER: "; }
      else if(character == 3) { totalString += "ANDREA: "; }
      else if(character == 4) { totalString += "LENA: "; }

      var total = 0;
      for(var y = 0; y < totalArray[character].length; y++)
      {
        total += totalArray[character][y];
      }

      total /= numSims;

      totalString += total + "<br />";
    }

    return totalString;
  }
  
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
      var card = dropCard();
      var hackyTmpCrap = getTypeAndId(card.name);
      getCard(hackyTmpCrap.type, hackyTmpCrap.id);
    }

    // also add some xp
    totalXP += ((xpForSuccess / 4) * actualNumPlayers);
  }
  else
  {
    // give 'em crowns on failure
    totalCrowns += missionFailureCrowns;
    totalXP += ((xpForFailure / 4) * actualNumPlayers);
  }

  // see if we're good to go
  if(checkStopCondition()) { return true; }

  // if we aren't, try selling cards!
  if(desiredTarget == 0 && sellCards)
  {
    trySellCards();
  }

  return checkStopCondition();
}

function checkStopCondition()
{
  if(desiredTarget == 0)
  {
    if(cardCollection[desiredCard.type] == null) { return false; }
    if(cardCollection[desiredCard.type][desiredCard.id] == null) { return false; }
    return (cardCollection[desiredCard.type][desiredCard.id].numOwned > 0);
  }

  /*if(desiredTarget == 1)
  {
    return calculateLevel(desiredLevelingCharacter) >= 1;
  }*/
  
  return false;
}

/*function calculateLevel(champion)
{
  return characterCollection[champion] / xpPerLevel;
}*/

function calculateXPRequiredForLevel(level)
{
  return Math.floor(xpForFirstLevel * Math.pow(level, levelExponent));
}

function runMission()
{
  totalMissions++;
  return (Math.floor(Math.random() * 101) <= missionSuccessPercent);
}

function calculateDropRates()
{
  // the following rules apply:
  // - must add up to 100.0
  // - prioritize in backwards order, so if more than two need adjustment,
  //   the higher rarity wins.
  // let's start w/ the first category and see how it goes
  var drValNormal = parseInt(formDropRateNormal.value);
  var drValUncommon = parseInt(formDropRateUncommon.value);
  var drValRare = parseInt(formDropRateRare.value);
  var drValLegendary = parseInt(formDropRateLegendary.value);
  var drValTotal = drValNormal + drValUncommon + drValRare + drValLegendary;

  if(drValTotal > 100)
  {
    if(drValLegendary >= 100)
    {
      drValLegendary = 100;
      drValNormal = 0;
      drValUncommon = 0;
      drValRare = 0;
    }

    if(drValRare >= 100)
    {
      drValRare = 100;
      drValLegendary = 0;
      drValUncommon = 0;
      drValNormal = 0;
    }

    if(drValUncommon >= 100)
    {
      drValUncommon = 100;
      drValLegendary = 0;
      drValRare = 0;
      drValNormal = 0;
    }

    if(drValNormal >= 100)
    {
      drValNormal = 100;
      drValLegendary = 0;
      drValRare = 0;
      drValUncommon = 0;
    }

    // it's not, so we have to normalize. we do this by taking out of the
    // least category possible until we are done normalizing
    // recalc for safety
    drValTotal = drValNormal + drValUncommon + drValRare + drValLegendary;
    var diff = drValTotal - 100;
    while(diff > 0)
    {
      if(drValNormal > 0) { drValNormal--; }
      else if(drValUncommon > 0) { drValUncommon--; }
      else if(drValRare > 0) { drValRare--; }
      else if(drValLegendary > 0) { drValLegendary--; }
      diff--;
    }
  }

  formDropRateNormal.value = drValNormal;
  formDropRateUncommon.value = drValUncommon;
  formDropRateRare.value = drValRare;
  formDropRateLegendary.value = drValLegendary;
  drValTotal = drValNormal + drValUncommon + drValRare + drValLegendary;
  formDropRateTotal.value = drValTotal;

  // now do it all again for the card categories!
  var drValAbility = parseInt(formDropRateAbility.value);
  var drValBlueprint = parseInt(formDropRateBlueprint.value);
  var drValAugment = parseInt(formDropRateAugment.value);
  var drValMonster = parseInt(formDropRateMonster.value);
  var drcValTotal = drValAbility + drValBlueprint + drValAugment + drValMonster;

  if(drcValTotal > 100)
  {
    if(drValMonster >= 100)
    {
      drValMonster = 100;
      drValAbility = 0;
      drValBlueprint = 0;
      drValAugment = 0;
    }

    if(drValAugment >= 100)
    {
      drValAugment = 100;
      drValMonster = 0;
      drValBlueprint = 0;
      drValAbility = 0;
    }

    if(drValBlueprint >= 100)
    {
      drValBlueprint = 100;
      drValMonster = 0;
      drValAugment = 0;
      drValAbility = 0;
    }

    if(drValAbility >= 100)
    {
      drValAbility = 100;
      drValMonster = 0;
      drValAugment = 0;
      drValBlueprint = 0;
    }

    // it's not, so we have to normalize. we do this by taking out of the
    // least category possible until we are done normalizing
    // recalc for safety
    drcValTotal = drValAbility + drValBlueprint + drValAugment + drValMonster;
    diff = drcValTotal - 100;
    while(diff > 0)
    {
      if(drValAbility > 0) { drValAbility--; }
      else if(drValBlueprint > 0) { drValBlueprint--; }
      else if(drValAugment > 0) { drValAugment--; }
      else if(drValMonster > 0) { drValMonster--; }
      diff--;
    }
  }

  formDropRateAbility.value = drValAbility;
  formDropRateBlueprint.value = drValBlueprint;
  formDropRateAugment.value = drValAugment;
  formDropRateMonster.value = drValMonster;
  drcValTotal = drValAbility + drValBlueprint + drValAugment + drValMonster;
  formDropRateCategoryTotal.value = drcValTotal;
}

function performDropRateSims()
{
  for(var s = 0; s < numSims; s++)
  {
    var card = dropCard();

    // and add it to the totals object, or increment it if it exists
    if(totalArray[card.name] != null)
    {
      totalArray[card.name]++;
    }
    else
    {
      totalArray[card.name] = 1;
    }
  }
}

function selectRandomCard(type)
{
  var card = {};
  if(type == 0)
  {
    var index = Math.floor((Math.random() * allIds.length));
    card.type = allTypes[index];
    card.id = allIds[index];
  }
  else
  {
    card.type = type;
    var keys = Object.keys(cardData[type]);
    var index = Math.floor(Math.random() * keys.length);
    card.id = keys[index];
  }

  return card;
}

function selectRandomCharacter()
{
  return Math.floor(Math.random() * characterList.length) + 1;
}

function dropCard()
{
  var index = Math.floor(Math.random() * 100);
  var rarity = dropRateTierTable[index];

  index = Math.floor(Math.random() * 100);
  var category = dropRateCategoryTable[index];

  // now, get all cards of this type and rarity
  var simCardArray = [];
  for(var card of Object.values(cardData[category]))
  {
    if((card.rarity == rarity) && card.canDrop)
    {
      simCardArray.push(card);
    }
  }

  if(simCardArray.length == 0)
  {
    // whoops. we picked a bad category or rarity. let's forget rarity
    for(var card of Object.values(cardData[category]))
    {
      if(card.canDrop)
      {
        simCardArray.push(card);
      }
    }

    if(simCardArray == 0)
    {
      // ok, literally no cards in this category are droppable. this is a bad state we're in,
      // so we're going to pick from all cards at random now
      for(var index = 0; index < allIds.length; index++)
      {
        var type = allTypes[index];
        var id = allIds[index];
        if(cardData[type][id].canDrop) { simCardArray.push(cardData[type][id]); }
      }

      if(simCardArray == 0)
      {
        // we done fucked up. bail
        return null;
      }
    }
  }

  // now pick one!
  index = Math.floor(Math.random() * simCardArray.length);
  return simCardArray[index];
}

function getCard(cardType, cardId)
{
  var shouldAddXP = false;
  if(cardCollection[cardType] == null)
  {
    cardCollection[cardType] = {};
    cardCollection[cardType][cardId] = {};
    cardCollection[cardType][cardId].numOwned = 1;
    shouldAddXP = true;
  }
  else if(cardCollection[cardType][cardId] == null)
  {
    cardCollection[cardType][cardId] = {};
    cardCollection[cardType][cardId].numOwned = 1;
    shouldAddXP = true;
  }
  else
  {
    cardCollection[cardType][cardId].numOwned++;
  }

  if(shouldAddXP)
  {
    if(cardType == 1 || cardType == 3)
    {
      var character = cardData[cardType][cardId].character;
      var amount = cardData[cardType][cardId].xp;
      characterCollection[character] += amount;
    }
  }
}

function tryBuyCardForXP(character)
{
  // find the first card we don't own for the character and buy it

  // first, bail if we don't have enough for anything
  var enoughToBuyAnything = false;
  for(var x = 0; x < lowestCost.length; x++)
  {
    if(totalCrowns >= lowestCost[x])
    {
      enoughToBuyAnything = true;
      break;
    }
  }

  if(!enoughToBuyAnything)
  {
    return;
  }
  
  // ok. if we have enough for an ability, let's try that first, since they give the most xp
  // so, first: find the first card we DON'T have for this character
  if(totalCrowns > lowestCost[1])
  {
    // let's start by getting an array of ability cards for the character
    var cardIds = getCardIDs(1, character, true, false);
    // we can then compare that w/ the list that we have
    // the first cardId we find that we don't have in our collection is the one we should buy
    for(var x = 0; x < cardIds.length; x++)
    {
      var foundCard = false;
      for(card in cardCollection[1])
      {
        if(cardIds[x] == card.id)
        {
          foundCard = true;
          break;
        }
      }

      if(!foundCard) { 
        getCard(1, cardIds[x]);
        totalCrowns -= cardData[1][cardIds[x]].cost;
        break;
      }
    }
  }

  // if we have enough left over for a blueprint (somehow), try that too
  if(totalCrowns > blueprintCardCost)
  {
    var cardIds = getCardIDs(3, character, true, false);
    // we can then compare that w/ the list that we have
    // the first cardId we find that we don't have in our collection is the one we should buy
    for(var x = 0; x < cardIds.length; x++)
    {
      var foundCard = false;
      for(card in cardCollection[3])
      {
        if(cardIds[x] == card.id)
        {
          foundCard = true;
          break;
        }
      }

      if(!foundCard) { 
        getCard(3, cardIds[x]);
        totalCrowns -= cardData[3][cardIds[x]];
        break;
      }
    }
  }
}

function trySellCards()
{
  var types = Object.keys(cardCollection);
  for(var t = 0; t < types.length; t++)
  {
    var type = types[t];
    var ids = Object.keys(cardCollection[type]);
    for(var i = 0; i < ids.length; i++)
    {
      var id = ids[i];
      var numCards = cardCollection[type][id].numOwned;
      if(onlySellDuplicates && numCards > 1)
      {
        cardCollection[type][id].numOwned--;
        totalCrowns += getRefund(type, id);
        return;
      }

      if(!onlySellDuplicates && numCards >= 1)
      {
        cardCollection[type][id].numOwned--;
        if(numCards == 1) { 
          delete cardCollection[type][id];
          // also, remove the XP if applicable
          if(type == 1 || type == 3)
          {
            var character = cardData[type][id].character;
            var amount = cardData[type][id].xp;
            characterCollection[character] -= amount;
          }
        }
        totalCrowns += getRefund(type, id);
      }
    } 
  }
}

// after everything is loaded, see if we can load up existing settings data
function tryLoadData()
{
  var localCardData = window.localStorage.getItem('fromRustDevCollection');
  var localSettingsVersion = window.localStorage.getItem('fromRustDevVersion');
  var localSettings = window.localStorage.getItem('fromRustDevSettings');

  // we re-use these later in our sim so we're saving them now, they have
  // nothing to do with settings, we just only want to fire this once.
  // TODO: clean this shit up, dan, jesus fucking christ
  formDropRateNormal = document.getElementById("dropRateSettingsNormal");
  formDropRateUncommon = document.getElementById("dropRateSettingsUncommon");
  formDropRateRare = document.getElementById("dropRateSettingsRare");
  formDropRateLegendary = document.getElementById("dropRateSettingsLegendary");
  formDropRateAbility = document.getElementById("dropRateSettingsAbility");
  formDropRateBlueprint = document.getElementById("dropRateSettingsBlueprint");
  formDropRateAugment = document.getElementById("dropRateSettingsAugment");
  formDropRateMonster = document.getElementById("dropRateSettingsMonster");
  formDropRateTotal = document.getElementById("dropRateSettingsTotal");
  formDropRateCategoryTotal = document.getElementById("dropRateCardCategoryTotal");

  resetSettings();

  if(localCardData != null && localCardData != '' && localSettings != null && localSettings != '' && localSettingsVersion != null && localSettingsVersion == version)
  {
    // well then
    cardData = JSON.parse(localCardData);
    var settingsObj = JSON.parse(localSettings);

    xpForFirstLevel = settingsObj["xpForFirstLevel"];
    levelExponent = settingsObj["levelExponent"];
    numPlayers = settingsObj["numPlayers"];
    xpForSuccess = settingsObj["xpForSuccess"];
    xpForFailure = settingsObj["xpForFailure"];

    document.getElementById("xpForFirstLevel").value = xpForFirstLevel;
    document.getElementById("levelExponent").value = levelExponent;
    document.getElementById("xpForSuccess").value = xpForSuccess;
    document.getElementById("xpForFailure").value = xpForFailure;

    var numPlayersStrArray = ["numPlayersForXP1", "numPlayersForXP2", "numPlayersForXP4"];
    document.getElementById(numPlayersStrArray[numPlayers]).checked = true;

    missionSuccessPercent = settingsObj["missionSuccessPercent"];
    document.getElementById("missionSuccessPercent").value = missionSuccessPercent;
    numCardsOnMissionSuccess = settingsObj["numCardsOnMissionSuccess"];
    document.getElementById("missionSuccessCards").value = numCardsOnMissionSuccess;
    missionSuccessCrowns = settingsObj["missionSuccessCrowns"];
    document.getElementById("missionSuccessCrowns").value = missionSuccessCrowns;
    missionFailureCrowns = settingsObj["missionFailureCrowns"];
    document.getElementById("missionFailureCrowns").value = missionFailureCrowns;
    sellCards = settingsObj["sellCards"];
    document.getElementById("sellCards").checked = sellCards;
    buyCards = settingsObj["buyCards"];
    document.getElementById("buyCards").checked = buyCards;
    onlySellDuplicates = settingsObj["onlySellDuplicates"];
    document.getElementById("onlySellDuplicates").checked = onlySellDuplicates;
    desiredCardType = settingsObj["desiredCardType"];
    // ugh
    var desiredCardTypeStrArray = ["desiredCardTypeRandom", "desiredCardTypeAbility", "desiredCardTypeAugment", "desiredCardTypeBlueprint", "desiredCardTypeMonster"];
    document.getElementById(desiredCardTypeStrArray[desiredCardType]).checked = true;
    desiredTarget = settingsObj["desiredTarget"];
    // UGH
    var desiredTargetStrArray = ["desiredTargetCard", "desiredTargetLevel", "desiredTargetDropRateSim"];
    document.getElementById(desiredTargetStrArray[desiredTarget]).checked = true;

    dropRateNormal = settingsObj["dropRateNormal"];
    dropRateUncommon = settingsObj["dropRateUncommon"];
    dropRateRare = settingsObj["dropRateRare"];
    dropRateLegendary = settingsObj["dropRateLegendary"];
    dropRateAbility = settingsObj["dropRateAbility"];
    dropRateBlueprint = settingsObj["dropRateBlueprint"];
    dropRateAugment = settingsObj["dropRateAugment"];
    dropRateMonster = settingsObj["dropRateMonster"];
    formDropRateNormal.value = dropRateNormal;
    formDropRateUncommon.value = dropRateUncommon;
    formDropRateRare.value = dropRateRare;
    formDropRateLegendary.value = dropRateLegendary;
    formDropRateAbility.value = dropRateAbility;
    formDropRateBlueprint.value = dropRateBlueprint;
    formDropRateAugment.value = dropRateAugment;
    formDropRateMonster.value = dropRateMonster;
    formDropRateTotal.value = dropRateNormal + dropRateUncommon + dropRateRare + dropRateLegendary;
    formDropRateCategoryTotal.value = dropRateAbility + dropRateBlueprint + dropRateAugment + dropRateMonster;

    populateCardSettings();
    gatherData();
  }
  else
  {
    populateCardSettings();
    saveData();
  }
}

window.onload = tryLoadData;