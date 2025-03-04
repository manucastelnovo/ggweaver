// Función para calcular el puntaje de edad
export function calcularPuntajeEdad(edad: number): number {
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
export function calcularPuntajeIngresos(ingresos: number): number {
  if (ingresos < 3000000) {
    return 5;
  } else if (ingresos >= 3000000 && ingresos < 5000000) {
    return 10;
  } else if (ingresos >= 5000000 && ingresos <= 10000000) {
    return 15;
  } else { // ingresos > 10000000
    return 20;
  }
}

// Función para calcular el puntaje de faja
export function calcularPuntajeFaja(faja: string): number {
  const fajaDict: { [key: string]: number } = { "M-N": 5, "I-L": 10, "E-H": 15, "A-D": 20 };
  const letra = faja.toUpperCase();

  for (const rango in fajaDict) {
    const [inicio, fin] = rango.split("-");
    // Comparación de caracteres de forma lexicográfica
    if (inicio <= letra && letra <= fin) {
      return fajaDict[rango];
    }
  }
  return 0; // Retorna 0 si no pertenece a ningún rango
}

// Función para calcular el puntaje de antigüedad laboral
export function calcularPuntajeAntiguedad(antiguedad: string): number {
  const puntajes: { [key: string]: number } = {
    "6 meses a un año": 5,
    "1 a 2 años": 10,
    "3 a 5 años": 15,
    "Más de 5 años": 20,
  };
  return puntajes[antiguedad] || 0;
}

// Función para calcular el puntaje de activos
export function calcularPuntajeActivos(activos: string): number {
  const activosDict: { [key: string]: number } = {
    "ninguno": 5,
    "vehículo": 10,
    "inmueble": 15,
    "vehículo e inmueble": 20,
  };
  return activosDict[activos.toLowerCase()] || 0;
}

// Función para calcular el DTI (ratio deuda/ingreso)
export function calcularDTI(deudas: number, ingresos: number, cuota: number): number {
  if (ingresos === 0) {
    return 0;
  }
  return ((deudas + cuota) / ingresos) * 100;
}

// Función para calcular el puntaje de ratio deuda/ingreso (DTI)
export function calcularPuntajeDTI(dti: number): number {
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
export function calcularCalificacionFinal(
  edad: number,
  ingresos: number,
  faja: string,
  antiguedad: string,
  activos: string,
  deudas: number,
  cuota: number
): { puntajeTotal: number; recomendacion: string } {
  const ponderaciones = {
    edad: 0.10,
    ingresos: 0.20,
    faja: 0.20,
    antiguedad: 0.10,
    activos: 0.20,
    dti: 0.20,
  };

  // Calcular puntajes ponderados
  const puntajeEdad = calcularPuntajeEdad(edad) * ponderaciones.edad;
  const puntajeIngresos = calcularPuntajeIngresos(ingresos) * ponderaciones.ingresos;
  const puntajeFaja = calcularPuntajeFaja(faja) * ponderaciones.faja;
  const puntajeAntiguedad = calcularPuntajeAntiguedad(antiguedad) * ponderaciones.antiguedad;
  const puntajeActivos = calcularPuntajeActivos(activos) * ponderaciones.activos;
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

// Ejemplo de uso
if (require.main === module) {
  const edad = 38;
  const ingresos = 15000000;
  const faja = "A";
  const antiguedad = "3 a 5 años";
  const activos = "Vehículo e Inmueble";
  const deudas = 3360000;
  const cuota = 416000;

  const { puntajeTotal, recomendacion } = calcularCalificacionFinal(
    edad,
    ingresos,
    faja,
    antiguedad,
    activos,
    deudas,
    cuota
  );

  console.log(`Puntaje Final: ${puntajeTotal}`);
  console.log(`Dictamen Final: ${recomendacion}`);
  console.log(`Puntaje edad: ${calcularPuntajeEdad(edad)}`);
  console.log(`Puntaje ingresos: ${calcularPuntajeIngresos(ingresos)}`);
  console.log(`Puntaje faja: ${calcularPuntajeFaja(faja)}`);
  console.log(`Puntaje antiguedad: ${calcularPuntajeAntiguedad(antiguedad)}`);
  console.log(`Puntaje Activos: ${calcularPuntajeActivos(activos)}`);
  console.log(`Puntaje DTI: ${calcularPuntajeDTI(calcularDTI(deudas, ingresos, cuota))}`);
}