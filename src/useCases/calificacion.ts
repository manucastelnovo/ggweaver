// Función para calcular el puntaje de edad
function calcularPuntajeEdad(edad: number): number {
  if (edad >= 20 && edad <= 25) {
    return 5;
  } else if (edad >= 26 && edad <= 35) {
    return 10;
  } else if (edad >= 36 && edad <= 50) {
    return 15;
  } else if (edad >= 51 && edad <= 65) {
    return 20;
  } else {
    return 0; // Fuera del rango
  }
}

// Función para calcular el puntaje de ingresos
function calcularPuntajeIngresos(ingresos: number): number {
  if (ingresos < 3000000) {
    return 5;
  } else if (ingresos >= 3000000 && ingresos < 5000000) {
    return 10;
  } else if (ingresos >= 5000000 && ingresos <= 10000000) {
    return 15;
  } else {
    // ingresos > 10000000
    return 20;
  }
}

function calcularPuntajeFaja(letra: string): number {
  letra = letra.toUpperCase(); // Convertir la letra a mayúscula para consistencia

  switch (letra) {
    case 'A':
    case 'B':
    case 'C':
    case 'D':
      return 20;
    case 'E':
    case 'F':
    case 'G':
    case 'H':
      return 15;
    case 'I':
    case 'J':
    case 'K':
    case 'L':
      return 10;
    case 'M':
    case 'N':
      return 5;
    default:
      return 0;
  }
}

// Función para calcular el puntaje de antigüedad laboral
function calcularPuntajeAntiguedad(antiguedad: string): number {
  const puntajes: { [key: string]: number } = {
    "6 meses a un año": 5,
    "1 a 2 años": 10,
    "3 a 5 años": 15,
    "Más de 5 años": 20,
  };
  return puntajes[antiguedad] || 0;
}

// Función para calcular el puntaje de activos
function calcularPuntajeActivos(activos: string): number {
  const activosDict: { [key: string]: number } = {
    ninguno: 5,
    vehículo: 10,
    inmueble: 15,
    "vehículo e inmueble": 20,
  };
  return activosDict[activos.toLowerCase()] || 0;
}

// Función para calcular el DTI (ratio deuda/ingreso)
function calcularDTI(deudas: number, ingresos: number, cuota: number): number {
  if (ingresos === 0) {
    return 0;
  }
  return ((deudas + cuota) / ingresos) * 100;
}

// Función para calcular el puntaje de ratio deuda/ingreso (DTI)
function calcularPuntajeDTI(dti: number): number {
  if (dti > 50) {
    return 5;
  } else if (dti >= 40 && dti <= 49) {
    return 10;
  } else if (dti >= 20 && dti <= 39) {
    return 15;
  } else if (dti < 20) {
    return 20;
  } else {
    return 0;
  }
}

// Función para calcular la calificación final
export default function calcularCalificacionFinal(
  edad: number,
  ingresos: number,
  faja: string,
  antiguedad: string,
  activos: string,
  deudas: number,
  cuota: number
): { puntajeTotal: number; recomendacion: string } {
  const ponderaciones = {
    edad: 0.1,
    ingresos: 0.2,
    faja: 0.2,
    antiguedad: 0.1,
    activos: 0.2,
    dti: 0.2,
  };

  // Calcular puntajes ponderados
  const puntajeEdad = calcularPuntajeEdad(edad) * ponderaciones.edad;
  const puntajeIngresos =
    calcularPuntajeIngresos(ingresos) * ponderaciones.ingresos;
  const puntajeFaja = calcularPuntajeFaja(faja) * ponderaciones.faja;
  const puntajeAntiguedad =
    calcularPuntajeAntiguedad(antiguedad) * ponderaciones.antiguedad;
  const puntajeActivos =
    calcularPuntajeActivos(activos) * ponderaciones.activos;
  const dti = calcularDTI(deudas, ingresos, cuota);
  const puntajeDTI = calcularPuntajeDTI(dti) * ponderaciones.dti;

  // Sumar los puntajes ponderados
  const puntajeTotal =
    puntajeEdad +
    puntajeIngresos +
    puntajeFaja +
    puntajeAntiguedad +
    puntajeActivos +
    puntajeDTI;

  // Dictamen final
  let recomendacion = "No definido";
  if (puntajeTotal >= 5 && puntajeTotal < 10) {
    recomendacion = "No recomendado";
  } else if (puntajeTotal >= 10 && puntajeTotal < 16) {
    recomendacion = "Aprobado con condiciones";
  } else if (puntajeTotal >= 16 && puntajeTotal <= 20) {
    recomendacion = "Aprobado";
  }

  return { puntajeTotal, recomendacion };
}