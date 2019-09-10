/**
 * HTML DOM Element 를 확장한 Class
 */
class ExElement {

  constructor(el) {
    this.el = el;
  }

  static create(attr1, attr2) {
    if( attr1 instanceof Element ) {
      return new ExElement(attr1);

    } else if ( typeof attr1 === 'string' ) {
      return new ExElement(document.createElement(attr1, attr2));

    } else {
      throw 'Invalid parameter';
    }
  }

  static get(selector) {
    return new ExElement(document.querySelector(selector));
  }

  static getAll(selector) {
    return Array.from(document.querySelectorAll(selector)).map(e => new ExElement(e));
  }

  /**
   * 추가 클래스 이름
   * @param {String} appendClassName 
   */
  addClass(appendClassName) {
    if( appendClassName && this.el.className.indexOf(appendClassName) === -1 ) {
      if( this.el.className.trim() ) {
        this.el.className = `${this.el.className.trim()} ${appendClassName}`;
      } else {
        this.el.className = appendClassName;
      }
    }
    return this;
  }

  /**
   * 제거 클래스 이름
   * @param {String} removeClassName 
   */
  removeClass(removeClassName) {
    if( removeClassName && this.el.className.indexOf(removeClassName) !== -1 ) {
      this.el.className = this.el.className.split(' ').filter(e => (e.trim() && e !== removeClassName)).join(' ');
    }
    return this;
  }

  /**
   * 클래스를 toggle
   * @param {Boolean} toggle 
   * @param {String} targetClassName 
   */
  toggleClass(toggle, targetClassName) {
    if( toggle ) {
      return this.el.addClass(targetClassName);
    } else {
      return this.el.removeClass(targetClassName);
    }
  }

  /**
   * Show
   */
  show() {
    this.el.style.display = 'block';
    return this;
  }

  /**
   * Hide
   */
  hide() {
    this.el.style.display = 'none';
    return this;
  }

  /**
   * @isView 에 따라 view
   * @param {Boolean} isView 
   */
  view(isView) {
    this.el.style.display = isView ? 'block' : 'none';
    return this;
  }

  /**
   * value를 return 하거나 세팅
   * @param {String} val 
   */
  value(val) {
    if( undefined === val ) {
      return this.el.value;
    }
    this.el.value = val;
    return this;
  }

  /**
   * text를 return 하거나 세팅
   * @param {String} val 
   */
  text(val) {
    if( undefined === val ) {
      return this.el.textContent;
    }
    this.el.textContent = val;
    return this;
  }

  /**
   * 하위에 추가
   * @param {Element} target 
   */
  append(target) {
    if( target instanceof ExElement ) {
      this.el.appendChild(target.toElement());
      return this;
    } else if ( target instanceof Element ) {
      this.el.appendChild(target);
      return this;
    } else {
      throw ('is not element');
    }
  }

  appendTo(target) {
    if( target instanceof ExElement ) {
      target.append(this);
      return this;
    } else if ( target instanceof Element ) {
      target.appendChild(this.el);
      return this;
    } else {
      throw ('is not element');
    }
  }

  /**
   * 스타일 설정
   * @param {Object} styleObj 
   */
  setStyle(styleObj) {
    Object.entries(styleObj).forEach(e => {
      this.el.style[e[0]] = e[1];
    });
    return this;
  }

  /**
   * Property 설정 및 조회
   * @param {Object} propsObj 
   */
  props(propsObj, val) {
    if( propsObj instanceof Object ) {
      Object.entries(propsObj).forEach(e => {
        this.el[e[0]] = e[1];
      });
      return this;
    } else if ( typeof propsObj === 'string' ) {
      if( undefined !== val ) {
        this.el[propsObj] = val;
        return this;
      } else {
        return this.el[propsObj];
      }
    }
  }

  change(func, options) {
    this.el.addEventListener('change', func, options);
    return this;
  }

  /**
   * Element 객체 반환
   */
  toElement() {
    return this.el;
  }
}

export default ExElement;