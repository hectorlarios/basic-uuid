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
export function formatUUIDFromHex(hex)
{
  const pattern = /^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})$/gi;

  return hex.replace(pattern, '$1-$2-$3-$4-$5');
}

/**
 * Return hex string that has a length matching the count parameter. If the hex string is not long enough, it is
 * prepended with 0's until the hex string length matches the count value.
 *
 * @param hex - the hex string that is to be prepended if its length is less than the count value.
 * @param count - the max length of the hex string.
 * @returns {string} - the hex string that may have been prepended with 0's.
 */
export function padLeft(hex, count = 2)
{
  let value = hex;

  while(value.length < count)
  {
    value = '0' + value;
  }

  return value;
}

/**
 * Returns an array containing decimals that was created from the hex string.
 *
 * @param hex - string to be converted to a list of decimal values
 * @returns {Array} - list containing decimal values that was created from the hex string.
 */
export function hexToDigitList(hex)
{
  const list = [];

  let value;

  [...hex].map((char, index) =>
  {
    if(index % 2 == 0)
    {
      value = char;
    }
    else
    {
      list.push(parseInt(value + char, 16));
    }
  });

  return list;
}

/**
 * Returns a hex string that was created from the list of decimals.
 *
 * @param list - a list of decimals that will be converted to a hex string.
 * @returns {string} - hex string tha was crated from the list of decimal values.
 */
export function digitListToHex(list)
{
  let hex = '';

  list.map(item =>
  {
    hex += padLeft(item.toString(16));
  });

  return hex;
}

/**
 * Creates a list of the random number that make the UUID value. They are generated using the Math.random method,
 * and a portion is generated using the current time.
 *
 * @returns {Array} list of numbers that represent the UUID value.
 */
export function createRandomDigitList()
{
  const time = (new Date()).getTime();

  const hex = padLeft(time.toString(16).substr(-8), 8);

  const list = hexToDigitList(hex);

  const value = [...('000000000000')].map(() => {return parseInt(Math.random() * 0xFF)});

  Array.prototype.splice.apply(value, [10, 0].concat(list));

  return value;
}