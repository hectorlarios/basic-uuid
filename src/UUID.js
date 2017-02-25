
/**
 * basic-uuid
 * Copyright(c) 2017 Hector Larios
 * MIT Licensed
 */

import {
  createRandomDigitList,
  formatUUIDFromHex,
  hexToDigitList,
  digitListToHex
} from './UUIDUtil';

const secret = {
  instantiateEnabled: false
};

/**
 * The UUID class that creates a random UUID value.
 *
 * @param value - list of decimal values that represent the UUID.
 * @constructor
 * @throws {Error} - if attempting to directly instantiate the class directly.
 */
class UUID
{
  constructor(value)
  {
    if (!secret.instantiateEnabled)
    {
      throw new Error('UUID: Cannot instantiate the UUID class. Please use UUID.randomUUID, UUID.fromHex, or UUID.fromString.');
    }

    const _digits = value || createRandomDigitList();

    /**
     * Returns array containing a list of digits that represent the UUID value.
     *
     * @returns {Array}
     */
    this.digits = function digits() {return _digits.concat();};
  }

  /**
   * Return a string value that represents the UUID.
   *
   * @returns {string}
   */
  getId()
  {
    const hex = digitListToHex(this.digits());

    return formatUUIDFromHex(hex);
  };

  /**
   * Creates JSON string from UUID value.
   *
   * @returns {string} - JSON string containing UUID value.
   */
  toJSON()
  {
    return `{"uuid":"${this.getId()}}"`;
  };

  /**
   * Checks if the value of the id parameter is a valid UUID string.
   *
   * @param id - the value that will be validated.
   * @returns {boolean} - true value if the id parameter is a valid UUID;
   */
  static isUUID(id = '')
  {
    const match = id.match(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/ig) || [];

    return match.length > 0;
  }

  /**
   * Returns a random UUID instance.
   *
   * @returns {UUID} a new random UUID instance.
   */
  static randomUUID()
  {
    return createUUIDInstance();
  }

  /**
   * Creates a UUID using the hex parameter value.
   *
   * @param hex
   * @returns {UUID} a valid UUID
   * @throws {TypeError} - If the hex parameter value is not a valid UUID;
   */
  static fromHex(hex)
  {
    const uuid = formatUUIDFromHex(hex);

    const isUUID = UUID.isUUID(uuid);

    if(!isUUID)
    {
      throw new TypeError('[UUID.fromHex: Invalid uuid hex: ' + hex + ']');
    }

    return UUID.fromString(uuid);
  }

  /**
   * Creates a UUID using the id parameter value.
   *
   * @param id
   * @returns {UUID} new UUID instance.
   * @throws {TypeError} - If the id parameter value is not a valid UUID;
   */
  static fromString(id)
  {
    const isUUID = UUID.isUUID(id);

    let uuid;

    if(isUUID)
    {
      uuid = hexToDigitList(id.replace(/-/g, ''));
    }
    else
    {
      throw new TypeError('[UUID.fromString: Invalid id: ' + id + ']');
    }

    return createUUIDInstance(uuid);
  }
}

/**
 * Returns an new instance of the UUID class. It can be initialized with the optional uuid parameter.
 *
 * @param {Array} [uuid] - optional list of decimal values that represent will represent the UUID value. If the
 * parameter is undefined, the UUID class will generate a random list of decimal values.
 *
 * @returns {UUID} a new instance of the the UUID class.
 */
function createUUIDInstance(uuid)
{
  secret.instantiateEnabled = true;

  const value = new UUID(uuid);

  secret.instantiateEnabled = false;

  return value;
}

export default UUID;