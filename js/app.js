class Validation {
  constructor(formSelector, notRequiredElementNameAttr, validationProperty, callbackValid) {
    // set property of class by arguments
    this.formSelector = formSelector;
    this.notRequireElement = notRequiredElementNameAttr;
    this.validationProperty = validationProperty;
    this.callbackValid = callbackValid;
    // call official validation method
    this.set_validation_all();
  }
  set_validation_all() {
    // call setCustomerPeroperty and get finished rules and messages
    const getRulesMsg = this.setCustomerPeroperty();
    // set rules and message to variable
    const rules = getRulesMsg[0];
    const messages = getRulesMsg[1];
    $(this.formSelector).validate({
      submitHandler: () => {
        // if form submited=> call the callbackValid arguments
        this.callbackValid();
      },
      rules,
      messages
    })
  }
  setCustomerPeroperty() {
    // set class property in local variable
    let customProperty = this.validationProperty;
    // get defult rules and message object in render_required method
    let getRequiredItem = this.render_required();
    // set rules and messages variable with getRequiredItem
    let rules = getRequiredItem[0], messages = getRequiredItem[1];
    // iterable on customProperty array (second arguments class)
    for (let elementProperty of customProperty)
      // iterable of second items custom property array 
      // thisPr = inner property of custom property
      for (let thisPr in elementProperty[1]) {
        // if this property not exist => create this proprty
        if (!rules.hasOwnProperty(elementProperty[0])) {
          rules[elementProperty[0]] = {};
          messages[elementProperty[0]] = {};
        }
        //create property by name is first item array[this property]=second item array[this property]{
        rules[elementProperty[0]][thisPr] = elementProperty[1][thisPr];
        messages[elementProperty[0]][thisPr] = elementProperty[2][thisPr] || "لطفا مقدار معتبر وارد کنید !";
        //}
      }
    return [rules, messages]
  }
  render_required() {
    let rules = {}, messages = {};
    // get element Required in setNameAttrToArray method and iterabel 
    this.setNameAttrToArray().forEach(nameElement => {
      // set property in rules by a nameElement
      rules[nameElement] = {
        required: true
      }
      // set property in messages by a nameElement
      messages[nameElement] = {
        required: "این فیلد ضروری است !"
      }
    })
    return [rules, messages];
  }
  setNameAttrToArray() {
    // get all input of form and convert to array
    const inputs = [...document.querySelectorAll(`${this.formSelector} .input`)];
    // get name attribute inputs and set to array
    let nameELements = inputs.map(element => element.name);
    // filter nameELements without notRequireElements arguments
    return nameELements.filter(nameAttr => this.notRequireElement.indexOf(nameAttr) === -1)
  }
  /* template example
   $('#contact_us_form').validate({
    submitHandler: function () {
      alert(true)
    },
    rules: {
      fullName: "required",
    }, messages: {
      fullName: "این فیلد ضروریست",
    }
  }) */
}
class Ajax {
  constructor(url, data, successFn, errorFn, beforeSendFn, completeFn, type = 'post') {
    this.url = url;
    this.data = data;
    this.success = successFn;
    this.error = errorFn;
    this.beforeSend = beforeSendFn;
    this.complete = completeFn;
    this.type = type;
    this.sendData();
  }
  sendData() {
    $.ajax({
      type: this.type,
      url: this.url,
      data: this.data,
      success: this.success,
      error: this.error,
      // contentType: "application/json",
      dataType: 'json',
      beforeSend: this.beforeSend,
      complete: this.complete
    })
  }
}
// export 
// {
// 	Validation as default,
// 	Ajax
// }