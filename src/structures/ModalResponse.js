class ModalResponse {
  #pilotId;
  #name;

  constructor(modal) {
    this.#pilotId = modal.getTextInputValue('pilot-id');
    this.#name = modal.getTextInputValue('name');
  }

  get name() {
    return this.#name;
  }

  get pilotId() {
    return this.#pilotId;
  }

  get sanitisedName() {
    return this.#name.split(' ').map(part => {
      // handle double-barrel surnames....
      if (part.includes('-')) {
        part.split('-').map(section => {
          // make first letter capital, then the rest lowercase
          return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
        }).join('-');
      }

      // make first letter capital, then the rest lowercase
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join(' ')
  }
}

module.exports = ModalResponse;