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
cardData[1] = { name: "TestCharacterCard", type: 1 };
cardData[2] = { name: "TestAbilityCard", type: 2 };
cardData[3] = { name: "TestAugmentCard", type: 3 };
cardData[4] = { name: "TestBlueprintCard", type: 4 };
cardData[5] = { name: "TestMonsterCard", type: 5 };

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
}

function runSims() {
  totalArray = [];

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

    // gather data from form
    gatherData(); // this is inefficient - we only need to do this once. TODO: refactor this

    // decide which card we want
    desiredCard = desiredCardType;
    // for now this is just a type since we're testing
    // TODO: helper function to find a random card of a given type from the pool
    if(desiredCard == 0)
    {
      desiredCard = selectCardId();
    }

    // run the missions
    for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
    {
      stopCondition = runSingleSim();
      // if we didn't get the card we want, let's see if we can buy it here
      if(!stopCondition)
      {
        if(totalCrowns >= getCost(desiredCard))
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
  for(var x = 0; x < Object.keys(cardData).length; x++)
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
      getCard(selectCardId());
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

function selectCardId()
{
  return Math.floor(Math.random() * Object.keys(cardData).length);
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
  for(var x = 0; x < Object.keys(cardData).length; x++)
  {
    var numCards = getNumCardsOwned(x);
    if(x == desiredCard && numCards > 0) { return; } // temporary until we get a proper card pool

    if(onlySellDuplicates && numCards > 1)
    {
      cardCollection[x]--;
      totalCrowns += getRefund(x); 
    }
    else
    {
      if(numCards > 0)
      {
        cardCollection[x]--;
        if(cardCollection[x] == 0) { delete cardCollection[x]; }
        totalCrowns += getRefund(x);
      }
    }
  }
}