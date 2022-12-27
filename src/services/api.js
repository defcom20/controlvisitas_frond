import { Cookies } from 'quasar'

export const useEndPoint = async ({ method = 'GET', endpoint, body = null, type = 'gpDefault' }) => {
    const useToken = Cookies.get('Token')
    const url = `${process.env.API_URL}/${endpoint}`
    const headersConfig = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    const headersConfigToken = { ...headersConfig, ...{ 'Authorization': `Bearer ${useToken}` } }

    const configFetch = {
        confD: { "method": method, "body": JSON.stringify(body), "headers": type != 'gpDefault' ? headersConfigToken : headersConfig },
        confS: { "method": method, "headers": headersConfigToken },
    }

    const endpointDef = {
        'gpDefault': configFetch.confD, //methodo get con parametros y su token
        'gpNot': configFetch.confS,
        'gParam': configFetch.confS,
        'gpwith': configFetch.confD,
    }
    console.log("endpoint", endpoint)
    const configHeader = endpointDef[type]
    //const urlPath = type === 'gParam' ? `${url}/` + body : url
    const res = await fetch(url, configHeader);
    const response = await res.json();

    return {
        response
    }
}
