// setting up global vars

// settings - sim globals
var numSims = 10000;
var missionSuccessPercent = 50;

// settings - behavior
var sellCards = false;
var onlySellDuplicates = false;
var desiredCardType = 0;
var desiredTarget = 0;

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

// helper functions to grab costs and such
function getCost(type)
{
  /*if(type == 1)
  {
    return characterCardCost;
  }*/

  if(type == 1)
  {
    return abilityCardCost;
  }

  if(type == 2)
  {
    return augmentCardCost;
  }

  if(type == 3)
  {
    return blueprintCardCost;
  }

  if(type == 4)
  {
    return monsterCardCost;
  }

  return -1;
}

function getRefund(type)
{
  /*if(type == 1)
  {
    return characterCardRefund;
  }*/

  if(type == 1)
  {
    return abilityCardRefund;
  }

  if(type == 2)
  {
    return augmentCardRefund;
  }

  if(type == 3)
  {
    return blueprintCardRefund;
  }

  if(type == 4)
  {
    return monsterCardRefund;
  }

  return -1;
}

function getFormValue(id) {
  return parseInt((document.getElementById(id)).value);
}

function gatherData() {
  missionSuccessPercent = getFormValue("missionSuccessPercent");

  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");
  missionSuccessCrowns = getFormValue("missionSuccessCrowns");
  missionFailureCrowns = getFormValue("missionFailureCrowns");

  sellCards = document.getElementById("sellCards").checked;
  onlySellDuplicates = document.getElementById("onlySellDuplicates").checked;
  desiredCardType = document.querySelector('input[name="desiredCardType"]:checked').value;
  desiredTarget = document.querySelector('input[name="desiredTarget"]:checked').value;

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
  //augmentCardXP = getFormValue("augmentCardXP"); // temporarily disabling this
  blueprintCardXP = getFormValue("blueprintCardXP");

  xpPerLevel = getFormValue("xpPerLevel");

  // replace xp values in card data
  // this is redundant at the moment, but we will need this later, 
  // when we have a way to do individual card settings
  var abilityCardKeys = Object.keys(cardData[1]);
  for(var x = 0; x < abilityCardKeys.length; x++)
  {
    cardData[1][abilityCardKeys[x]].xp = abilityCardXP;
  }

  var blueprintKeys = Object.keys(cardData[3]);
  for(var x = 0; x < blueprintKeys.length; x++)
  {
    cardData[3][blueprintKeys[x]].xp = blueprintCardXP;
  }
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
        if(desiredTarget == 1 && totalCrowns >= getCost(desiredCard.type))
        {
          // we can! we are done
          stopCondition = true;
        }

        // for desiredTarget 2, we should try to buy a card we don't have yet
        if(desiredTarget == 2)
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
  var innerHTMLString = "";
  innerHTMLString += "Average missions ran: " + getAvgMissions() + "<br />";
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
  if(desiredTarget == 1 && sellCards)
  {
    trySellCards();
  }

  return checkStopCondition();
}

function checkStopCondition()
{
  if(desiredTarget == 1)
  {
    if(cardCollection[desiredCard.type] == null) { return false; }
    if(cardCollection[desiredCard.type][desiredCard.id] == null) { return false; }
    return (cardCollection[desiredCard.type][desiredCard.id].numOwned > 0);
  }

  if(desiredTarget == 2)
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
    var index = Math.floor((Math.random() * allIds.length + 1));
    card.type = allTypes[index];
    card.id = allIds[index];
  }
  else
  {
    card.type = type;
    var numCards = (Object.keys(cardData[type])).length;
    card.id = cardData[type][Math.floor(Math.random() * numCards) + 1].id;
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

  // first, bail if we don't have enough for abilities or blueprints.
  if(totalCrowns < abilityCardCost && totalCrowns < blueprintCardCost)
  {
    return;
  }

  // ok. if we have enough for an ability, let's try that first, since they give the most xp
  // so, first: find the first card we DON'T have for this character

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
        totalCrowns += getRefund(type);
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
            characterCollection[character] += amount;
          }
        }
        totalCrowns += getRefund(type);
      }
    } 
  }
}