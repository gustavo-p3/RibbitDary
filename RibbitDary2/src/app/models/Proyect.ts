export interface Proyect {
    idP?: number;
    nameProyect?: string;
    idType?: string;
    idU?: string; 
    fechaI?: string;
    fechaF?: string;
    descripcion?: string;
    notas?: string;
    progreso?: string;
  }

  export interface Tarea{
    idT?: string,
    idP?: string,
    nomTarea?: string,
    fechaI?: string,
    descripcion?: string,
    Materiales?: {Material?: string}[],
    fechaF?: string,
    idU?: string,
    idColaboradores?: string,
  }