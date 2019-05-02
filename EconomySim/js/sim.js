// setting up global vars

// settings - sim globals
var numSims = 10000;
var missionSuccessPercent = 50;

// settings - behavior
var sellCards = false;
var buyCards = false;
var onlySellDuplicates = false;
var desiredCardType = 0;
var desiredTarget = 0;

// settings - reward data
var numCardsOnMissionSuccess = 1;
var missionSuccessCrowns = 0;
var missionFailureCrowns = 0;

// sim results data
var totalMissions = 0;
var totalMissionsWon = 0;
var totalArray = [];
var totalCrowns = 0;

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

function gatherData() {
  missionSuccessPercent = getFormValue("missionSuccessPercent");

  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");
  missionSuccessCrowns = getFormValue("missionSuccessCrowns");
  missionFailureCrowns = getFormValue("missionFailureCrowns");

  sellCards = document.getElementById("sellCards").checked;
  buyCards = document.getElementById("buyCards").checked;
  onlySellDuplicates = document.getElementById("onlySellDuplicates").checked;
  desiredCardType = document.querySelector('input[name="desiredCardType"]:checked').value;
  desiredTarget = document.querySelector('input[name="desiredTarget"]:checked').value;

  // cost and XP here we go
  for(var x = 0; x < totalCardsInPool; x++)
  {
    var type = allTypes[x];
    var id = allIds[x];

    cardData[type][id].cost = getFormValue("cardCost" + (x+1));
    cardData[type][id].refund = getFormValue("cardRefund" + (x+1));
    cardData[type][id].xp = getFormValue("cardXP" + (x+1));

    if(cardData[type][id].cost < lowestCost[type])
    {
      lowestCost[type] = cardData[type][id];
    }
  }

  xpPerLevel = getFormValue("xpPerLevel");

  // save data to local storage
  saveData();
}

function setAllAbilities()
{
  var abilityCost = getFormValue("allAbilityCost");
  var abilityRefund = getFormValue("allAbilityRefund");
  var abilityXP = getFormValue("allAbilityXP");

  for(var ability of Object.values(cardData[1]))
  {
    ability.cost = abilityCost;
    ability.refund = abilityRefund;
    ability.xp = abilityXP;
  }

  populateCardSettings();
  saveData();
}

function setAllBlueprints()
{
  var blueprintCost = getFormValue("allBlueprintCost");
  var blueprintRefund = getFormValue("allBlueprintRefund");
  var blueprintXP = getFormValue("allBlueprintXP");

  for(var blueprint of Object.values(cardData[3]))
  {
    blueprint.cost = blueprintCost;
    blueprint.refund = blueprintRefund;
    blueprint.xp = blueprintXP;
  }

  populateCardSettings();
  saveData();
}

function setAllAugments()
{
  var augmentsCost = getFormValue("allAugmentCost");
  var augmentsRefund = getFormValue("allAugmentRefund");
  var augmentsXP = getFormValue("allAugmentXP");

  for(var augment of Object.values(cardData[2]))
  {
    augment.cost = augmentsCost;
    augment.refund = augmentsRefund;
    augment.xp = augmentsXP;
  }

  populateCardSettings();
  saveData();
}

function setAllMonsters()
{
  var monsterCost = getFormValue("allMonsterCost");
  var monsterRefund = getFormValue("allMonsterRefund");
  var monsterXP = getFormValue("allMonsterXP");

  for(var monster of Object.values(cardData[4]))
  {
    monster.cost = monsterCost;
    monster.refund = monsterRefund;
    monster.xp = monsterXP;
  }

  populateCardSettings();
  saveData();
}

function saveData()
{
  window.localStorage.setItem('fromRustDevCollection', JSON.stringify(cardData));

  var settingsObj = {};
  settingsObj["missionSuccessPercent"] = missionSuccessPercent;
  settingsObj["numCardsOnMissionSuccess"] = numCardsOnMissionSuccess;
  settingsObj["missionSuccessCrowns"] = missionSuccessCrowns;
  settingsObj["missionFailureCrowns"] = missionFailureCrowns;
  settingsObj["sellCards"] = sellCards;
  settingsObj["buyCards"] = buyCards;
  settingsObj["onlySellDuplicates"] = onlySellDuplicates;
  settingsObj["desiredCardType"] = desiredCardType;
  settingsObj["desiredTarget"] = desiredTarget;
  settingsObj["xpPerLevel"] = xpPerLevel;

  window.localStorage.setItem('fromRustDevSettings', JSON.stringify(settingsObj));
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
    resetCardCollection();

    // decide which card we want
    desiredCard = selectRandomCard(desiredCardType);

    // run the missions
    for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
    {
      stopCondition = runSingleSim();
      // if we didn't get the card we want, let's see if we can buy it here
      if(!stopCondition)
      {
        if(desiredTarget == 0 && totalCrowns >= getCost(desiredCard.type, desiredCard.id))
        {
          // we can! we are done
          stopCondition = true;
        }

        // for desiredTarget 1, we should try to buy a card we don't have yet
        if(desiredTarget == 1 && buyCards)
        {
          tryBuyCardForXP(1);
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
    innerHTMLString += "Level from 1 to 2.<br />";
  }
  
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
    console.log(type);
    for(var id of Object.keys(cardCollection[type]))
    {
      innerHTMLString += getName(type, id) + ": " + cardCollection[type][id].numOwned + " || ";
    }
  }

  document.getElementById("result").innerHTML = innerHTMLString;

  document.getElementById("resultsTab").click();
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
      var card = selectRandomCard(0);
      getCard(card.type, card.id);
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

  if(desiredTarget == 1)
  {
    // for this test, we're just going until we have lvl 2 on Lucky Jack
    return calculateLevel(1) >= 1;
  }
  
  return false;
}

function calculateLevel(champion)
{
  return characterCollection[champion] / xpPerLevel;
}

function runMission()
{
  totalMissions++;
  return (Math.floor(Math.random() * 101) <= missionSuccessPercent);
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
  // for now, we're just targeting Lucky Jack.
  // so find the first card we don't own on him and try to buy it.

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
    var cardIds = getCardIDs(1, character);
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
    var cardIds = getCardIDs(3, character);
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
  if(localCardData != null)
  {
    // well then
    cardData = JSON.parse(localCardData);

    var settingsObj = JSON.parse(window.localStorage.getItem('fromRustDevSettings'));
    if(settingsObj != null)
    {
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
      var desiredTargetStrArray = ["desiredTargetCard", "desiredTargetLevel"];
      xpPerLevel = settingsObj["xpPerLevel"];
      document.getElementById(desiredTargetStrArray[desiredTarget]).checked = true;
      document.getElementById("xpPerLevel").value = xpPerLevel;
    }
  }

  populateCardSettings();
}

tryLoadData();