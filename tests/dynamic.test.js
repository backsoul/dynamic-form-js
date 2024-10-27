// tests/dynamic.test.js

import DynamicForm from '../src/dynamic.js';

describe('DynamicForm', () => {
    let form;

    beforeEach(() => {
        form = new DynamicForm('test-uuid');
    });

    test('debe agregar campos correctamente', () => {
        form.addField({ type: 'text-field', name: 'Nombre' });
        form.addField({ type: 'email-field', name: 'Correo Electrónico', email: 'test@example.com' });

        expect(form.fields).toHaveLength(2);
        expect(form.fields[0]).toEqual({
            field: 'text-field',
            name: 'Nombre',
            index: 0,
        });
        expect(form.fields[1]).toEqual({
            field: 'email-field',
            name: 'Correo Electrónico',
            email: 'test@example.com',
            index: 1,
        });
    });

    test('debe crear un formulario y retornar la URL', async () => {
        form.addField({ type: 'text-field', name: 'Nombre' });
        form.addField({ type: 'email-field', name: 'Correo Electrónico', email: 'test@example.com' });

        // Mock del fetch para la creación del formulario
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ url: 'https://www.dynamicform.site/test-uuid' }),
            })
        );

        const response = await form.createFormulary();

        expect(response).toHaveProperty('url', 'https://www.dynamicform.site/test-uuid');
        expect(response.error).toBeNull();
        expect(fetch).toHaveBeenCalledWith('https://dynamic.backsoul.com.co/formulary', expect.any(Object));
    });

    test('debe manejar errores al crear el formulario', async () => {
        form.addField({ type: 'text-field', name: 'Nombre' });

        // Mock del fetch para simular un error
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Error al crear el formulario'))
        );

        const response = await form.createFormulary();

        expect(response).toHaveProperty('url', null);
        expect(response.error).toBe('Error al crear el formulario: Error al crear el formulario');
    });

    test('debe manejar errores al obtener respuestas', async () => {
        // Mock del fetch para simular un error al obtener respuestas
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Error al obtener respuestas'))
        );
    
        const { answers, error } = await form.getAnswers();
    
        expect(answers).toBeNull();
        expect(error).toBe('Error al obtener el formulario: Error al obtener respuestas');
    });
    

    test('debe crear respuestas correctamente', async () => {
        const answers = [
            { uuid: 'test-uuid', fields: [{ index: 0, value: 'Test' }] }
        ];

        // Mock del fetch para la creación de respuestas
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        );

        const response = await form.createAnswers(answers);

        expect(response.responses).toHaveLength(1);
        expect(response.responses[0]).toEqual({ success: true });
        expect(response.error).toBeNull();
        expect(fetch).toHaveBeenCalledWith('https://dynamic.backsoul.com.co/create-response', expect.any(Object));
    });

    test('debe manejar errores al crear respuestas', async () => {
        const answers = [
            { uuid: 'test-uuid', fields: [{ index: 0, value: 'Test' }] }
        ];

        // Mock del fetch para simular un error
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Error al crear la respuesta'))
        );

        const response = await form.createAnswers(answers);

        expect(response.responses).toBeNull();
        expect(response.error).toBe('Error al crear respuestas: Error al crear la respuesta');
    });
});
