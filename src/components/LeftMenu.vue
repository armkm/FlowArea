<template>
    <div v-if="currentUser">

        <el-container style="height: 100vh;">

            <el-aside width="100%" style="background-color:rgb(132, 7, 10);">

                <el-menu
                         background-color="#9e1d21"
                         text-color="#fff"
                         active-text-color="#fff" style="text-align: center;">
                    <router-link to="/home"><img src="../assets/images/logo.png" width="130"></router-link>
                    <p style="color: #fff;">
                        {{new Date() | moment('dddd, MMMM Do YYYY')}}
                    </p>
                    <br>

                </el-menu>

                <el-menu :default-openeds="['1', '3']"
                         background-color="rgb(132, 7, 10)"
                         text-color="#fff"
                         active-text-color="#9e1d21">
                    <div v-if="currentUser">
                        <el-submenu index="4">
                            <template slot="title">
                                <img :src="currentUser.providerData[0].photoURL" style="margin-left:5px;" alt="" width="30">
                                <span style="margin-left: 8px;">{{currentUser.displayName}}</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">Member</template>
                                <el-menu-item index="1-1">ตั้งค่า</el-menu-item>
                                <el-menu-item index="1-2" @click="signOut">ออกจากระบบ</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </div>

                </el-menu>
                <el-menu :default-openeds="['1', '3']"
                         background-color="#9e1d21"
                         text-color="#fff"
                         active-text-color="#fff">

                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-tickets"></i>การแข่งขัน</template>
                        <el-menu-item-group>
                            <template slot="title">รอบ Adudition</template>
                            <router-link to="audition">
                                <el-menu-item index="1-1">ส่งวิดิโอเข้าร่วม</el-menu-item>
                            </router-link>
                            <el-menu-item index="1-2">ผู้ผ่านเข้ารอบ</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="รอบ 16 คน">
                            <el-menu-item index="1-3">ตารางแข่ง</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>

            </el-aside>
        </el-container>

    </div>
</template>

<script>
    import {dbAuth} from "../firebaseConfig"

    export default {
        data() {
            return {
                currentUser:null
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            signOut:function () {
                let _this = this
                dbAuth.signOut().then(() => {
                    _this.$router.push({name: 'login'})
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created(){
            let _this = this
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                console.log(user)
            })
        },

    }
</script>

<style scoped>

</style>