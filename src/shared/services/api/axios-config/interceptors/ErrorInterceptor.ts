import { AxiosError } from 'axios';


//Interceptação de erros
export const errorInterceptor = (error: AxiosError) => {


    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }

    if (error.response?.status === 401) {
        // Pode ser feito algo junto ao back.
    }

    return Promise.reject(error);

}
