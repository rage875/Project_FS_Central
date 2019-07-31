class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(callback) {
    // fetch user, set JWT, user-id
    this.authenticated = true;
    callback();
  }

  logout(callback) {
    // clean storage, erase JWT, erase user data
    this.authenticated = true;
    callback();
  }

  isAuthenticated(){
    return this.authenticated;
  }
}

export default new Auth()