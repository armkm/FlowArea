<template>
    <div class="audition">
        <div class="form-signin">
            <h4>SignIn With FaceBook</h4>
            <br>
            <div @click="fbSignIn">
                <el-button type="primary" plain>Facebook Login</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {dbAuth,provider,userRef} from "../firebaseConfig.js";

    export default {
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods:{
            fbSignIn : function () {
                let _this = this

                dbAuth.signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;


                    _this.$router.replace('home')
                    console.log(user)
                    // alert("sd")
                    userRef.child(user.uid).update({
                        displayName:user.displayName,
                        photoURL:user.providerData[0].photoURL,
                        facebookUid:user.providerData[0].uid
                    })
                    // userRef.child(user.uid).child("photoURL/"+user.photoURL).push("s")



                    // console.log(user)
                    // ...

                }).catch(function(error) {


                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;

                    console.log(errorCode+' : '+errorMessage+' : '+email+' : '+credential)
                    // ...
                });
            },
        }
    }
</script>

<style scoped>

</style>