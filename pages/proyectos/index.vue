
<template>
    <div class="contenedor">
        <h1>Proyectos</h1>

        <div v-if="mostrarModal" class="modal">
            <div class="modal-contenido">
                <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
                <div class="modal-botones">
                    <button @click="confirmarEliminacion" class="btn-confirmar">Sí, eliminar</button>
                    <button @click="cancelarEliminacion" class="btn-cancelar">Cancelar</button>
                </div>
            </div>
        </div>

        <div class="formulario-container">
            <form @submit.prevent="crearNuevoProyecto" class="formulario">
                <h2>Crear Nuevo Proyecto</h2>

                <div class="campo">
                    <label for="nombre">Nombre*</label>
                    <input id="nombre" v-model="nuevoProyecto.nombre" type="text" required placeholder="Nombre del proyecto" />
                </div>

                <div class="campo">
                    <label for="cliente">Cliente</label>
                    <select id="cliente" v-model="nuevoProyecto.cliente">
                        <option :value="null">Seleccione un cliente</option>
                        <option v-for="user in users" :key="user._id" :value="{ _id: user._id, nombre: user.user?.data?.legalName || user.data.legalName, img: user.user?.imgUrl || user.imgUrl }">
                            {{ user.user?.data?.legalName || user.data.legalName }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="ejecutivo">Ejecutivo*</label>
                    <select id="ejecutivo" v-model="nuevoProyecto.ejecutivo" required>
                        <option :value="null">Seleccione un ejecutivo</option>
                        <option v-for="user in users" :key="user._id" :value="{ _id: user._id, nombre: user.user?.data?.legalName || user.data.legalName, img: user.user?.imgUrl || user.imgUrl }">
                            {{ user.user?.data?.legalName || user.data.legalName }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="contacto">Contacto</label>
                    <select id="contacto" v-model="nuevoProyecto.contacto">
                        <option :value="null">Seleccione un contacto</option>
                        <option v-for="user in users" :key="user._id" :value="{ _id: user._id, nombre: user.user?.data?.legalName || user.data.legalName, img: user.user?.imgUrl || user.imgUrl }">
                            {{ user.user?.data?.legalName || user.data.legalName }}
                        </option>
                    </select>
                </div>

                <div class="campo">
                    <label for="tipoProyecto">Tipo de Proyecto*</label>
                    <select id="tipoProyecto" v-model="nuevoProyecto.tipoProyecto" required>
                        <option value="">Seleccione un tipo</option>
                        <option value="Cotización">Cotización</option>
                        <option value="Negocio">Negocio</option>
                    </select>
                </div>

                <div class="botones">
                    <button type="submit" class="btn-crear">{{ editando ? 'Actualizar Proyecto' : 'Crear Proyecto' }}</button>

                    <button type="button" @click="limpiarFormulario" class="btn-limpiar">Limpiar</button>
                </div>
            </form>
        </div>

        <table class="tabla-proyectos">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cliente</th>
                    <th>Ejecutivo</th>
                    <th>Contacto</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proyecto in proyectos" :key="proyecto.nombre">
                    <td>{{ proyecto.nombre }}</td>
                    <td>
                        <div class="nombre-con-imagen" v-if="proyecto.cliente">
                            <img v-if="proyecto.cliente.img" :src="proyecto.cliente.img" alt="Imagen Cliente" class="imagen-pequena" />
                            <span>{{ proyecto.cliente.nombre }}</span>
                        </div>
                        <span v-else>-</span>
                    </td>
                    <td>
                        <div class="nombre-con-imagen" v-if="proyecto.ejecutivo">
                            <img v-if="proyecto.ejecutivo.img" :src="proyecto.ejecutivo.img" alt="Imagen Ejecutivo" class="imagen-pequena" />
                            <span>{{ proyecto.ejecutivo.nombre }}</span>
                        </div>
                        <span v-else>-</span>
                    </td>
                    <td>
                        <div class="nombre-con-imagen" v-if="proyecto.contacto">
                            <img v-if="proyecto.contacto.img" :src="proyecto.contacto.img" alt="Imagen Contacto" class="imagen-pequena" />
                            <span>{{ proyecto.contacto.nombre }}</span>
                        </div>
                        <span v-else>-</span>
                    </td>
                    <td>{{ proyecto.tipoProyecto }}</td>
                    <td>
                        <button @click="editarProyecto(proyecto.nombre)" class="btn-editar">Editar</button>
                        <button @click="mostrarModalConfirmacion(proyecto.nombre)" class="btn-eliminar">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProyectoStore } from '~/store/proyectoStore'
import { storeToRefs } from 'pinia'
import type { Proyecto, User } from '~/types'

const proyectoStore = useProyectoStore()
const { proyectos } = storeToRefs(proyectoStore)

const { data: usersData } = await useFetch<User[]>('https://apidev.unabase.cc/app/users/findUsers/ByNames?name=miguel')

const users = usersData.value || []
const editando = ref(false)
const proyectoOriginal = ref<string | null>(null)

const nuevoProyecto = ref<Proyecto>({
    nombre: '',
    cliente: undefined,
    ejecutivo: undefined,
    contacto: undefined,
    tipoProyecto: '' as 'Cotización' | 'Negocio'
})

const mostrarModal = ref(false)
const proyectoAEliminar = ref<string | null>(null)

const mostrarModalConfirmacion = (nombre: string) => {
    proyectoAEliminar.value = nombre
    mostrarModal.value = true
}

const confirmarEliminacion = () => {
    if (proyectoAEliminar.value) {
        proyectoStore.eliminarProyecto(proyectoAEliminar.value)
        mostrarModal.value = false
        proyectoAEliminar.value = null
    }
}

const cancelarEliminacion = () => {
    mostrarModal.value = false
    proyectoAEliminar.value = null
}

const crearNuevoProyecto = () => {
    if (editando.value && proyectoOriginal.value) {
        proyectoStore.editarProyecto(proyectoOriginal.value, { ...nuevoProyecto.value })
    } else {
        const nombreExistente = proyectos.value.some((proyecto) => proyecto.nombre === nuevoProyecto.value.nombre)
        if (nombreExistente) {
            alert('El nombre del proyecto ya existe. Por favor, elige otro nombre.')
            return
        }
        proyectoStore.crearProyecto({ ...nuevoProyecto.value })
    }
    limpiarFormulario()
}
const limpiarFormulario = () => {
    nuevoProyecto.value = {
        nombre: '',
        cliente: undefined,
        ejecutivo: undefined,
        contacto: undefined,
        tipoProyecto: '' as 'Cotización' | 'Negocio'
    }
    editando.value = false
    proyectoOriginal.value = null
}

const editarProyecto = (nombre: string) => {
    const proyecto = proyectoStore.obtenerDetalleProyecto(nombre)
    if (proyecto) {
        nuevoProyecto.value = { ...proyecto }
        proyectoOriginal.value = nombre
        editando.value = true
    }
}

</script>

<style scoped>
.contenedor {
    font-family: Arial, sans-serif;
    margin: 20px auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
}

.formulario-container {
    margin-bottom: 40px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 20px;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

label {
    font-weight: bold;
    color: #555;
}

input,
select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

input:focus,
select:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 3px rgba(74, 144, 226, 0.3);
}

.botones {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn-crear,
.btn-limpiar {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

.btn-crear {
    background-color: #4a90e2;
    color: white;
}

.btn-crear:hover {
    background-color: #357abd;
}

.btn-limpiar {
    background-color: #f5f5f5;
    color: #666;
}

.btn-limpiar:hover {
    background-color: #e5e5e5;
}

.tabla-proyectos {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tabla-proyectos th,
.tabla-proyectos td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.tabla-proyectos th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
}

.tabla-proyectos tr:nth-child(even) {
    background-color: #f9f9f9;
}

.tabla-proyectos tr:hover {
    background-color: #f1f1f1;
}

.nombre-con-imagen {
    display: flex;
    align-items: center;
    gap: 10px;
}

.imagen-pequena {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
}

.btn-editar {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-editar:hover {
    background-color: #45a049;
}

.btn-eliminar {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-eliminar:hover {
    background-color: #e53935;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-contenido {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-botones {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-confirmar {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-confirmar:hover {
    background-color: #e53935;
}

.btn-cancelar {
    background-color: #ccc;
    color: #333;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-cancelar:hover {
    background-color: #bbb;
}

@media (max-width: 768px) {
    .contenedor {
        margin: 10px;
    }

    .tabla-proyectos {
        display: block;
        overflow-x: auto;
    }

    .botones {
        flex-direction: column;
    }

    .btn-crear,
    .btn-limpiar {
        width: 100%;
    }
}
</style>