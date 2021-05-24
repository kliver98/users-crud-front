<template>
  <div class="mt-4">
    <h1 class="display-4 text-center">Cuenta de usuario</h1>
    <hr>
    <div id="error"></div>
    <form class="text-center" style="padding-left: 15%; padding-right: 15%;">
        <div class="form-group">
            <label for="exampleFormControlInput1"><span class="text-danger">*</span> Nombre(s)</label>
            <input type="email" class="form-control" id="firstname" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Apellidos</label>
            <input type="email" class="form-control" id="lastname" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1">Url foto de perfil</label>
            <input type="email" class="form-control" id="photo" placeholder="http//www.example.com/img.png">
        </div>
        <div class="form-group">
            <label for="id_type"><span class="text-danger">*</span> Tipo de identificación</label>
            <select class="form-control" id="id_type">
                <!--Datos sacados de https://es.wikipedia.org/wiki/Documento_de_identidad-->
            <option v-for="option in id_type_options" :value="option" :key="option">
                {{ option }}
            </option>
            </select>
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"><span class="text-danger">*</span> Número del documento</label>
            <input type="number" :disabled=isDisabled class="form-control" id="_id" placeholder="123456789" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"><span class="text-danger">*</span> Nombre de Usuario</label>
            <input type="email" class="form-control" id="username" autocomplete="off">
        </div>
        <div class="form-group">
            <label for="exampleFormControlInput1"><span class="text-danger">*</span> Contraseña</label>
            <input type="password" class="form-control" id="password" autocomplete="off">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" checked id="active">
            <label class="form-check-label" for="active">¿Cuenta activa?</label>
        </div>
        <div class="d-flex bd-highlight mb-3">
            <button type="button" class="btn btn-secondary p-2 bd-highlight pl-4 pr-4" @click="createUser"><span id="action">Crear</span></button>
            <button type="button" class="btn btn-danger ml-auto p-2 bd-highlight pl-3 pr-3" @click="closeForm">Cancelar</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            id_type_options: [
                'CI - CedulaIdentidad',
                'CC - CedulaCiudadania',
                'TI - TarjetaIdentidad',
                'TP - TarjetaPasaporte',
                'RC - RegistroCivil',
                'CE - CedulaExtranjeria',
                'CI - CarneIdentidad',
                'DNI - DocumentoNacionalIdentidad',
                'DUI - DocumentoUnicoIdentidad',
                'ID',
            ],
            type_action: 'Actualizar',
            baseAPIuser: process.env.VUE_APP_BASE_URL_API_USER,
            baseAPIauth: process.env.VUE_APP_BASE_URL_API_AUTH,
        }
    },
    computed: {
        isDisabled() {
            return this.$parent.editing;
        }
    },
    props: ["user","editing"],
    watch: {
        user() {
            let user = this.$parent.user
            this.setField(user.id_type, user._id, user.lastname, user.firstname, user.username, user.password, user.photo, user.active)
        },
        editing() {
            document.getElementById("action").innerHTML = this.$parent.editing ? 'Actualizar':'Crear';
        }
    },
    methods: {
        closeForm() {
            this.setField()
            this.$parent.getUsers();
            this.$parent.loadForm();
            this.$parent.editing = false;
        },
        createUser() {
            let docSelect = document.getElementById("id_type");
            var id_type = docSelect.options[docSelect.selectedIndex].value;
            let _id = document.getElementById("_id").value;
            let lastname = document.getElementById("lastname").value;
            let firstname = document.getElementById("firstname").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let photo = document.getElementById("photo").value;
            let active = document.getElementById("active").checked;

            let user = {
                _id: _id,
                id_type: id_type,
                lastname: lastname,
                firstname: firstname,
                username: username,
                password: password,
                photo: photo,
                active: active,
            }

            if (!this.fieldsCorrect(user)) {
                this.showMessage('<div class="p-3 mb-2 bg-danger text-white text-center rounded">Revisa los campos de nuevo, los que tienen <b>*</b> son obligatorios</div>')
            } else {
                if (this.$parent.editing && this.$parent.user._id!==parseInt(user._id)) {
                    alert('No se puede cambiar la cedula, debe contactarse con el administrador')
                    return
                }
                if (this.$parent.editing) {
                    this.updateUser(user)
                    return
                }
                axios.post(this.baseAPIuser, user).then(res => {
                    if (res.status===200) {
                        this.closeForm()
                        this.setField()
                    }
                }).catch((err) => {
                        console.log(err)
                        //this.showMessage('<div class="p-3 mb-2 bg-danger text-white text-center rounded">Error: ya existe usuario el número de documento<br />'+err+'</div>')
                });
            }
        },
        updateUser(user) {
            axios.put(this.baseAPIuser+user._id, user).then(res => {
                if (res.status===200) {
                    this.closeForm()
                    this.setField()
                }
            }).catch((err) => {
                alert('No se ha podido conectar a la base de datos ',err)
            })
        },
        showMessage(html) {
            document.getElementById('error').innerHTML = html;
                window.scroll({
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    document.getElementById('error').innerHTML = '';
                },3200);
        }, 
        fieldsCorrect(user) {
            if ( !this.isNumber(user._id) || user._id.length<6 || user.firstname==='' || user.username==='' || user.password==='') {
                return false;
            }
            return true;
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
        setField(id_type = '', _id = '', lastname = '', firstname = '', username = '', password = '', photo = '', active = true) {
            if (id_type==='')
                id_type = 0
            else {
                id_type = this.id_type_options.findIndex(x => x===id_type)
                if (id_type<0)
                    id_type = 0
            }
            document.getElementById("id_type").selectedIndex = id_type
            document.getElementById("_id").value = _id;
            document.getElementById("lastname").value = lastname;
            document.getElementById("firstname").value = firstname;
            document.getElementById("username").value = username;
            document.getElementById("password").value = password;
            document.getElementById("photo").value = photo;
            document.getElementById("active").checked = active;
        }
    }
}
</script>

<style>

</style>