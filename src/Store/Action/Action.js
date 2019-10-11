import Firebase from '../../Config/Firebase/Firebase'
import * as Facebook from 'expo-facebook';

const FacebookLogin = (path) => {
    return async (dispatch) => {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('631415714346203');
            if (type === 'success') {
                var credential = await Firebase.auth.FacebookAuthProvider.credential(token)
                await Firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((result) => {
                        let data = result.additionalUserInfo.profile
                        let obj = {
                            name: data.name,
                            email: data.email,
                            uid: result.user.uid,
                            url: data.picture.data.url
                        }
                        dispatch({ type: 'Login' })
                        Firebase.firestore().collection("users").doc(obj.uid).set(obj).then(
                            path.navigate('Home')
                        )

                    })
                    .catch((err) => {
                        console.log('Error==>', err)
                    })



            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }


    }

}

const Logout = (path) => {
    return async (dispatch) => {
        Firebase.auth().signOut().then(function () {
            console.log('Signed Out');
            path.navigate("Login")
            dispatch({ type: 'Logout' })
            }, function (error) {
            console.error('Sign Out Error', error);
        });
    }
}


export {
    FacebookLogin,
    Logout
}
