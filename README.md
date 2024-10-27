Aquí tienes una versión mejorada de la documentación en formato README para la librería `dynamic form` en JavaScript. He estructurado los ejemplos para que sea claro el uso de cada función principal, incluyendo la inicialización, creación de formularios y respuestas.

---

# Dynamic Form

**Dynamic Form** es una librería en JavaScript que permite crear formularios personalizados de manera dinámica, gestionar los datos en tiempo real y exportar las respuestas.

## Instalación

Instala la librería desde npm:
```bash
npm install @dynamicfrm/dynamic-form
```

## Uso

Importa y configura una nueva instancia de `DynamicForm` con el UUID del formulario.

```javascript
import DynamicForm from './src/dynamic.js';

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
console.log(url, error);
```

**Salida esperada**:
- **`url`**: la URL donde se puede acceder al formulario creado.
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
import DynamicForm from './src/dynamic.js';

const form = new DynamicForm('113c751d-d0ed-44f0-b141-46b4fa4a6972');

// Crear el formulario
form
  .addField({ type: 'text-title', name: 'Formulario' })
  .addField({ type: 'text-field', name: 'Nombre completo' })
  .addField({ type: 'date-field', name: 'Fecha de nacimiento' });

const { url } = await form.createFormulary();
console.log('URL del formulario:', url);

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
