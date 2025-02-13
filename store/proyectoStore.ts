import { defineStore } from 'pinia'
import type { Proyecto } from '~/types'

export const useProyectoStore = defineStore('proyectos', {
    state: () => ({
      proyectos: [] as Proyecto[]
    }),
  
    actions: {
      crearProyecto(proyecto: Proyecto) {
        console.log(proyecto)
        this.proyectos.push(proyecto)
      },
  
      editarProyecto(nombre: string, datosActualizados: Partial<Proyecto>) {
        const index = this.proyectos.findIndex(proyecto => proyecto.nombre === nombre)
        if (index !== -1) {
          this.proyectos[index] = { ...this.proyectos[index], ...datosActualizados }
        }
      },
  
      eliminarProyecto(nombre: string) {
        this.proyectos = this.proyectos.filter(proyecto => proyecto.nombre !== nombre)
      },
  
      obtenerProyectos(): Proyecto[] {
        return this.proyectos
      },
  
      obtenerDetalleProyecto(nombre: string): Proyecto | undefined {
        return this.proyectos.find(proyecto => proyecto.nombre === nombre)
      }
      
    }
})