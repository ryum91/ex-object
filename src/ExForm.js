
/**
 * Form 관리를 하는 Class
 */
class ExForm {

  constructor(id){
    this.id = id;
    this.child = {};

    let input = [];
    let button = [];

    // "name" attribute 가 있는 children node 찾아서 저장
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="text"]`)).filter(e => e.name));
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="number"]`)).filter(e => e.name));
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="password"]`)).filter(e => e.name));
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="hidden"]`)).filter(e => e.name));
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} select`)).filter(e => e.name));
    input = input.concat(Array.from(document.querySelectorAll(`#${this.id} textarea`)).filter(e => e.name));

    button = button.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="checkbox"]`)).filter(e => e.name));
    button = button.concat(Array.from(document.querySelectorAll(`#${this.id} input[type="radio"]`)).filter(e => e.name));

    this.child.input = input;
    this.child.button = button;
  }

  getData() {
    let result = {};
    this.child.input.forEach(e => result[e.name] = e.value);
    this.child.button.filter(e => e.checked).forEach(e => result[e.name] = e.value);
    return result;
  }

  setData(data) {
    this.child.input.forEach(e => e.value = data[e.name]);
    this.child.button.filter(e => e.value === (data[e.name] && data[e.name].toString())).forEach(e => e.checked = true);
  }

  clear() {
    this.child.input.forEach(e => e.value = '');
    this.child.button.forEach(e => e.checked = false);
  }
}

export default ExForm;
