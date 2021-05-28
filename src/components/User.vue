<template>
    <div class="container mt-4" style="background-color: #FAFAFA;">
        <div v-show="showForm">
            <Form :user="user" :editing="editing"/>
        </div>
        <h1 class="display-4 text-center" v-show="!showForm">Listado de Usuarios</h1>
        <hr v-show="!showForm"/>
        <div class="row" v-show="!showForm">
            <div class="col-lg-8 offset-lg-2">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="input-group col-lg-12">
                            <input type="text" v-model="docId" class="form-control form-control-lg" placeholder="Buscar usuario por documento"/>
                            <div class="input-group-append">
                                <button class="btn btn-success btn-lg" v-on:click="filterUsers()">Buscar</button>
                            </div>
                            <button type="button" class="btn btn-primary ml-3 pl-3 pr-3" v-on:click="createUser()">Crear</button>
                        </div>
                        <br>
                        <div class="alert alert-secondary text-center" role="alert" v-show="listUsers.length === 0">
                            No hay datos para mostrar
                        </div>
                        <ul class="list-group" v-show="listUsers.length > 0">
                            <li class="list-group-item d-flex justify-content-between text-white bg-dark">
                                
                                <span>
                                    Documento
                                </span>
                                <span>
                                    Nombre de usuario
                                </span>
                                <span class="cursor" v-on:click="deleteAll()">
                                    Eliminar
                                </span>
                            </li>
                            <br>
                            <li v-for="(user ,index) of listUsers" :key="index" 
                            class="list-group-item d-flex justify-content-between" :data-testid = "user._id" >
                                <!--span class="cursor">
                                    <i class="far fa-circle"></i>
                                </span-->
                                <span v-on:click="showMore(user._id)" class="cursor">
                                    {{user._id}}
                                </span>
                                <span v-on:click="showMore(user._id)" class="cursor">
                                    {{user.username}}
                                </span>
                                <span class="text-danger cursor">
                                    <i class="fas fa-trash-alt" v-on:click="deleteUser(user._id, index)"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UserController as users } from '../modules/UserController'
import Form from '../components/Form'

    export default {
        name: 'Usuario',
        components: {
            Form
        },
        data() {
            return {
                baseAPIuser: process.env.VUE_APP_BASE_URL_API_USER,
                baseAPIauth: process.env.VUE_APP_BASE_URL_API_AUTH,
                docId: '',
                showForm: false,
                listUsers: [],
                user: undefined,
                editing: false,
            }
        },
        methods: {
            filterUsers() {
                let number = this.isNumber(this.docId)
                if (this.docId==='' || !number) {
                    if (!number)
                        alert('Solo se acepta números')
                    this.docId = ''
                    return
                }
                users.getUser(this.docId).then(res => {
                    if (res.data!=="") {
                        this.showMore(res.data._id)
                    } else {
                        alert('No se encontro ningún usuario')
                    }
                }).catch((err) => {
                    alert('No se ha podido conectar a la base de datos',err)
                })
            },
            isNumber(check) {
                for (var i=0; i<check.length; i++) {
                    var x = check[i];
                    if (Number.isInteger(parseInt(x))=== false) {
                        return false;
                    }
                }
                return true;
            },
            createUser() {
                this.user = {};
                this.switchForm();
            },
            switchForm() {
                this.showForm = !this.showForm;
            },
            deleteUser(id, index) {
                users.delete(id).then(() => {
                    this.listUsers.splice(index,1)
                })
            },
            deleteAll() {
                let result = window.confirm("¿Desea eliminar todos los usuarios?");
                if (result) {
                    this.listUsers.forEach(el => {
                        this.deleteUser(el._id,0)
                    })
                }
            },
            getUsers() {
                users.list().then(res => {
                    this.listUsers = res.data
                }).catch((err) => {
                    alert('No se ha podido conectar a la base de datos',err)
                })
            },
            showMore(id) {
                users.getUser(id).then(res => {
                    this.user = res.data
                    this.editing = true,
                    this.switchForm()
                }).catch((err) => {
                    alert('No se ha podido conectar a la base de datos',err)
                })
            }
        },
        created: function() {
            this.getUsers()
        }
    }
</script>

<style scoped>
.cursor {
    cursor: pointer;
    }
</style>