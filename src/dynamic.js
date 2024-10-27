class DynamicForm {
    constructor(uuid) {
        this.uuid = uuid;
        this.fields = [];
        this.indexCounter = 0;
    }

    addField({ type, name, options = [], url = '', email = '', subject = '' }) {
        const field = { field: type, name, index: this.indexCounter++ };

        if (options.length) field.options = options;
        if (url) field.url = url;
        if (email) field.email = email;
        if (subject) field.subject = subject;

        this.fields.push(field);
        return this;
    }

    async createFormulary() {
        const payload = { uuid: this.uuid, fields: this.fields };
        try {
            const response = await this.sendRequest('https://dynamic.backsoul.com.co/formulary', payload);
            return { url: "https://www.dynamicform.site/" + this.uuid, error: null };
        } catch (error) {
            return { url: null, error: `Error al crear el formulario: ${error.message}` }; 
        }
    }

    async getFormulary() {
        try {
            const response = await this.sendRequest(`https://dynamic.backsoul.com.co/?uuid=${this.uuid}`);
            return this.processFormResponse(response);
        } catch (error) {
            return { formulary: null, error: `Error al obtener el formulario: ${error.message}` };
        }
    }

    async getAnswers() {
        try {
            const { formulary, error: formError } = await this.getFormulary();
            if (formError) return { answers: null, error: formError }; 

            const response = await this.sendRequest(`https://dynamic.backsoul.com.co/answers?uuid=${this.uuid}`);
            
            const processedResponse = this.processAnswersResponse(response, formulary);
            if (processedResponse.error) {
                return { answers: null, error: processedResponse.error };
            }
            return { answers: processedResponse.answers, error: null };
        } catch (error) {
            return { answers: null, error: `Error al obtener respuestas: ${error.message}` }; 
        }
    }

    async createAnswers(answers) {
        try {
            const responses = await Promise.all(answers.map(answer => {
                answer.fields = JSON.stringify(answer.fields);
                return this.sendRequest('https://dynamic.backsoul.com.co/create-response', answer);
            }));
            return { responses, error: null }; 
        } catch (error) {
            return { responses: null, error: `Error al crear respuestas: ${error.message}` };
        }
    }

    async sendRequest(url, payload) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo completar la solicitud'}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    processFormResponse(data) {
        const fieldsWithValues = data.fields
            .filter(field => field.name && field.name.trim() !== '')
            .map(field => this.cleanFieldData(field))
            .filter(field => Object.keys(field).length > 0);

        if (fieldsWithValues.length === 0) {
            throw new Error('No hay campos con valores en el formulario');
        }
        return { formulary: fieldsWithValues, error: null };
    }

    processAnswersResponse(data, formulary) {
        if (!data || data.length === 0) {
            return { answers: null, error: 'No hay respuestas en el formulario' };
        }
        const answers = data.map(item => {
            const fieldData = JSON.parse(item.fields)[0];
            return {
                field: formulary[fieldData.index].name,
                answer: fieldData.value,
            };
        });
        return { answers, error: null };
    }

    cleanFieldData(field) {
        return Object.fromEntries(
            Object.entries(field).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );
    }
}

export default DynamicForm;
