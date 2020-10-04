import styles from './styles';
import logo from './logo';
import { generateToken } from '../services/randomToken';
import { firast } from '@firastar/firastar-js';
import $ from 'jquery';

const elements = [];
export const INTERVAL_TIME = 1000;
export const DELAY_SHOWS_UP_TIME = 2000;

window.customElements.define(
  'firastar-extension',
  class extends HTMLElement {
    constructor() {
      super();
      // eslint-disable-next-line no-unused-vars
      var shadow = this.attachShadow({ mode: 'open' });
    }
  },
);

window.onload = function () {
  setInterval(() => {
    exports.addingIconToNewTextarea();
  }, INTERVAL_TIME);
};

function addingIconToNewTextarea(selector = $('textarea:visible')) {
  selector.each((idx, el) => {
    if (!elements.find((prevEl) => prevEl.isSameNode(el))) {
      elements.push(el);
      const token = generateToken();
      const div = $('<div class="block"></div>');
      $(`<firastar-extension id="${token}"></firastar-extension>`).insertAfter(
        $(el),
      );
      const shadow = $(document.getElementById(token).shadowRoot);
      shadow.append($(styles));

      $(div).css($(el).position());
      $(div).css('width', $(el).width());
      $(div).css('height', $(el).height());
      $(div).css('padding', $(el).css('padding'));
      $(div).css('margin', $(el).css('margin'));

      $(div).append(`<div class="btn">${logo}</div>`);
      const divAppendedShadow = $(div).appendTo(shadow);

      $(divAppendedShadow)
        .find('.btn')
        .click(function () {
          $(el).val(firast($(el).val()));
        });

      if (
        $(el).is(':focus') &&
        !$(divAppendedShadow).find('.btn').hasClass('startAnim')
      ) {
        $(divAppendedShadow).find('.btn').removeClass('endAnim');
        $(divAppendedShadow).find('.btn').addClass('startAnim');
      }

      $(el)
        .focus(
          {
            div: divAppendedShadow,
          },
          function (e) {
            if (
              $(el).val().toString() &&
              !$(e.data.div).find('.btn').hasClass('startAnim')
            ) {
              $(e.data.div).find('.btn').removeClass('endAnim');
              $(e.data.div).find('.btn').addClass('startAnim');
            } else {
              setTimeout(() => {
                if (
                  $(el).is(':focus') &&
                  !$(e.data.div).find('.btn').hasClass('startAnim')
                ) {
                  $(e.data.div).find('.btn').removeClass('endAnim');
                  $(e.data.div).find('.btn').addClass('startAnim');
                }
              }, DELAY_SHOWS_UP_TIME);
            }
          },
        )
        .blur(
          {
            div: divAppendedShadow,
          },
          function (e) {
            if ($(e.data.div).find('.btn').hasClass('startAnim')) {
              $(e.data.div).find('.btn').removeClass('startAnim');
              $(e.data.div).find('.btn').addClass('endAnim');
            }
          },
        );
    }
  });
}

exports.addingIconToNewTextarea = addingIconToNewTextarea;
