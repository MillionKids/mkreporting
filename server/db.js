import * as firebase from "firebase";
import DeviceInfo from 'react-native-device-info';

export default class Database {

  /**
   * Sets a users mobile number
   * @param userId
   * @param mobile
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserMobile(userId, mobile) {

    let userMobilePath = "/user/" + userId + "/details";

    return firebase.database().ref(userMobilePath).set({
      mobile: mobile
    })

  }

  /**
   * Listen for changes to a users mobile number
   * @param userId
   * @param callback Users mobile number
   */
  static listenUserMobile(userId, callback) {

    let userMobilePath = "/user/" + userId + "/details";

    firebase.database().ref(userMobilePath).on('value', (snapshot) => {

      var mobile = "";

      if (snapshot.val()) {
        mobile = snapshot.val().mobile
      }

      callback(mobile)
    });
  }

  static setEmailHeader(location, headers) {
    const userIDPath = '/users/' + DeviceInfo.getUniqueID();

    firebase.database().ref(userIDPath).set({
      location,
      headers
    });
  }

}