<template>
    <div class="audition">
        แก้ไขข้อมูล
        <el-form :label-position="'top'" label-width="100px">

            <span id="linkbox"></span>
            <el-form-item label="Name" style="">
                <el-input v-model="post.full_name"></el-input>
            </el-form-item>
            <el-form-item label="label">
                <el-input v-model="post.label"></el-input>
            </el-form-item>
            <el-button type="primary" @click="updatePost">แก้ไขข้อมูล</el-button>
        </el-form>
    </div>
</template>


<script>
    import { postRef } from '../firebaseConfig.js'
    export default {
        data() {
            return {
                post: {
                    label:'',
                    full_name:'',
                    key:'',
                }
            }
        },
        methods: {
            updatePost:function () {
                let update = {
                    label:this.post.label,
                    full_name:this.post.full_name,
                }
                // console.log(update)
                postRef.child(this.post.key).update(update)
                this.$notify({
                    title: 'Success',
                    message: 'แก้ไขเรียบร้อย',
                    type: 'success'
                });

                this.$route.replace('/home')

            }
        }

        ,
        created(){
            console.log(this.$route.params.key);
            let _this = this
            postRef.child(this.$route.params.key).once("value")
                .then(function (snapshot) {
                    console.log(snapshot.val())
                    if(snapshot.val() === null){
                        _this.$route.push({name:'home'})
                    }
                    _this.post.label = snapshot.child("label").val()
                    _this.post.full_name = snapshot.child("full_name").val()
                    _this.post.key = snapshot.key

                })
        }

    }
</script>

<style scoped>

</style>