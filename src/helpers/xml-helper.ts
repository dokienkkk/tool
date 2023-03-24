import {
  DEFAULT_AUTHOR,
  DEFAULT_VERSION,
  XML_ADDRESS,
  XML_AUTHOR,
  XML_CHANNELS,
  XML_FIXTURE,
  XML_ID,
  XML_NAME,
  XML_PROJECT,
  XML_ROOT_NAME,
  XML_TIME,
  XML_UNIVERSE,
  XML_VERSION,
} from 'src/config/xml';
import moment from 'moment';
import type {DataExport, Fixture} from 'src/types/data';

var builder = require('xmlbuilder');

export const obj2xml = (data: DataExport): string => {
  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  var root = builder.create(XML_ROOT_NAME, {
    encoding: 'UTF-8',
  });

  root.ele(XML_ROOT_NAME).dtd();

  var header = root.ele(XML_PROJECT);

  header.ele(XML_NAME, {}, data.projectName);
  header.ele(XML_VERSION, {}, DEFAULT_VERSION);
  header.ele(XML_AUTHOR, {}, DEFAULT_AUTHOR);
  header.ele(XML_TIME, {}, time);

  data.data.forEach((value: Fixture) => {
    var fixture = root.ele(XML_FIXTURE);

    fixture.ele(XML_ID, {}, value.ID);
    fixture.ele(XML_UNIVERSE, {}, value.Universe);
    fixture.ele(XML_ADDRESS, {}, value.Address);
    fixture.ele(XML_CHANNELS, {}, value.Channels);
  });

  const xml = root.end({pretty: true});

  return xml;
};
