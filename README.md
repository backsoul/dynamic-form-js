# Dynamic Form

**Dynamic Form** es una librería en JavaScript que permite crear formularios personalizados de manera dinámica, gestionar los datos en tiempo real y exportar las respuestas.

## Instalación

Instala la librería desde npm:
```bash
npm install @dynamicfrm/js
```

Aquí tienes una versión mejorada y estructurada para la documentación de los campos disponibles en la librería **Dynamic Form**:

---

## Campos Disponibles

La librería **Dynamic Form** permite una gran flexibilidad al construir formularios personalizados, ofreciendo una variedad de tipos de campos. A continuación se detallan las opciones disponibles, sus propiedades y configuraciones:

### Campos de Texto

- **`text-title`**:  
  - **Descripción**: Campo de texto utilizado para títulos de sección o encabezados principales.
  - **Propiedad**: `name` (nombre del campo).

- **`text-subtitle`**:  
  - **Descripción**: Campo de texto para subtítulos o encabezados secundarios.
  - **Propiedad**: `name` (nombre del campo).

- **`text-paragraph`**:  
  - **Descripción**: Campo de texto extenso ideal para párrafos descriptivos o informativos.
  - **Propiedad**: `name` (nombre del campo).

- **`text-field`**:  
  - **Descripción**: Campo de texto simple, adecuado para respuestas cortas o entradas de usuario.
  - **Propiedad**: `name` (nombre del campo).

### Campos de Selección

- **`list-field`**:  
  - **Descripción**: Lista desplegable para seleccionar una única opción.
  - **Propiedades**: 
    - `name`: Nombre del campo.
    - `options`: Array de opciones personalizables, ej., `["Opción 1", "Opción 2", "Opción 3"]`.

- **`list-multiply-field`**:  
  - **Descripción**: Lista de selección múltiple que permite elegir varias opciones.
  - **Propiedades**:
    - `name`: Nombre del campo.
    - `options`: Array de opciones personalizables, ej., `["Opción 1", "Opción 2", "Opción 3"]`.

### Campos de Fecha

- **`date-field`**:  
  - **Descripción**: Campo para seleccionar una fecha específica.
  - **Propiedad**: `name` (nombre del campo).

### Campos Especiales

- **`qr-field`**:  
  - **Descripción**: Genera un código QR que redirige a una URL específica.
  - **Propiedades**: 
    - `name`: Nombre del campo.
    - `url`: URL que se codificará en el QR.

- **`yt-video`**:  
  - **Descripción**: Inserta un video de YouTube embebido en el formulario.
  - **Propiedades**:
    - `url`: URL del video en YouTube.

- **`email-field`**:  
  - **Descripción**: Campo para ingresar o mostrar una dirección de correo electrónico.
  - **Propiedades**:
    - `email`: Correo electrónico asociado.
    - `subject`: Asunto opcional del correo electrónico.

- **`fb-field`**:  
  - **Descripción**: Enlace de redirección a un perfil o página de Facebook.
  - **Propiedades**:
    - `url`: URL del enlace de Facebook.

### Ejemplo de Configuración de Campo

Cada campo puede configurarse fácilmente mediante un objeto JSON. A continuación se muestra un ejemplo de configuración para un campo de selección simple:

```json
{
  "field": "list-field",
  "name": "Seleccione una opción",
  "options": ["Opción 1", "Opción 2", "Opción 3"]
}
```


## Uso

Importa y configura una nueva instancia de `DynamicForm` con el UUID del formulario.

```javascript
import DynamicForm from "@dynamicfrm/js";

const form = new DynamicForm('113c751d-d0ed-44f0-b141-46b4fa4a6972');
```


### Crear un Formulario

Para crear un formulario, añade campos usando `addField()`. Cada campo debe especificar un `type` y un `name`.

```javascript
form
  .addField({
    type: 'text-title',
    name: 'Formulario'
  })
  .addField({ 
    type: 'text-field', 
    name: 'Nombre completo' 
  })
  .addField({ 
    type: 'date-field', 
    name: 'Fecha de nacimiento' 
  });

const { url, error } = await form.createFormulary();
console.log(url, error); // URL: https://www.dynamicform.site/113c751d-d0ed-44f0-b141-46b4fa4a6972
```

**Salida esperada**:
- **`url`**: la URL donde se puede acceder al formulario creado (`https://www.dynamicform.site/{uuid}`).
- **`error`**: cualquier error que ocurra durante la creación.

### Obtener un Formulario Existente

Recupera los datos de un formulario existente utilizando `getFormulary()`.

```javascript
const { formulary, error } = await form.getFormulary();
console.log(formulary, error);
```

**Salida esperada**:
- **`formulary`**: objeto que contiene la estructura del formulario.
- **`error`**: cualquier error que ocurra al intentar obtener el formulario.

### Obtener Respuestas

Usa `getAnswers()` para obtener las respuestas enviadas por los usuarios.

```javascript
const { answers, error } = await form.getAnswers();
console.log(answers, error);
```

**Salida esperada**:
- **`answers`**: array de respuestas enviadas, con cada campo y valor correspondiente.
- **`error`**: cualquier error durante la consulta de respuestas.

### Enviar Respuestas

Para enviar respuestas al formulario, usa `createAnswers()`. Define un array de respuestas donde cada respuesta tiene un `uuid` y una lista de `fields`.

```javascript
const answers = [
  {
    uuid: '113c751d-d0ed-44f0-b141-46b4fa4a6972',
    fields: [
      {
        value: 'Juanito Alimaña',
        index: 1
      },
      {
        value: '26/12/2024',
        index: 2
      }
    ]
  }
];
const { responses, error } = await form.createAnswers(answers);
console.log(responses, error);
```

**Salida esperada**:
- **`responses`**: confirmación de que las respuestas fueron enviadas correctamente.
- **`error`**: cualquier error que ocurra al enviar las respuestas.

---

## API

- **`addField({ type, name })`**: añade un campo al formulario.
  - **type**: tipo de campo (ej. `text-title`, `text-field`, `date-field`).
  - **name**: nombre del campo.

- **`createFormulary()`**: crea y publica el formulario.
  - **Salida**: `{ url, error }`

- **`getFormulary()`**: obtiene la estructura del formulario existente.
  - **Salida**: `{ formulary, error }`

- **`getAnswers()`**: recupera todas las respuestas enviadas.
  - **Salida**: `{ answers, error }`

- **`createAnswers(answers)`**: envía respuestas al formulario.
  - **Parámetro**: `answers` - array con respuestas y valores de campos.
  - **Salida**: `{ responses, error }`

## Ejemplo Completo

```javascript
import DynamicForm from "@dynamicfrm/js";

const form = new DynamicForm('113c751d-d0ed-44f0-b141-46b4fa4a6972');

// Crear el formulario
form
  .addField({ type: 'text-title', name: 'Formulario' })
  .addField({ type: 'text-field', name: 'Nombre completo' })
  .addField({ type: 'date-field', name: 'Fecha de nacimiento' });

const { url } = await form.createFormulary();
console.log('URL del formulario:', url); // URL: https://www.dynamicform.site/113c751d-d0ed-44f0-b141-46b4fa4a6972

// Obtener el formulario
const { formulary } = await form.getFormulary();
console.log('Formulario:', formulary);

// Enviar respuestas
const answers = [
  {
    uuid: '113c751d-d0ed-44f0-b141-46b4fa4a6972',
    fields: [
      { value: 'Juanito Alimaña', index: 1 },
      { value: '26/12/2024', index: 2 }
    ]
  }
];
const { responses } = await form.createAnswers(answers);
console.log('Respuestas enviadas:', responses);
```