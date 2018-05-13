<template>
    <div class="audition">
        <ul>
            <li v-for="todo in todos">
                <input :value="todo.full_name" @input="updateTodoText(todo, $event.target.value)">
                <button @click="removeTodo(todo)">X</button>
            </li>
        </ul>
        <h1>
            รายชื่อผู้สมัคร
        </h1>
        <br>
        <el-table
                :data="post"
                style="width: 100%">
            <el-table-column
                    label="Date"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_at }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="Name"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>Name: {{ scope.row.full_name }}</p>
                        <div slot="reference" class="name-wrapper">
                            <router-link :to="{ name: 'profile' ,params:{key:scope.row['.key']}}"><el-tag size="medium">{{ scope.row.full_name }}</el-tag></router-link>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                    label="User"
                    width="180">
                <template slot-scope="scope">
                    <span>
                        <router-link :to="{ name: 'profile' ,params:{key:scope.row['.key']}}">
                        {{ scope.row.by }}
                        </router-link>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="Operations">
                <template slot-scope="scope">
                    <span v-if="currentUser.uid == scope.row['.key']">
                    <el-button
                            size="mini"
                         ><router-link :to="{ name: 'edit' ,params:{key:scope.row['.key']}}">Edit</router-link> </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </span>

                </template>
            </el-table-column>
        </el-table>

    </div>
</template>




<script>
    import Slider from "./Slider";
    import {postRef,userRef,dbAuth,todosRef} from '../firebaseConfig.js'
    import { mapGetters } from 'vuex'

    export default {
        computed: mapGetters(['todos']),
        components: {Slider,
        },
        firebase:{
            post:postRef
        },
        data(){
          return{
              s:'ss',
              currentUser:null

          }
        },
        methods:{
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('ต้องการลบข้อมูลการสมัครใช่หรือไม่?', 'warning', {
                    confirmButtonText: 'ลบข้อมูล',
                    cancelButtonText: 'ยกเลิก',
                    type: 'warning'
                }).then(() => {
                    this.$notify.error({
                        title: 'ลบโพสต์',
                        message: 'ทำการลบแล้วเรียบร้อย'
                    });
                    postRef.child(row['.key']).remove()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'ยกเลิกเรียบร้อย'
                    });
                });
                userRef.child(row['.key']).update(
                    {
                        audition:'false'
                    }
                )

            }
        },
        created(){
            let _this = this
            this.$store.dispatch('setTodosRef', postRef)

            dbAuth.onAuthStateChanged(function (user) {
                _this.currentUser = user
                console.log(user)
            })

        },


    }
</script>

<style scoped>
body{
padding-left: 40px;
}

</style>