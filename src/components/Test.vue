<template>
    <div>
        <input v-model.trim="newTodoText" @keyup.enter="addTodo" placeholder="Add new todo">
        <ul>
            <li v-for="todo in todos">
                <input :value="todo.full_name" @input="updateTodoText(todo, $event.target.value)">
                <button @click="removeTodo(todo)">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { todosRef } from '../firebaseConfig.js'

    export default {
        computed: mapGetters(['todos']),
        data: {
            newTodoText: '',
        },
        methods: {
            // Database manipulation are done directly here for the sake of simplicity, but it makes more sense to use actions instead
            removeTodo: function(todo) {
                todosRef.child(todo['.key']).remove()
            },
            addTodo: function() {
                if (this.newTodoText.trim()) {
                    todosRef.push({
                        text: this.newTodoText,
                    })
                    this.newTodoText = ''
                }
            },
            updateTodoText: function (todo, newText) {
                todosRef.child(todo['.key']).child('text').set(newText)
            },
        },

        created() {
            this.$store.dispatch('setTodosRef', todosRef)
        },
    }
</script>

<style scoped>

</style>