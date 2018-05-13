<template>
<div class="audition">
    <h1>
        Name : {{data.displayName}}
    </h1>
    <br>
    <br>
    <img :src="data.photoURL" width="50">


    <br>
    <br>
    เข้าร่วม Audition : <span v-if="data.audition=='true'">เข้าร่วมแล้ว</span>
    <span v-else>ยังไม่ได้เข้าร่วม</span>





</div>
</template>

<script>
    import { userRef } from '../firebaseConfig.js'

    export default {
        firebase:{
            usera:userRef
        },
        data(){
          return{
                data:'',
              key:''
            }
        },
        methods:{
            r:function () {
                location.reload(true);
            }
        },
        created(){
            console.log(this.$route.params.key);
            let _this = this
            userRef.child(this.$route.params.key).once("value")
                .then(function (snapshot) {
                    console.log(snapshot.val())
                    if(snapshot.val() === null){
                        _this.$route.push({name:'home'})
                    }
                    _this.data = snapshot.val()
                    _this.key = snapshot.key

                })
        }
    }
</script>

<style scoped>

</style>