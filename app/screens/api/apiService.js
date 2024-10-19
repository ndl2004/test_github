import axios, { AxiosResponse } from 'axios';
let API_URL = "http://10.17.15.154:8080/api";

export function callApi(endpoint: string, method: string, data: any = null): Promise<AxiosResponse<any>> {
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data,
    });
}

export function GET_ALL(endpoint: string): Promise<AxiosResponse<any>> {
    return callApi(endpoint, "GET");
}

export function GET_PAGE(endpoint: string, page: number = 0, size: number = 10, categoryId: string | null = null): Promise<AxiosResponse<any>> {
    let url = `${endpoint}?page=${page}&size=${size}`;
    if (categoryId !== null) {
        url += `&categoryId=${categoryId}`;
    }
    return callApi(url, "GET");
}

export function GET_ID(endpoint: string, id: string | number): Promise<AxiosResponse<any>> {
    return callApi(`${endpoint}/${id}`, "GET");
}

export function POST_ADD(endpoint: string, data: any): Promise<AxiosResponse<any>> {
    return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint: string, data: any): Promise<AxiosResponse<any>> {
    return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint: string, id: string | number): Promise<AxiosResponse<any>> {
    return callApi(`${endpoint}/${id}`, "DELETE");
}

export function GET_IMG(endpoint: string, imgName: string): string {
    return `${API_URL}/image/${endpoint}/${imgName}`;
}

export const registerUser = async (username: string, pass: string | number) => {
    try {
        const response = await POST_ADD('users', { username, pass });
        return response.data;
    } catch (error) {
        console.error('Error registering user', error);
        throw error;
    }
};

export const loginUser = async (username: string) => {
    try {
        const response = await GET_ID('users/name', username);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};