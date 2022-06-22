//-----------------------------------------------------------------------------
/*:
 * @plugindesc Extra Page Conditions Version 1.0.0
 * @url 
 * @target MZ
 * @author GGZiron
 
 
 * @help
 * -------------------------------------------------------------------------
 *                    GGZiron's Extra Page Conditions
 * -------------------------------------------------------------------------
 * -------------------------------------------------------------------------
 * Features:
 * -------------------------------------------------------------------------
 * - Allows you to set additional options via plugin command: switch, 
 *   self-switch, self-switch of other event, variable, actor presence, item 
 *   possession, script call* with return statement. Game variables 
 *   evaluation is not just more or equal than, as default, but also less, 
 *   equal or less, more, equal, not equal. 
 *   *The script call can be tricky. It uses values that do not refresh 
 *   pages, it will not work correctly. More about it in the help file.
 *
 * - Secondary plugin command with negated options: for switches, 
 *   self-switches, item possession, actor presence. It requires them to be 
 *   OFF. Useful for single page events, without needing to add secondary 
 *   blank page with Self-Switch On, or other requirements. Can be counter 
 *   intuitive, so carefull.
 *
 * - Third plugin command, that locks given page. This page will never
 *   activate. I need it for myself, so I figured someone else might need 
 *   it too. 
 *
 * - Note tag, set by you. Only event that have it will be evaluated by 
 *   my plugin. If you set empty string for note tag, all would be
 *   evaluated. Note tag is useful if you want better performance. 
 * -------------------------------------------------------------------------
 * Terms:
 * -------------------------------------------------------------------------
 * Free to use, as long you credit me as GGZiron. 
 * If your game is commercial, sending me a free copy is good way to thank
 * me, but is optional.
 * -------------------------------------------------------------------------
 * How to use it:
 * -------------------------------------------------------------------------
 * Used to set extra page conditions.
 *
 * You set them via plugin command, coming with 
 * my plugin: "Extra Page Conditions", or the alternative plugin command:
 * "Extra Page Conditions Negated".
 *
 * You insert the desired plugin command on the very page you want to 
 * apply the extra conditions. Inside, fill your criteria(conditions). 
 * They all must apply, for the page to be active. 
 * If you set this plugin command twice within a page, both instances will 
 * be evaluated and checked by my plugin. And both commands criteria must 
 * apply. Original page conditions apply too. 
 *
 * You don't need to worry about making the plugin command "run", as it 
 * doesn't run. It is evaluated externally, upon page check conditions,
 * similar to comment tags. During code execution, the
 * extra page condition commands are ignored.
 *
 * Script call condition allows you also to use script calls, but they
 * must end with return statement. Be careful there, because things that
 * aren’t originally used for page conditions might not be checked 
 * on the instance you alter them, and page may not activate until
 * other event occurs.
 *
 * Example: if you set script calls that to read player's gold,
 * know that active page refresh doesn't originally happen upon
 * changing player's gold, and even though it meets the criteria of 
 * your script call, page may not activate, because it simply 
 * didn't check that script call. To avoid such scenario, better make
 * game variable be equal to player's gold, and then check the
 * variable instead. Game Variables do refresh pages anytime
 * you assign value to them.
 *
 * Alternatively, every time you change value that might need 
 * page refreshing, you can request page refresh with this script 
 * call: $gameMap.requestRefresh();
 *
 * There is one additional plugin command: "Lock Page",
 * that locks the page. A locked page would never activate.
 * -------------------------------------------------------------------------
 * Event parameters:
 * -------------------------------------------------------------------------
 * Event Tag, which is optional. If you do not want to use, leave empty,
 * and my extra conditions applies for all events.
 * If you want to use it, write any tag you like, for example <Extra_Page>.
 * It must be contained in the event note, otherwise my extra page
 * conditions would be ignored for the event. Purpose of that is
 * if you want my extra page conditions to apply only for the events
 * that needs it, generating less lag factor.
 * 
 * But if you use it, and given event doesn't have the event tag, the extra
 * conditions used there would be ignored.
 * The tag will be trimmed (all empty space before first character, and
 * after last character will be removed), and text will not be case 
 * sensitive. That means <Extra_Page> and <extra page> would work
 * the same.
 * -------------------------------------------------------------------------
 * Shortcomings:
 * -------------------------------------------------------------------------
 * To evaluate my extra conditions, may take extra time. It scan all events
 * code list for the needed plugin commands, when selecting active page.
 * Though, that scanning is supposed to happen only once per page 
 * evaluation, until you leave the map. Still, if you think my plugin
 * slows the game, you can use the event tag, so only the events
 * that have it, only they will get code list scanned.
 *
 * The negated conditions sometimes are counter intuitive, so careful with
 * them.
 * -------------------------------------------------------------------------
 *                             END OF HELP FILE
 * -------------------------------------------------------------------------
 *
 * @param eventTag
 * @text Event Tag
 * @desc Optional. If you set text, that text must be contained in the event's tag. Example tag: <extra page>  
 * @default 
 *
 * @command extraPageConditions
 * @text Extra Page Conditions
 * @desc Will not run as event code. Evaluated externally, to set page conditions. All requirements need to apply. 
 
 * @arg conditionSelfSwitchFree
 * @text Self Switch Free
 * @desc Self Switches That need to be ON. If more than one, all need to be ON. 'A' is different from 'a'.
 * @type text[]
 * @default []
 
 * @arg conditionSelfSwitchSelect
 * @text Self Switch Select
 * @desc Self Switches That need to be ON. If more than one, all need to be ON.
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @default []
 
 * @arg conditionExternalSelfSwitches
 * @text External Self Switch
 * @desc Needs Self Switch of other event to be ON. If more than one, all need to be ON.
 * @type struct<ExternalSelfSwitch>[]
 * @default []
 
 * @arg conditionSwitch
 * @text Switch
 * @desc The selected switch value must be ON.
 * @type switch[]
 * @default[]
 
 * @arg conditionVariable
 * @text Variable
 * @desc Selected variables must pass the checks.
 * @type struct<Variable>[]
 * @default []
 
 * @arg conditionItem
 * @text Item
 * @desc Party must have at least one of each item listed.
 * @type item[]
 * @default []
 
 * @arg conditionActor
 * @text Actor
 * @desc The selected actors must be in party.
 * @type actor[]
 * @default []
 
 * @arg conditionScriptCall
 * @text Script Call
 * @type multiline_string[]
 * @default []
 * @desc Advanced. Your code must end with return statement, which if true, condition apply.
 
 * @command extraPageConditionsNegated
 * @text Extra Page Conditions Negated
 * @desc Here, requires for OFF value for switches and self switches. If actor, not to be present, if item, not to have it.
 
 * @arg conditionSelfSwitchFree
 * @text Self Switch Free
 * @desc Self Switches That need to be OFF. If more than one, all need to be OFF. 'A' is different from 'a'.
 * @type text[]
 * @default []
 
 * @arg conditionSelfSwitchSelect
 * @text Self Switch Select
 * @desc Self Switches That need to be OFF. If more than one, all need to be OFF.
 * @type select[]
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @default []
 
 * @arg conditionExternalSelfSwitches
 * @text External Self Switch
 * @desc Needs Self Switch of other event to be OFF. If more than one, all need to be OFF.
 * @type struct<ExternalSelfSwitch>[]
 * @default []
 
 * @arg conditionSwitch
 * @text Switch
 * @desc The selected switch value must be OFF.
 * @type switch[]
 * @default[]
 
 * @arg conditionItem
 * @text Item
 * @desc Party shouldn't have any of the listed items.
 * @type item[]
 * @default []
 
 * @arg conditionActor
 * @text Actor
 * @desc The selected actors must be out of the party.
 * @type actor[]
 * @default []
 
 * @command extraPageConditionsLockPage
 * @text Lock Page
 * @desc Locks the page. It will never be active, no matter what.
 
  */
/*~struct~ExternalSelfSwitch:
 
 * @param mapID
 * @text Map ID
 * @desc Input map ID. If 0, current map.
 * @type number
 * @default 0
 
 * @param eventID
 * @text Event ID
 * @desc Event desired event ID. Zero for current event.
 * @type number
 * @default 1
 * @min 1
 
 * @param letter
 * @text Letter
 * @desc Input the self-switch letter. 'A' is different from 'a'. 
 * @type text
 * @default A

 */
/*~struct~Variable:
 *
 * @param variableID
 * @text Variable
 * @desc Select the variable
 * @type variable
 * @default 1

 * @param operator
 * @text Operator
 * @desc Select the variable value operator
 * @type select
 * @option Equal
 * @value ===
 * @option More
 * @value >
 * @option More Or Equal
 * @value >=
 * @option Less
 * @value <
 * @option Less Or Equal
 * @value <=
 * @default ===
 * @option Not Equal
 * @value !==
 * @default >
 
 * @param value
 * @text Compared Value
 * @desc The variable will be compared with this value
 * @type number
 * @default 0
 
 */
 
var Imported = Imported || {};
Imported.GGZiron_ExtraPageConditions = '1.0.0';
 
var GGZiron = GGZiron || {};
GGZiron.ExtraPageConditions = {};
GGZiron.ExtraPageConditions.version = Imported.GGZiron_ExtraPageConditions;
GGZiron.ExtraPageConditions.fileName = 'GGZironExtraPageConditions';
GGZiron.ExtraPageConditions.eventTag = PluginManager.parameters(GGZiron.ExtraPageConditions.fileName).eventTag.toLowerCase().trim();
GGZiron.ExtraPageConditions.aliases = {};
GGZiron.ExtraPageConditions.methods = {};

// ===============================================================================================================
//                                                 Game Event
// ===============================================================================================================

GGZiron.ExtraPageConditions.aliases.gameEvent_meetConditions = Game_Event.prototype.meetsConditions;

Game_Event.prototype.meetsConditions = function(page) {
	if (!GGZiron.ExtraPageConditions.aliases.gameEvent_meetConditions.call(this, ...arguments)) return false;
    if (this.event().note.trim().toLowerCase().indexOf(GGZiron.ExtraPageConditions.eventTag) < 0) return true;
    return GGZiron.ExtraPageConditions.methods.evaluateConditions.call(this, page);
};

// ===============================================================================================================
//                                                 New methods
// ===============================================================================================================
GGZiron.ExtraPageConditions.methods.evaluateConditions = function(page){
	GGZiron.ExtraPageConditions.methods.assignPageConditions.call(this, page);
	let conditions = page._ggzExtraConditions;
	if (conditions.lockPage) return false;
	let methods = GGZiron.ExtraPageConditions.methods;
	let propFuncPairs = [
	    ['selfSwitches', methods.evaluateSelfSwitches], 
	    ['switches', methods.evaluateSwitches],
	    ['items', methods.evaluateItems],
		['actors', methods.evaluateActors]
	];
	if (!methods.evaluateOnOffConditions(conditions, propFuncPairs)) return false;
	if (!methods.evaluateVariables(conditions) || !methods.evaluateScriptCalls(conditions))
		return false;
	return true;
};

GGZiron.ExtraPageConditions.methods.assignPageConditions = function(page){
	if (page._ggzExtraConditions) return;
	let mapID = this._mapId; //used to generate self-switch key.
	page._ggzExtraConditions = new GGZiron_ExtraPageConditions(page, mapID, this.eventId());
};

GGZiron.ExtraPageConditions.methods.evaluateOnOffConditions = function(conditions, propFuncPairs){
	for (let propFuncPair of propFuncPairs){
		let prop = propFuncPair[0];
		let _function = propFuncPair[1];
		if (!GGZiron.ExtraPageConditions.methods.evaluateOnOffCondition(conditions, prop, _function))
			return false;
	};
	return true;
};

GGZiron.ExtraPageConditions.methods.evaluateOnOffCondition = function(conditions, prop, _function){
	let itemOn = conditions[prop + 'ON'] ;
	let itemOff = conditions[prop + 'OFF'];
	return (_function(itemOn, true) && _function(itemOff, false));
};


GGZiron.ExtraPageConditions.methods.evaluateSelfSwitches = function(selfSwitches, needOn){
	for (let selfSwitch of selfSwitches){
		let value = $gameSelfSwitches.value(selfSwitch);
		if (value !== needOn)/*XOR*/return false;
	};
	return true;
};

GGZiron.ExtraPageConditions.methods.evaluateSwitches = function(switches, needOn){
	for (let switchID of switches){
		if (switchID <= 0) continue;
		let value = $gameSwitches.value(switchID);
		if (value !== needOn)/*XOR*/return false;
	};
	return true;
};

GGZiron.ExtraPageConditions.methods.evaluateItems = function(items, needToHave){
	for (let itemID of items){
		if (itemID  <= 0) continue;
		let item = $dataItems[itemID];
		if (!item) continue;
		if ($gameParty.hasItem(item, false) !== needToHave)/*XOR*/ return false;
	};
	return true;

};

GGZiron.ExtraPageConditions.methods.evaluateActors = function(actors, needPresence){
	for (let actorID of actors){
		if (actorID  <= 0) continue;
        let presence = $gameParty.allMembers().some(member => member.actorId() === actorID)
		if (presence !== needPresence) /*XOR*/ return false;
	};
	return true;
};

GGZiron.ExtraPageConditions.methods.evaluateVariables = function(conditions){
	let variables = conditions.variables;
	for (let variableData of variables){
		let varID = variableData[0];
		if (varID <= 0) continue;
		let varValue = $gameVariables.value(varID);
		let operator = variableData[1];
		let rawValue = variableData[2];
		let result;
		switch(operator){
			case '<'   : result = varValue < rawValue;   break;
			case '<='  : result = varValue <= rawValue;  break;
			case '===' : result = varValue === rawValue; break;
            case '>='  : result = varValue >= rawValue;  break;
			case '>'   : result = varValue > rawValue;   break;
			case '!==' : result = varValue !== rawValue; break;
			
			default: 
			    console.warn('GGZiron Extra Page Condition -> Provided incorect operator for variable condition. Ignoring entry.');
			    continue;
		};
		if (!result) return false;
	};
	return true;
};

GGZiron.ExtraPageConditions.methods.evaluateScriptCalls = function(conditions){
	let scriptCalls = conditions.scriptCalls;
	for (let scriptCall of scriptCalls){
		let f = new Function('', scriptCall); //the evaluated expression have to contain return statement.
		if (!f(scriptCall)) return false;
	};
	return true;
};

// ============================================================================================================
//                                                Class Extra Page Conditions
// ============================================================================================================

function GGZiron_ExtraPageConditions(){
	this.initialize(...arguments);	
};

GGZiron_ExtraPageConditions.prototype.initialize = function(page, mapID, eventID){
	let list = page.list.filter(GGZiron.ExtraPageConditions.methods.findPluginCommands);
	this.initLockPage(list);
	if (this.lockPage) return; //other properties are not needed, if page is locked.
	let onList = list.filter(entry => entry.parameters[1] === 'extraPageConditions');
	let offList = list.filter(entry => entry.parameters[1] === 'extraPageConditionsNegated');
    this.lockPage = false;
	this.selfSwitchesON = []; this.selfSwitchesOFF = []
	this.switchesON = []; this.switchesOFF = [];
	this.itemsON = []; this.itemsOFF = [];
	this.actorsON = []; this.actorsOFF = [];
	this.initSelfSwitches(this.selfSwitchesON, onList, mapID, eventID); 
	this.initSelfSwitches(this.selfSwitchesOFF, offList, mapID, eventID); 
	this.initSwitches(this.switchesON, onList); this.initSwitches(this.switchesOFF, offList);
	this.initItems(this.itemsON, onList); this.initItems(this.itemsOFF, offList); 
	this.initActors(this.actorsON, onList); this.initActors(this.actorsOFF, offList);
	this.initVariables(onList); this.initScriptCalls(onList);
};

GGZiron_ExtraPageConditions.prototype.initLockPage = function(list){
	this.lockPage = list.some(entry => entry.parameters[1] === 'extraPageConditionsLockPage');
};

GGZiron_ExtraPageConditions.prototype.parseOrArray = function(stringToParse){
	try{
		return JSON.parse(stringToParse);
	} catch(oErMsg){
		return [];
	};
};

GGZiron_ExtraPageConditions.prototype.initSelfSwitches = function(arr, list, mapID, eventID){
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let selfSwitchesFree     = this.parseOrArray(args.conditionSelfSwitchFree);
		let selfSwitchesSelect   = this.parseOrArray(args.conditionSelfSwitchSelect);
		let selfSwitchesExternal = this.parseOrArray(args.conditionExternalSelfSwitches);
		this.iterateSelfSwitches(selfSwitchesFree.concat(selfSwitchesSelect), objHolder, mapID, eventID);
		this.iterateExternalSelfSwitches(selfSwitchesExternal, objHolder, mapID, eventID);
	};
	this.transferObjKeysToArray(arr, objHolder);
};

GGZiron_ExtraPageConditions.prototype.iterateSelfSwitches = function(selfSwitches, objHolder, mapID, eventID){
	for (let entry of selfSwitches){
		let letter = entry.trim();
		this.selfSwitchEntryIterate(objHolder, mapID, eventID, letter);
	};
};

GGZiron_ExtraPageConditions.prototype.iterateExternalSelfSwitches = function(selfSwitches, objHolder, mapID, eventID){
	for (let unparsedEntry of selfSwitches){
		let entry;
		try{entry = JSON.parse(unparsedEntry);} 
		catch(oErMsg){
			console.warn('GGZiron Extra Page Condition -> Incorect entry data for external switch. Ignoring that entry.'); 
			continue;
		};
		mapID = parseInt(entry.mapID) || mapID;
		eventID = parseInt(entry.eventID) || eventID;
		let letter = entry.letter.trim();
		this.selfSwitchEntryIterate(objHolder, mapID, eventID, letter);
	};
};

GGZiron_ExtraPageConditions.prototype.selfSwitchEntryIterate = function(objHolder, mapID, eventID, letter){
	if (letter.trim() === '') {
		return console.warn('GGZiron Extra Page Condition -> Proovided empty space instead letter for Self Switch. Ignoring that entry.');
	};
	objHolder[[mapID, eventID, letter]] = true;
};

GGZiron_ExtraPageConditions.prototype.initSwitches = function(arr, list){
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let conditionSwitches = this.parseOrArray(args.conditionSwitch);
		for (let switchIDText of conditionSwitches){
			objHolder[switchIDText] = true;
		};
	};
	this.transferObjKeysToArray(arr, objHolder);
    arr.forEach((el, index) => arr[index] = parseInt(el));
};


GGZiron_ExtraPageConditions.prototype.initItems = function(arr, list){
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let items = this.parseOrArray(args.conditionItem);
		for (let idText of items){
			objHolder[idText] = true;
		};
	};
	this.transferObjKeysToArray(arr, objHolder);
	arr.forEach((el, index) => arr[index] = parseInt(el));
};

GGZiron_ExtraPageConditions.prototype.initActors = function(arr, list){
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let actors = this.parseOrArray(args.conditionActor);
		for (let idText of actors){
			objHolder[parseInt(idText)] = true;
		};
	};
	this.transferObjKeysToArray(arr, objHolder);
	arr.forEach((el, index) => arr[index] = parseInt(el));
};

GGZiron_ExtraPageConditions.prototype.initVariables = function(list){
	this.variables = [];
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let variables = this.parseOrArray(args.conditionVariable);
		for (let variableUnparsed of variables){
			let variable;
		    try{variable = JSON.parse(variableUnparsed);} 
		    catch(oErMsg){
			    console.warn('GGZiron Extra Page Condition -> Incorect entry data for variable. Ignoring that entry.'); 
			    continue;
		    };
			let varID = variable.variableID;
			let operator = variable.operator.trim();
			let value = variable.value;
			objHolder[[varID, operator, value]] = true;
		};
	};
	this.transferObjKeysToArray(this.variables, objHolder);
	this.variables = this.variables.map(dataStr => {
		let dataArr = dataStr.split(',');
		dataArr[0] = parseInt(dataArr[0]);
		dataArr[2] = parseInt(dataArr[2]);
		return dataArr;
	});
};

GGZiron_ExtraPageConditions.prototype.initScriptCalls  = function(list){
	this.scriptCalls = [];
	let objHolder = {};
	for (let entry of list){
		let args = entry.parameters[3];
		let scriptCalls = this.parseOrArray(args.conditionScriptCall);
		for (let scriptCall of scriptCalls){
			objHolder[scriptCall.trim()] = true;
		};
	};
	this.transferObjKeysToArray(this.scriptCalls , objHolder);
};

GGZiron_ExtraPageConditions.prototype.transferObjKeysToArray = function(arr, obj){
	arr.push(...Object.keys(obj));
};

// ============================================================================================================
//                                          Find Plugin Commands
// ============================================================================================================

GGZiron.ExtraPageConditions.methods.findPluginCommands = function(entry){
    return  entry.code === 357 && 
	        entry.parameters[0] === GGZiron.ExtraPageConditions.fileName;
};	
