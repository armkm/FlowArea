<template>
    <div>
        <progress value="0" max="100" id="uploader"></progress>
        <input accept="image/*" type="file" value="upload" @change="fileBtn(file, $event)">
    </div>
</template>

<script>
    import {storage} from '../firebaseConfig.js'
    export default {
        methods:{
            fileBtn:function(file, e){
                e.preventDefault();
                const uploader = document.getElementById('uploader');
                //get file
                let getFile = e.target.files[0];
                //set storage ref
                let storageRef = storage.ref('test/'+getFile.name);
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
            }
        }
    }
</script>

<style scoped>

</style>