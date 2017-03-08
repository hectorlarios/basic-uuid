'use strict';

/**
 * basic-uuid
 * Copyright(c) 2017 Hector Larios
 * MIT Licensed
 */

var UUIDUtil = require('./UUIDUtil');

/**
 * The UUID class that creates a random UUID value.
 *
 * @param value [array] - list of decimal values that represent the UUID.
 * @constructor
 * @throws {Error} - if attempting to directly instantiate the class directly.
 */
function UUID (value)
{
  var _digits = value || UUIDUtil.createRandomDigitList();

  /**
   * Return a string value that represents the UUID.
   *
   * @returns {string}
   */
  this.getId = function getId()
  {
    var hex = UUIDUtil.digitListToHex(_digits);

    return UUIDUtil.formatUUIDFromHex(hex);
  };

  /**
   * Creates JSON string from UUID value.
   *
   * @returns {string} - JSON string containing UUID value.
   */
  this.toJSON = function toJSON()
  {
    return '{"uuid":"'+this.getId()+'"}';
  };
}

/**
 * Checks if the value of the id parameter is a valid UUID string.
 *
 * @param id - the value that will be validated.
 * @returns {boolean} - true value if the id parameter is a valid UUID;
 */
function isUUID(id)
{
  var _id = id || '';

  var match = _id.match(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/ig) || [];

  return match.length > 0;
};

/**
 * Returns a random UUID instance.
 *
 * @returns {UUID} a new random UUID instance.
 */
function randomUUID()
{
  return new UUID();
}

/**
 * Creates a UUID using the hex parameter value.
 *
 * @param hex
 * @returns {UUID} a valid UUID
 * @throws {TypeError} - If the hex parameter value is not a valid UUID;
 */
function fromHex(hex)
{
  var uuid = UUIDUtil.formatUUIDFromHex(hex);

  var isUUID = UUID.isUUID(uuid);

  if(!isUUID)
  {
    throw new TypeError('[UUID.fromHex: Invalid uuid hex: ' + hex + ']');
  }

  return fromString(uuid);
}

/**
 * Creates a UUID using the id parameter value.
 *
 * @param id
 * @returns {UUID} new UUID instance.
 * @throws {TypeError} - If the id parameter value is not a valid UUID;
 */
function fromString(id)
{
  var isUUID = UUID.isUUID(id);

  var uuid;

  if(isUUID)
  {
    uuid = UUIDUtil.hexToDigitList(id.replace(/-/g, ''));
  }
  else
  {
    throw new TypeError('[UUID.fromString: Invalid id: ' + id + ']');
  }

  return new UUID(uuid);
}

module.exports = {

  isUUID: isUUID,

  randomUUID: randomUUID,

  fromHex: fromHex,

  fromString: fromString
};