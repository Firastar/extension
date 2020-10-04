import $ from 'jquery';
import { firast } from '@firastar/firastar-js';

jest.unmock('./content.js');
const content = require('./content.js');

window.Element.prototype.getClientRects = function () {
  var node = this;
  while (node) {
    if (node === document) {
      break;
    }
    if (
      !node.style ||
      node.style.display === 'none' ||
      node.style.visibility === 'hidden'
    ) {
      return [];
    }
    node = node.parentNode;
  }
  var self = $(this);
  return [
    {
      width: self.width(),
      height: self.height(),
    },
  ];
};

const noEditedText = 'گل های باغ , سلام به شما...';
const editedText = firast(noEditedText);
const oneTextAreaInBody = `
    <html>
        <body>
            <form>
                <textarea style="width:100px;height:100px;display:block;opacity:1;visibility:visible;">
                    ${noEditedText}
                </textarea>
            </form>
        </body>
    </html>
  `;
const noTextAreaInBody = `
    <html>
        <body>
            <form>
                <textarea style="width:100px;height:100px;display:block;opacity:1;visibility:visible;"></textarea>
            </form>
        </body>
    </html>
  `;
const oneTextAreaInBodyAutoFocus = `
    <html>
        <body>
            <form>
                <textarea autofocus style="width:100px;height:100px;display:block;opacity:1;visibility:visible;">
                    ${noEditedText}
                </textarea>
            </form>
        </body>
    </html>
  `;

test('Renders correctly', () => {
  document.documentElement.innerHTML = oneTextAreaInBody;

  content.addingIconToNewTextarea($('textarea:visible'));
  expect($('firastar-extension').length > 0).toBeTruthy();
});

test('The logo shows up after focus & be hidden blur', () => {
  document.documentElement.innerHTML = oneTextAreaInBody;

  content.addingIconToNewTextarea($('textarea:visible'));
  $('textarea').focus();
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;

  expect($(shadow).contents().find('.btn').hasClass('startAnim')).toBeTruthy();

  $('textarea').blur();
  expect($(shadow).contents().find('.btn').hasClass('endAnim')).toBeTruthy();
});

test('The logo doesnt show up in blur fast', (done) => {
  document.documentElement.innerHTML = noTextAreaInBody;

  content.addingIconToNewTextarea($('textarea:visible'));
  $('textarea').focus();
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;

  setTimeout(() => {
    expect(
      !$(shadow).contents().find('.btn').hasClass('startAnim'),
    ).toBeTruthy();
    done();
  }, content.DELAY_SHOWS_UP_TIME - 250);
});

test('The logo shows up after focus with delay in no text status', (done) => {
  document.documentElement.innerHTML = noTextAreaInBody;

  content.addingIconToNewTextarea($('textarea:visible'));
  $('textarea').focus();
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;

  setTimeout(() => {
    expect(
      $(shadow).contents().find('.btn').hasClass('startAnim'),
    ).toBeTruthy();
    done();
  }, content.DELAY_SHOWS_UP_TIME);
});

test('Edit text correctly', () => {
  document.documentElement.innerHTML = oneTextAreaInBody;

  content.addingIconToNewTextarea($('textarea:visible'));
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;
  $(shadow).contents().find('.btn').click();

  expect($('textarea').val() === editedText).toBeTruthy();
});

test('The logo shows up even in focus before script', (done) => {
  document.documentElement.innerHTML = oneTextAreaInBody;
  $('textarea').focus();
  content.addingIconToNewTextarea($('textarea:visible'));
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;

  setTimeout(() => {
    expect(
      $(shadow).contents().find('.btn').hasClass('startAnim'),
    ).toBeTruthy();
    done();
  }, 500);
});

test('The logo stay hidden in pointless blur', (done) => {
  document.documentElement.innerHTML = oneTextAreaInBodyAutoFocus;
  content.addingIconToNewTextarea($('textarea:visible'));
  $('textarea').blur();
  const shadow = Array.from(
    document.getElementsByTagName('firastar-extension'),
  )[0].shadowRoot;

  setTimeout(() => {
    expect(
      !$(shadow).contents().find('.btn').hasClass('startAnim'),
    ).toBeTruthy();
    done();
  }, 500);
});

test(`Try collect textareas every ${content.INTERVAL_TIME}ms`, (done) => {
  jest.mock('./content', () => ({
    ...jest.requireActual('./content'),
    addingIconToNewTextarea: jest.fn(),
  }));
  content.addingIconToNewTextarea = jest.fn();

  setTimeout(() => {
    expect(content.addingIconToNewTextarea.mock.calls.length).toBe(3);
    done();
  }, content.INTERVAL_TIME * 3 + 1);
});
