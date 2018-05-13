<template>
    <div class="audition">
        <div v-if="u.audition=='true'||u.audition==''">
            คุณได้ทำการสมัครแล้ว
            <br>
            <br>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(currentUser.uid)">ยกเลิกการสมัคร</el-button>
        </div>
        <div v-else>
          
            <h1>
                Audition
            </h1>
            <progress value="0" max="100" id="uploader"></progress>
            <input accept="video/*" type="file" value="upload" @change="fileBtn(file, $event)">
            <el-form :label-position="'top'" label-width="100px">

                <span id="linkbox"></span>
                <el-form-item label="Name" style="">
                    <el-input v-model="newAudition.full_name"></el-input>
                </el-form-item>
                <el-form-item label="label">
                    <el-input v-model="newAudition.label"></el-input>
                </el-form-item>


                <el-button type="primary" @click="addAuditionConfirm">สมัคร Audition</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { postRef , storage, dbAuth, userRef} from '../firebaseConfig.js'

    export default {
        firebase:{
            user:userRef,
            auditionPost:postRef
        },
        data() {
            return {
                newAudition: {
                    full_name:'',
                    label:'',
                    videoUrl:'',
                    create_at:'',
                    by:''
                },
                currentUser:null,
                u:{
                    audition:'false'
                }

            }
        },
        methods: {
            fileBtn:function(file, e){
                e.preventDefault();
                const uploader = document.getElementById('uploader');
                //get file
                let getFile = e.target.files[0];
                //set storage ref
                let storageRef = storage.ref('auditionVideo/'+getFile.name);
                //upload file
                let task = storageRef.put(getFile);
                task.on('state_changed',
                    function progress(snapshot){
                        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                        uploader.value = percentage;
                        console.log(snapshot)
                    },
                    function error(err){
                        console.log(err);
                    },
                    function complete(){
                        console.log('complete upload');
                    }
                );
            },
            addAuditionConfirm: () => {

                var d = new Date()
                this.newAudition.create_at = d.getDate()+'-'+d.getMonth()+'-'+d.getFullYear()
                this.newAudition.by = this.currentUser.displayName
                postRef.child(this.currentUser.uid).set(this.newAudition)
                userRef.child(this.currentUser.uid).update(
                    {
                        audition:'true'
                    }
                )
                this.newAudition.full_name = ''
                this.newAudition.label = ''

                this.$router.replace('home')
            },
            addAudition: () => {
                this.$confirm('ต้องการส่งข้อมูลสมัครของคุณหรือไม่?', 'success', {
                    confirmButtonText: 'ส่งข้อมูล',
                    cancelButtonText: 'ยกเลิก',
                    type: 'success'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'ส่งข้อมูลเรียบร้อย'
                    });
                    this.addAuditionComfirm()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'ยกเลิกเรียบร้อย'
                    });
                });

            },
            handleDelete(key) {
                this.$confirm('ต้องการลบข้อมูลการสมัครใช่หรือไม่?', 'warning', {
                    confirmButtonText: 'ลบข้อมูล',
                    cancelButtonText: 'ยกเลิก',
                    type: 'warning'
                }).then(() => {
                    this.$notify.error({
                        title: 'ลบโพสต์',
                        message: 'ทำการลบแล้วเรียบร้อย'
                    });
                    postRef.child(key).remove()
                    _this.$router.replace('home')

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'ยกเลิกเรียบร้อย'
                    });
                });
                userRef.child(key).update(
                    {
                        audition:'false'
                    }
                )

            }

        },
        created(){
            let _this = this
            console.log(Date.now())
            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                console.log(user)
                userRef.child(user.uid).once("value")
                    .then(function (snapshot) {
                            _this.u.audition = snapshot.child("audition").val()
                    })
            })
        },

    }
</script>

<style>
    body{
        color: #9e1d21;
    }
    h1{
        font-size: 36px;
    }
    .audition{
        padding-top: 40px;
        width: 80%;
        margin: 0 auto;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #eee;
    }
    .audition label{
        color: #9e1d21;

    }
</style>