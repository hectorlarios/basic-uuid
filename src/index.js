const PATTERN = /^([a-f0-9]{8})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{4})([a-f0-9]{12})$/i;

export default class UUID
{
  constructor(value)
  {
    this.__digits__ = value || createRandomDigitList();
  }

  getId()
  {
    const _hex = digitListToHex(this.__digits__);

    return formatUUIDFromHex(_hex);
  }

  toJSON()
  {
    return `{"uuid":"${this.getId()}"}`;
  }
}

function formatUUIDFromHex(hex)
{
  return hex.replace(PATTERN, "$1-$2-$3-$4-$5");
}

function padLeft(value, lengthTotal = 2)
{
  while(value.length < lengthTotal)
  {
    value = `0${value}`;
  }

  return value;
}

function hexToDigitList(hex)
{
  const _value = hex.match(/.{2}/g);

  return _value.map(digit => parseInt(digit, 16));
}

function digitListToHex(list)
{
  const _value = list.map(item => padLeft(item.toString(16)));

  return _value.join('');
}

function createRandomDigitList()
{
  const _time = new Date().getTime();

  const _hex = padLeft(_time.toString(16).substr(-8), 8);

  const _hexList = hexToDigitList(_hex);

  return [...randomDigits(10),..._hexList,...randomDigits(2)];
}

function randomDigits(count)
{
  const _value = new Array(count).fill(null);

  return _value.map(() => Math.floor(Math.random() * 0x100));
}

UUID.isUUID = function isUUID(id)
{
  return PATTERN.test(id.replace(/-/g,''));
};

UUID.randomUUID = function randomUUID()
{
  return new UUID();
};

UUID.fromHex = function fromHex(hex)
{
  const _uuid = formatUUIDFromHex(hex);

  return UUID.fromString(_uuid);
};

UUID.fromString = function fromString(id)
{
  if(UUID.isUUID(id))
  {
    const _list = hexToDigitList(id.replace(/-/g, ''));

    return new UUID(_list);
  }

  throw new TypeError(`[UUID.fromString: Invalid id: '${id}']`)
};