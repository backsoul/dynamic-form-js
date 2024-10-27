// import DynamicForm from './src/dynamic.js';

// const form = new DynamicForm('113c751d-d0ed-44f0-b141-46b4fa4a6972');

// CREATE formulary
// form
// .addField({
//     type: 'text-title',
//     name: 'Formulario',
// })
// .addField({ type: 'text-field', name: 'Nombre completo' })
// .addField({ 
//     type: 'date-field', 
//     name: 'Fecha de nacimiento',
// });
// const {url, error} = await form.createFormulary();
// console.log(url, error);



// GET formulary
// const { formulary, error } = await form.getFormulary();
// console.log(formulary, error);


// GET answers
// const { answers, error } = await form.getAnswers();
// console.log(answers, error);


// CREATE answers
// const answers = [
//     {
//         uuid: '113c751d-d0ed-44f0-b141-46b4fa4a6972',
//         fields: [
//             {
//                 value: 'Juanito alimaña',
//                 index: 1
//             },
//             {
//                 value: '26/12/2024',
//                 index: 2
//             }
//         ]
//     }
// ];
// const { responses, error } = await form.createAnswers(answers);
// console.log(responses, error);
