import axios from 'axios';

async function getPages(url : string) {
    try {
        let response = await axios.get(url);
        const pages = response.data.info.pages;
        let i = 2;
        while (i<=pages) {
            console.log(i);
            let page = await getPage(url, i);
            console.log(page);
            i = i+2;
        }
    } catch (error) {
        console.error(error);
    }
}

async function getPage(url : string, page : number) {
    try {
        let response = await axios.get(`${url}?page=${page}`);        
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {getPages};