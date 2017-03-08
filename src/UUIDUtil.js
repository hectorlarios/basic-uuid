'use strict';

/**
 * basic-uuid
 * Copyright(c) 2017 Hector Larios
 * MIT Licensed
 */

/**
 * Returns a UUID string created from the hex string.
 *
 * @param hex - the string to be formatted to an UUID.
 * @returns {string} - hex string formatted to represent a UUID.
 */
function formatUUIDFromHex(hex)
{
  var _pattern = /^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})$/gi;

  return hex.replace(_pattern, '$1-$2-$3-$4-$5');
}

/**
 * Return hex string that has a length matching the count parameter. If the hex string is not long enough, it is
 * prepended with 0's until the hex string length matches the count value.
 *
 * @param hex - the hex string that is to be prepended if its length is less than the count value.
 * @param count - the max length of the hex string.
 * @returns {string} - the hex string that may have been prepended with 0's.
 */
function padLeft(hex, count)
{
  var _value = hex;

  var _count = count || 2;

  while(_value.length < _count)
  {
    _value = '0' + _value;
  }

  return _value;
}

/**
 * Returns an array containing decimals that was created from the hex string.
 *
 * @param hex - string to be converted to a list of decimal values
 * @returns {Array} - list containing decimal values that was created from the hex string.
 */
function hexToDigitList(hex)
{
  var _list = [];

  var _value;

  hex.split('').map(function(char, index)
  {
    if(index % 2 == 0)
    {
      _value = char;
    }
    else
    {
      _list.push(parseInt(_value + char, 16));
    }
  });

  return _list;
}

/**
 * Returns a hex string that was created from the list of decimals.
 *
 * @param list - a list of decimals that will be converted to a hex string.
 * @returns {string} - hex string tha was crated from the list of decimal values.
 */
function digitListToHex(list)
{
  var _value = '';

  list.map(function(item)
  {
    _value += padLeft(item.toString(16));
  });

  return _value;
}

/**
 * Creates a list of the random number that make the UUID value. They are generated using the Math.random method,
 * and a portion is generated using the current time.
 *
 * @returns {Array} list of numbers that represent the UUID value.
 */
function createRandomDigitList()
{
  var _time = (new Date()).getTime();

  var _hex = padLeft(_time.toString(16).substr(-8), 8);

  var _hexList = hexToDigitList(_hex);

  var _value = '............'.split('').map(function(){return parseInt(Math.random() * 0xFF)});

  Array.prototype.splice.apply(_value, [10, 0].concat(_hexList));

  return _value;
}

module.exports = {

  formatUUIDFromHex: formatUUIDFromHex,

  padLeft: padLeft,

  hexToDigitList: hexToDigitList,

  digitListToHex: digitListToHex,

  createRandomDigitList: createRandomDigitList
};